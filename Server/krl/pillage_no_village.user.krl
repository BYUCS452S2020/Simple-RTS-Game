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
      token == ent:token{"value"} && ent:token{"expiration"} > time:now()
    }

    create_game = defaction(host, player_num) {
      every {
        event:send({"eci":"MyZr8TeTDa9KGrRk3xoChF", "domain":"game", "type":"create", "attrs":{ "host": host, "player_num": player_num }});
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
        "email": uAttrs{"email"},
        "avatar": {"happy": "data:image/png;base64,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", 
                   "mad": "data:image/png;base64,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", 
                   "mocking": "data:image/png;base64,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"}
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
      authenticated = checkToken(event:attrs{"token"})
      attrs = event:attrs.delete("salt").delete("password").delete("_headers")
      user = ent:user.put(attrs)
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
      authenticated = checkToken(event:attrs{"token"})
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
