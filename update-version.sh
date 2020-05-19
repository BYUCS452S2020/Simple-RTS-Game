#!/usr/bin/env bash

###############################################################################
# START OF ENVIRONMENT
###############################################################################
_ME=$(basename "${0}")
version="0.1"
force=0
quiet=0
verbose=0
auto=1
CLIENT="./SimpleRTSGameUI/package.json"
SERVER="./Server/package.json"
ROOT="./package.json"

# Exit immediately on error
set -e
# Detect whether output is piped or not.
[[ -t 1 ]] && piped=0 || piped=1

###############################################################################
# END OF ENVIRONMENT
###############################################################################

###############################################################################
# START OF HELPER FUNCTIONS
###############################################################################
out() {
	((quiet)) && return

	local message="$@"
	if ((piped)); then
		message=$(echo $message | sed '
		s/\\[0-9]\{3\}\[[0-9]\(;[0-9]\{2\}\)\?m//g;
		s/✖/Error:/g;
		s/✔/Success:/g;
		')
	fi
	printf '%b\n' "$message";
}
err() { out " \033[1;31m✖\033[0m  $@" >&2; }
die() { err "$@"; exit 1; }
success() { out " \033[1;32m✔\033[0m  $@"; }

# Verbose logging
log() { (($verbose)) && out "$@"; }

# Notify on function success
notify() { [[ $? == 0 ]] && success "$@" || err "$@"; }

# Unless force is used, confirm with user
confirm() {
	(($force)) && return 0;

	read -p "$1 [y/N] " -n 1;
	[[ $REPLY =~ ^[Yy]$ ]];
}

# Print usage
usage() {
	echo "

	██████╗   ██╗     ████████╗  ██████╗ ██╗   ██╗  ██╗     ██╗ ████████║ ███████╗
	██╔══██╗  ██║     ██║   ██║ ██╔════╝ ██║ ██╔═╝  ██║     ██║    ██╔══╝ ██╔════╝
	██████╔╝  ██║     ████████║ ██║      ████╔═╝    ██║     ██║    ██║    █████╗
	██╔═══██╗ ██║     ██╔═══██║ ██║      ██╔═███╗   ██║     ██║    ██║    ██╔══╝
	███████╔╝ ██████║ ██║   ██║ ╚██████╗ ██║   ███╗ ██████║ ██║    ██║    ███████╗
	╚══════╝  ╚═════╝ ╚═╝   ╚═╝  ╚═════╝ ╚═╝   ╚══╝ ╚═════╝ ╚═╝    ╚═╝    ╚══════╝

	${_ME} [--OPTIONS] [<arguments>]

	This script is made to aid in updating the versioning of the client, server,
  and project as a whole

	Options:
  -r, --root        Update root to version provided
  -s, --server      Update server to the version provided
  -c, --client      Update client to the version provided
  -f, --force       Skip over user interaction
  -v, --verbose     Output more info
  -q, --quite       Output less info
	-h, --help        Display this help and exit

  No options will auto update patch numbers on all package.json files
  "
}

###############################################################################
# END OF HELPER FUNCTIONS
###############################################################################

###############################################################################
# MAIN FUNCTIONS
###############################################################################
get_version() {
  cat $1 | grep version | head -1 | awk -F: '{ print $2 }' | sed 's/[",]//g'
}

function join_by { local IFS="$1"; shift; echo "$*"; }

increment_version() {
  IFS='.' read -r -a array <<< "$1"
  (( array[2]++ ))

  join_by '.' "${array[@]}"
}

auto_increment_versions() {
  v=$(get_version ${ROOT})
  v2=$(increment_version $v)

  out "root project: $v -> $v2"
  npm version $v2

  v=$(get_version ${SERVER})
  v2=$(increment_version $v)

  cd ./Server/
  out "server: $v -> $v2"
  npm version $v2

  cd ..
  v=$(get_version ${CLIENT})
  v2=$(increment_version $v)

  cd ./SimpleRTSGameUI/
  out "client: $v -> $v2"
  npm version $v2
}

update_root() {
  v=$(get_version ${ROOT})
  out "root project: $v -> $rversion"
  npm version $rversion
}

update_server() {
  cd ./Server
  v=$(get_version ${SERVER})
  out "server: $v -> $sversion"
  npm version $sversion
  cd ..
}

update_client() {
  cd ./SimpleRTSGameUI
  v=$(get_version ${CLIENT})
  out "client: $v -> $cversion"
  npm version $cversion
  cd ..
}

main() {
	(($auto)) && auto_increment_versions
  [[ -n $rversion ]] && update_root
  [[ -n $sversion ]] && update_server
  [[ -n $cversion ]] && update_client
}

###############################################################################
# END MAIN FUNCTIONS
###############################################################################

###############################################################################
# START HANDLE OPTIONS AND ARGUMENTS
###############################################################################

# Read the options and set stuff
while [[ $1 = -?* ]]; do
	case $1 in
		-h|--help) usage >&2; exit 0;;
		--version) out "${_ME} $version"; exit 0;;
		-r|--root) shift; rversion=$1 ; auto=0 ;;
		-s|--server) shift; sversion=$1 ; auto=0 ;;
    -c|--client) shift; cversion=$1 ; auto=0 ;;
		-v|--verbose) verbose=1 ;;
		-q|--quiet) quiet=1 ;;
		-f|--force) force=1 ;;
		--endopts) shift; break ;;
		*) die "invalid option: $1" ;;
	esac
	shift
done

###############################################################################
# START MAIN SCRIPT
###############################################################################

# You should delegate your logic from the `main` function
main

# This has to be run last not to rollback changes we've made.
exit 0

###############################################################################
# END MAIN SCRIPT
###############################################################################
