ruleset pillage_no_village.game {
  meta {
    shares __testing, game

    use module io.picolabs.wrangler alias wrangler
  }
  global {
    __testing = { "queries":
      [ { "name": "__testing" }
      , { "name": "game" }
      //, { "name": "entry", "args": [ "key" ] }
      ] , "events":
      [ { "domain": "game", "type": "end" }
      //, { "domain": "d2", "type": "t2", "attrs": [ "a1", "a2" ] }
      ]
    }

    game = function() {
      {
        "host": ent:host,
        "maxPlayers": ent:max_players,
        "players": ent:players,
        "id": ent:id
      }
    }
  }

  rule init {
    select when wrangler ruleset_added where rids >< meta:rid
    pre {
      eci = event:attrs{"user_eci"}
    }
    event:send({
        "eci": eci,
        "domain": "game",
        "type": "join",
        "attrs": { "eci": meta:eci }
    })
    fired {
      ent:players := []
      ent:max_players := event:attrs{"player_num"}
      ent:host := event:attrs{"host"}
      ent:id := event:attrs{"gameId"}
    }
  }

  /*This rule checks if the subscription request is what this pico is looking for before accepting*/
  rule acceptGameSubscriptions {
    select when wrangler inbound_pending_subscription_added
    pre {
      Rx_role = event:attrs{"Rx_role"}.klog("Rx_role")
      Tx_role = event:attrs{"Tx_role"}.klog("Tx_role")
      spaceAvailable = ent:players.length() <= ent:max_players
    }
    if spaceAvailable && Rx_role == "game" && Tx_role == "player" then noop()
    fired {
      raise wrangler event "pending_subscription_approval" attributes event:attrs;
    }
  }

  rule player_joined {
    select when wrangler subscription_added
    pre {
      picoEci = event:attr("Tx")
      picoName = event:attr("name")
      map = {"username": picoName, "eci":picoEci}
    }
    if picoName && picoEci then
      send_directive("Adding to player list")
    fired {
      ent:players := ent:players.append(map);
    }
  }

  rule game_finished {
    select when game end
    event:send({"eci": wrangler:parent_eci(), "domain": "game", "type": "end", "attrs": { "host": ent:host }})
  }
}
