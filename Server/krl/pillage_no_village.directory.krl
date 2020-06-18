ruleset pillage_no_village.directory {
  meta {
    shares __testing, users, games, loginResult

    use module io.picolabs.wrangler alias wrangler
  }
  global {
    __testing = { "queries":
      [ { "name": "__testing" }
      , { "name": "users", "args": [ "username" ] }
      , { "name": "games", "args": [ "id" ] }
      , { "name": "loginResult", "args": [ "username", "password" ]}
      ] , "events":
      [ { "domain": "user", "type": "register", "attrs":
          [ "username", "password", "firstName", "lastName", "email" ] }
      , { "domain": "user", "type": "login", "attrs": [ "username", "password" ] }
      , { "domain": "user", "type": "delete", "attrs": [ "username", "phrase" ] }
      ]
    }

    users = function(username) {
      (username) => ent:users{username} | ent:users
    }

    games = function(id) {
      (id) => ent:games{id} | ent:games
    }

    isUsernameAvailable = function(username) {
      ent:users{username}.isnull()
    }

    loginResult = function(username, password) {
      eci = ent:users{username}
      http:get(meta:host+"/sky/event/"+eci+"/login/user/login?username="+username+"&password="+password){"content"}.decode(){"directives"}[0]
    }
  }

  rule init {
    select when wrangler ruleset_added where rids >< meta:rid
    fired {
      ent:users := {}
      ent:games := {}
      ent:phrase := event:attrs{"phrase"} || "YourMomGay420"
    }
  }

  rule create_user {
    select when user register
    pre {
      username = event:attrs{"username"}
      user = {
        "username": username,
        "password": event:attrs{"password"},
        "firstName": event:attrs{"firstName"},
        "lastName": event:attrs{"lastName"},
        "email": event:attrs{"email"},
      }
      available = isUsernameAvailable(username).klog("available")
    }
    if available then noop()
    fired {
      raise wrangler event "new_child_request" attributes {
        "name": username,
        "rids": "pillage_no_village.user",
        "user": user,
        "token": { "value": random:uuid(), "expiration": time:add(time:now(), {"days": 1}) }
      }
    }
  }

  rule user_created {
    select when wrangler new_child_created where rids >< "pillage_no_village.user"
    pre {
      username = event:attrs{"user"}{"username"}
      token = event:attrs{"token"}{"value"}
      eci = event:attrs{"eci"}
    }
    send_directive("Ok", {"status": 200, "token": token, "eci": eci})
    fired {
      ent:users{username} := eci
    }
  }

  rule delete_user {
    select when user delete
    pre {
      username = event:attrs{"username"}
      exists = not isUsernameAvailable(username)
      secret_phrase = event:attrs{"phrase"}
    }
    if exists && secret_phrase == ent:phrase then noop()
    fired {
      raise wrangler event "child_deletion" attributes {
        "name": username
      }
    }
  }

  rule user_deleted {
    select when wrangler child_deleted where ent:users.values() >< event:attrs{"eci"}
    pre {
      username = event:attrs{"name"}
      users = ent:users.filter(function(v, k) {
        k != username
      });
    }
    send_directive("Ok", {"status": 200, "message": "Successfully Deleted User: " + username})
    fired {
      ent:users := users
    }
  }

  rule login {
    select when user login
    pre {
      username = event:attrs{"username"}
      password = event:attrs{"password"}
      exists = not isUsernameAvailable(username)
      loginResult = exists => loginResult(username, password)
        | {"name": "Unauthorized", "options": { "status": 401, "message": "Invalid username or password"}}
    }
    send_directive(loginResult{"name"}, loginResult{"options"}.set(["eci"], ent:users{username}))
  }

  rule create_game {
    select when game create
    pre {
      player_num = event:attrs{"player_num"}
      host = event:attrs{"host"}
      id = event:attrs{"id"}
      start = time:now()
      allowed = ent:games{host + " game"}.isnull()
    }
    if id && player_num && host && allowed then
    send_directive("Game started by " + host + " at " + start)
    fired {
      raise wrangler event "new_child_request" attributes {
        "name": host + " game",
        "rids": "pillage_no_village.game",
        "host": host,
        "player_num": player_num,
        "start_time": start,
        "user_eci": ent:users{host},
        "gameId": id
      }
      ent:games{host + " game"} := { "id": id, "maxPlayers": player_num }
    }
  }

  rule game_created {
    select when wrangler new_child_created where rids >< "pillage_no_village.game"
    pre {
      name = event:attrs{"name"}
      game = ent:games{name}.set(["eci"], event:attrs{"eci"})
    }
    fired {
      ent:games{name} := game
    }
  }

  rule game_finished {
    select when game end
    pre {
      host = event:attrs{"host"}
      game = host + " game"
    }
    if host then noop()
    fired {
      raise wrangler event "child_deletion" attributes {
        "name": game
      }
    }
  }

  rule game_deleted {
    select when wrangler child_deleted where ent:games{event:attrs{"name"}}{"eci"} == event:attrs{"eci"}
    pre {
      game = event:attrs{"name"}
      test = ent:games.delete(game).klog("test")
      games = ent:games.filter(function(v, k) {
        k != game
      });
    }
    fired {
      ent:games := games
    }
  }
}
