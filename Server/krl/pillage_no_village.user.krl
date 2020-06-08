ruleset pillage_no_village.user {
  meta {
    shares __testing, user, game

    use module io.picolabs.subscription alias subscription
    use module io.picolabs.wrangler alias wrangler
  }

  global {
    __testing = { "queries":
      [ { "name": "__testing" }
      , { "name": "user" }
      , { "name": "game" }
      //, { "name": "entry", "args": [ "key" ] }
      ] , "events":
      [ { "domain": "game", "type": "create", "attrs": [ "num_players" ] }
      //, { "domain": "d2", "type": "t2", "attrs": [ "a1", "a2" ] }
      ]
    }

    user = function() {
      ent:user
    }

    game = function() {
      subscription:established().filter(function(x) {
        x{"Rx_role"} == "player" && x{"Tx_role"} == "game"
      }).head()
    }

    hash = function(salt, password) {
      math:hash("sha256",salt + ":" + password);
    }

    loginAttempt = function(username, password){
      _password = ent:user{"password"}.defaultsTo("");
      _salt = ent:user{"salt"}.defaultsTo("");
      username == ent:user{"username"} && _password.klog("_password") == hash(_salt.klog("_salt"), password.klog("plain text password"))
    }

    checkToken = function(token) {
      tokenArray = token.split(re#\s#);
      tokenArray[0].lc() == "bearer" && tokenArray[1] == ent:token{"value"} && ent:token{"expiration"} > time:now()
    }

    create_game = defaction(host, player_num) {
      every {
        event:send({"eci":"WMyoxjCKxkYWkipQy4HXgS", "domain":"game", "type":"create", "attrs":{ "host": host, "player_num": player_num }});
        send_directive("Ok", {"status": 200, "message": "Request to make game sent." })
      }
    }

  }

  //create user rule
  rule create_user {
    select when wrangler ruleset_added where rids >< meta:rid
    pre {
      uAttrs = event:attrs{"user"}
      salt = random:uuid()
      user = {
        "username": uAttrs{"username"},
        "password": hash(salt, uAttrs{"password"}),
        "salt": salt,
        "firstName": uAttrs{"firstName"},
        "lastName": uAttrs{"lastName"},
        "email": uAttrs{"email"}
      }
    }
    noop()
    always {
      ent:user := user
      ent:token := event:attrs{"token"}
    }
  }

  rule login {
    select when user login
    pre{
      username = event:attrs{"username"}.defaultsTo("");
      password = event:attrs{"password"}.defaultsTo("");
      validPass = loginAttempt(username, password);
      status = (validPass) => "Authorized" | "Unauthorized"
      token = (validPass) => random:uuid() | null
    }
    choose status {
      Authorized => send_directive("Ok", {"status": 200, "message": "Successfully authenticated user", "token": token })
      Unauthorized => send_directive("Unauthorized", {"status": 401, "message": "Invalid username or password"})
    }

    fired {
      ent:token := { "value": token, "expiration": time:add(time:now(), {"days": 1}) }
    }
  }

  //update user rule
  rule update_user {
    select when user update
    pre {
      // for now don't allow password changes
      authenticated = checkToken(event:attrs{[ruleset pillage_no_village.user {
  meta {
    shares __testing, user, game

    use module io.picolabs.subscription alias subscription
    use module io.picolabs.wrangler alias wrangler
  }

  global {
    __testing = { "queries":
      [ { "name": "__testing" }
      , { "name": "user" }
      , { "name": "game" }
      //, { "name": "entry", "args": [ "key" ] }
      ] , "events":
      [ { "domain": "game", "type": "create", "attrs": [ "num_players" ] }
      //, { "domain": "d2", "type": "t2", "attrs": [ "a1", "a2" ] }
      ]
    }

    user = function() {
      ent:user
    }

    game = function() {
      subscription:established().filter(function(x) {
        x{"Rx_role"} == "player" && x{"Tx_role"} == "game"
      }).head()
    }

    hash = function(salt, password) {
      math:hash("sha256",salt + ":" + password);
    }

    loginAttempt = function(username, password){
      _password = ent:user{"password"}.defaultsTo("");
      _salt = ent:user{"salt"}.defaultsTo("");
      username == ent:user{"username"} && _password.klog("_password") == hash(_salt.klog("_salt"), password.klog("plain text password"))
    }

    checkToken = function(token) {
      tokenArray = token.split(re#\s#);
      tokenArray[0].lc() == "bearer" && tokenArray[1] == ent:token{"value"} && ent:token{"expiration"} > time:now()
    }

    create_game = defaction(host, player_num) {
      every {
        event:send({"eci":"WMyoxjCKxkYWkipQy4HXgS", "domain":"game", "type":"create", "attrs":{ "host": host, "player_num": player_num }});
        send_directive("Ok", {"status": 200, "message": "Request to make game sent." })
      }
    }

  }

  //create user rule
  rule create_user {
    select when wrangler ruleset_added where rids >< meta:rid
    pre {
      uAttrs = event:attrs{"user"}
      salt = random:uuid()
      user = {
        "username": uAttrs{"username"},
        "password": hash(salt, uAttrs{"password"}),
        "salt": salt,
        "firstName": uAttrs{"firstName"},
        "lastName": uAttrs{"lastName"},
        "email": uAttrs{"email"}
      }
    }
    noop()
    always {
      ent:user := user
      ent:token := event:attrs{"token"}
    }
  }

  rule login {
    select when user login
    pre{
      username = event:attrs{"username"}.defaultsTo("");
      password = event:attrs{"password"}.defaultsTo("");
      validPass = loginAttempt(username, password);
      status = (validPass) => "Authorized" | "Unauthorized"
      token = (validPass) => random:uuid() | null
    }
    choose status {
      Authorized => send_directive("Ok", {"status": 200, "message": "Successfully authenticated user", "token": token })
      Unauthorized => send_directive("Unauthorized", {"status": 401, "message": "Invalid username or password"})
    }

    fired {
      ent:token := { "value": token, "expiration": time:add(time:now(), {"days": 1}) }
    }
  }

  //update user rule
  rule update_user {
    select when user update
    pre {
      // for now don't allow password changes
      authenticated = checkToken(event:attrs{["_headers", "authorization"]})
      attrs = event:attrs.delete("salt").delete("password").delete("_headers")
      user = ent:user.put(attrs);
      directive = (authenticated) => "Authorized" | "Unauthorized"
    }
    choose directive {
      Authorized => send_directive("Ok", {"status": 200, "message": "Successfully updated user", "user": user.delete("salt").delete("password")});
      Unauthorized => send_directive("Unauthorized", {"status": 401, "message": "Unsuccesfully updated user"})
    }
    fired {
      ent:user := user
    }
  }

  rule create_game {
    select when game create
    pre {
      authenticated = checkToken(event:attrs{["_headers", "authorization"]})
      player_num = event:attrs{"player_num"}
      host = ent:user{"username"}
      directive = (authenticated) => "Authorized" | "Unauthorized"
    }
    choose directive {
      Authorized => create_game(host, player_num)
      Unauthorized => send_directive("Unauthorized", {"status": 401, "message": "Not authorized to create game"})
    }
  }

  rule join_game {
    select when game join
    pre {
      eci = event:attrs{"eci"}
    }
    if eci then
    send_directive("Ok", {"status": 200, "message": "Joining game..."})
    fired {
      raise wrangler event "subscription" attributes {
        "name": ent:user{"username"},
        "wellKnown_Tx": eci,
        "Rx_role": "player",
        "Tx_role": "game"
      }
    }
  }
}
"_headers", "authorization"]})
      attrs = event:attrs.delete("salt").delete("password").delete("_headers")
      user = ent:user.put(attrs);
      directive = (authenticated) => "Authorized" | "Unauthorized"
    }
    choose directive {
      Authorized => send_directive("Ok", {"status": 200, "message": "Successfully updated user", "user": user.delete("salt").delete("password")});
      Unauthorized => send_directive("Unauthorized", {"status": 401, "message": "Unsuccesfully updated user"})
    }
    fired {
      ent:user := user
    }
  }

  rule create_game {
    select when game create
    pre {
      authenticated = checkToken(event:attrs{["_headers", "authorization"]})
      player_num = event:attrs{"player_num"}
      host = ent:user{"username"}
      directive = (authenticated) => "Authorized" | "Unauthorized"
    }
    choose directive {
      Authorized => create_game(host, player_num)
      Unauthorized => send_directive("Unauthorized", {"status": 401, "message": "Not authorized to create game"})
    }
  }

  rule join_game {
    select when game join
    pre {
      eci = event:attrs{"eci"}
    }
    if eci then
    send_directive("Ok", {"status": 200, "message": "Joining game..."})
    fired {
      raise wrangler event "subscription" attributes {
        "name": ent:user{"username"},
        "wellKnown_Tx": eci,
        "Rx_role": "player",
        "Tx_role": "game"
      }
    }
  }
}
