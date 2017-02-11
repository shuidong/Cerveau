define({ "api": [
  {
    "group": "API",
    "type": "",
    "url": "",
    "version": "0.0.0",
    "filename": "website/api.js",
    "groupTitle": "API",
    "name": ""
  },
  {
    "type": "delete",
    "url": "/gamelog/:id/",
    "title": "Gamelog",
    "name": "Delete_Gamelog",
    "group": "API",
    "description": "<p>Simply given the id of a gamelog, tries to delete that gamelog.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>id of the gamelog, this is sent to clients when a game is over, and in status when a game is over.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>If the deletion was a success</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "success",
            "description": "<p>false if not found</p>"
          }
        ],
        "500": [
          {
            "group": "500",
            "optional": false,
            "field": "success",
            "description": "<p>false if an error in deletion</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "website/api.js",
    "groupTitle": "API"
  },
  {
    "type": "get",
    "url": "/gamelog/:id/",
    "title": "Gamelog",
    "name": "Get_Gamelog",
    "group": "API",
    "description": "<p>Simply given the id of a gamelog, responds with the gamelog if found. See <a href=\"https://github.com/siggame/Cadre/blob/master/gamelog-format.md\">Gamelog formatting documentation</a> for more infomation.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>id of the gamelog, this is sent to clients when a game is over, and in status when a game is over.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "error",
            "description": "<p>if the gamelog was not found.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "website/api.js",
    "groupTitle": "API"
  },
  {
    "type": "get",
    "url": "/status/:gameName/:gameSession",
    "title": "Status",
    "name": "Status",
    "group": "API",
    "description": "<p>When given a gameName and session id, responds with json data about what is going on in that game session, including what clients are connected.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "gameName",
            "description": "<p>The name of the game (or an alias), must be a valid game on the server.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "gameSession",
            "description": "<p>The session id of the game you want to check the status of.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "gameName",
            "description": "<p>The actual name of the game, e.g. &quot;chess&quot; -&gt; &quot;Chess&quot;.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "gameSession",
            "description": "<p>The id of the session in that game.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "gamelogFilename",
            "description": "<p>The filename (id) of the gamelog. To get the actual gamelog use the /gamelog/:id part of the API. null means the gamelog does not exist yet because it is still being written to the filesystem</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>What the status of this game session is:</p> <ul> <li>&quot;empty&quot; if the game session is valid, but does not exist because no clients have ever connected to it.</li> <li>&quot;open&quot; if the game session has had a least 1 client connect, but the game has not started.</li> <li>&quot;running&quot; if all players have connected, and the game is actively in progress, but not over.</li> <li>&quot;over&quot; if the game session has ran to completion and clients have disconnected.</li> <li>&quot;error&quot; otherwise, such as if the gameName was invalid.</li> </ul>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "numberOfPlayers",
            "description": "<p>The number of clients that are playing needed to connect to make the game session start running.</p>"
          },
          {
            "group": "Success 200",
            "type": "Client[]",
            "optional": false,
            "field": "clients",
            "description": "<p>An array of clients currently in that game session.</p>"
          }
        ],
        "Client": [
          {
            "group": "Client",
            "type": "Number",
            "optional": true,
            "field": "index",
            "description": "<p>If the player requested, or was assigned, a player index. When a game session reaches &quot;running&quot; this will be set.</p>"
          },
          {
            "group": "Client",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>The name of the client.</p>"
          },
          {
            "group": "Client",
            "type": "Boolean",
            "optional": false,
            "field": "spectating",
            "description": "<p>If the client is a spectator (not a playing client). Spectators will not have indexes.</p>"
          },
          {
            "group": "Client",
            "type": "Boolean",
            "optional": true,
            "field": "disconnected",
            "description": "<p>If the client disconnected unexpectedly during the game.</p>"
          },
          {
            "group": "Client",
            "type": "Boolean",
            "optional": true,
            "field": "timedOut",
            "description": "<p>If the client timedOut and we were forced to disconnect them during the game.</p>"
          },
          {
            "group": "Client",
            "type": "Boolean",
            "optional": true,
            "field": "won",
            "description": "<p>If the player won this will be set, and be true.</p>"
          },
          {
            "group": "Client",
            "type": "Boolean",
            "optional": true,
            "field": "lost",
            "description": "<p>If the player lost this will be set, and be true.</p>"
          },
          {
            "group": "Client",
            "type": "String",
            "optional": true,
            "field": "reason",
            "description": "<p>If the player won or lost this will be the human readable reason why they did so.</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Empty",
        "content": "{\n    status: \"empty\",\n    gameName: \"Chess\",\n    gameSession: \"1\"\n}",
        "type": "json"
      },
      {
        "title": "Open",
        "content": "{\n    status: \"open\",\n    gameName: \"Chess\",\n    gameSession: \"1\",\n    numberOfPlayers: 2,\n    clients: [\n        {\n            name: \"Chess Lua Player\",\n            spectating: false\n        }\n    ]\n }",
        "type": "json"
      },
      {
        "title": "Running",
        "content": "{\n    status: \"running\",\n    gameName: \"Chess\",\n    gameSession: \"1\",\n    numberOfPlayers: 2,\n    clients: [\n        {\n            name: \"Chess Lua Player\",\n            index: 0,\n            spectating: false\n        },\n        {\n            name: \"Chess Python Player\",\n            index: 1,\n            spectating: false\n        }\n    ]\n}",
        "type": "json"
      },
      {
        "title": "Over",
        "content": "{\n    status: \"over\",\n    gameName: \"Chess\",\n    gameSession: \"1\",\n    gamelogFilename: \"2016.03.01.11.54.30.868-Chess-1\",\n    numberOfPlayers: 2,\n    clients: [\n        {\n            name: \"Chess Lua Player\",\n            index: 0,\n            spectating: false,\n            won: true,\n            reason: \"Checkmate!\"\n        },\n        {\n            name: \"Chess Python Player\",\n            index: 1,\n            spectating: false,\n            lost: true,\n            reason: \"Checkmated.\"\n        }\n    ]\n}",
        "type": "json"
      }
    ],
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "error",
            "description": "<p>A human readable string about what the error was</p>"
          },
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": true,
            "field": "gameName",
            "description": "<p>If the request was valid, but the gameName was not a valid alias for a game, this is the gameName you sent us.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Unknown GameName",
          "content": "HTTP/1.1 400 Bad Request\n{\n    error: \"Game name not valid\",\n    gameName: \"unknownGameName\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "website/api.js",
    "groupTitle": "API"
  }
] });
