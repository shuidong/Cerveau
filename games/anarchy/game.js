// Generated by Creer at 06:57PM on October 26, 2015 UTC, git hash: '1b69e788060071d644dd7b8745dca107577844e1'

var Class = require(__basedir + "/utilities/class");
var serializer = require(__basedir + "/gameplay/serializer");
var log = require(__basedir + "/gameplay/log");
var TwoPlayerGame = require(__basedir + "/gameplay/shared/twoPlayerGame");
var TurnBasedGame = require(__basedir + "/gameplay/shared/turnBasedGame");

//<<-- Creer-Merge: requires -->> - Code you add between this comment and the end comment will be preserved between Creer re-runs.

// any additional requires you want can be required here safely between cree runs
//<<-- /Creer-Merge: requires -->>

// @class Game: Two player grid based game where each player tries to burn down the other player's buildings. Let it burn!
var Game = Class(TwoPlayerGame, TurnBasedGame, {
    /**
     * Initializes Games.
     *
     * @param {Object} a simple mapping passsed in to the constructor with whatever you sent with it.
     */
    init: function(data) {
        TurnBasedGame.init.apply(this, arguments);
        TwoPlayerGame.init.apply(this, arguments);

        /**
         * How many bribes players get at the beginning of their turn, not counting their burned down Buildings.
         *
         * @type {number}
         */
        this._addProperty("baseBribesPerTurn", serializer.defaultInteger(data.baseBribesPerTurn));

        /**
         * All the buildings in the game.
         *
         * @type {list.<Building>}
         */
        this._addProperty("buildings", serializer.defaultArray(data.buildings));

        /**
         * The current Forecast, which will be applied at the end of the turn.
         *
         * @type {Forecast}
         */
        this._addProperty("currentForecast", serializer.defaultGameObject(data.currentForecast));

        /**
         * All the forecasts in the game, indexed by turn number.
         *
         * @type {list.<Forecast>}
         */
        this._addProperty("forecasts", serializer.defaultArray(data.forecasts));

        /**
         * The width of the entire map along the vertical (y) axis.
         *
         * @type {number}
         */
        this._addProperty("mapHeight", serializer.defaultInteger(data.mapHeight));

        /**
         * The width of the entire map along the horizontal (x) axis.
         *
         * @type {number}
         */
        this._addProperty("mapWidth", serializer.defaultInteger(data.mapWidth));

        /**
         * The maximum amount of fire value for any Building.
         *
         * @type {number}
         */
        this._addProperty("maxFire", serializer.defaultInteger(data.maxFire));

        /**
         * The next Forecast, which will be applied at the end of your opponent's turn. This is also the Forecast WeatherStations can control this turn.
         *
         * @type {Forecast}
         */
        this._addProperty("nextForecast", serializer.defaultGameObject(data.nextForecast));


        //<<-- Creer-Merge: init -->> - Code you add between this comment and the end comment will be preserved between Creer re-runs.

        // properties
        this.maxTurns = 300;
        this.mapWidth = 40;
        this.mapHeight = 20;
        this.maxFire = 20;
        this.baseBribesPerTurn = 10;

        // server only variables
        this.directions = [ "north", "east", "south", "west" ]; // TODO: expose to AIs?
        this.directionalOffset = {
            north: {x: 0, y: -1},
            east: {x: 1, y: 0},
            south: {x: 0, y: 1},
            west: {x: -1, y: 0},
        };

        this.headquartersHealthScalar = 10;
        this.maxForecastIntensity = 10;
        this.firePerTurnReduction = 1;
        this.exposurePerTurnReduction = 10;

        //<<-- /Creer-Merge: init -->>
    },

    name: "Anarchy",
    numberOfPlayers: 2,
    maxInvalidsPerPlayer: 10,

    /**
     * This is called when the game begins, once players are connected and ready to play, and game objects have been initialized. Anything in init() may not have the appropriate game objects created yet..
     */
    begin: function() {
        TurnBasedGame.begin.apply(this, arguments);
        TwoPlayerGame.begin.apply(this, arguments);

        //<<-- Creer-Merge: begin -->> - Code you add between this comment and the end comment will be preserved between Creer re-runs.

        this._buildingsGrid = [];
        var originalBuildings = [];
        var buildingTypes = ["Warehouse", "FireDepartment", "PoliceDepartment", "WeatherStation"]; // TODO: should we weigh these so some are generated more often?

        // TODO: make actual map generation algorithm that makes sure each player has a "fair" number of buildings, and the map is "interesting"
        for(var x = 0; x < this.mapWidth; x++) {
            this._buildingsGrid[x] = [];
            if(x < this.mapWidth/2) {
                for(var y = 0; y < this.mapHeight; y++) {
                    if(Math.random() > 0.5) {
                        originalBuildings.push(this._createBuilding(buildingTypes.randomElement(), {
                            x: x,
                            y: y,
                            owner: this.players.randomElement(), // TODO: random percent on each side?
                        }));
                    }
                }
            }
        }

        // TODO: yes this could break if somehow no warehouses are randomly generated. That should be fixed with a real map generation algorithm
        this.players[0].warehouses.randomElement().makeHeadquarters();

        // mirror the map
        for(var i = 0; i < originalBuildings.length; i++) {
            var originalBuilding = originalBuildings[i];
            this._createBuilding(originalBuilding.gameObjectName, {
                x: this.mapWidth - originalBuilding.x - 1,
                y: originalBuilding.y,
                owner: this.getOtherPlayers(originalBuilding.owner)[0],
                isHeadquarters: originalBuilding.isHeadquarters,
            });
        }

        // now all the buildings on the map should be created, so hook up the north/east/south/west pointers
        for(var i = 0; i < this.buildings.length; i++) {
            var building = this.buildings[i];
            for(var direction in this.directionalOffset) {
                if(this.directionalOffset.hasOwnProperty(direction)) {
                    var offset = this.directionalOffset[direction];
                    building["building" + direction.upcaseFirst()] = this._getBuildingAt(building.x + offset.x, building.y + offset.y);
                }
            }
        }

        // create the forecasts, each "set" of turns (e.g. 0 and 1, 100 and 101, 264 and 265, etc) are the same initial states for each player.
        for(var i = 0; i < this.maxTurns; i += 2) {
            var direction = this.directions.randomElement();
            var intensity = Math.randomInt(0, this.maxForecastIntensity);

            for(var j = 0; j < 2; j++) {
                this.forecasts.push(this.create("Forecast", {
                    direction: direction,
                    intensity: intensity,
                    controllingPlayer: this.players[j],
                }));
            }
        }

        this.currentForecast = this.forecasts[0];
        this.nextForecast = this.forecasts[1];

        //<<-- /Creer-Merge: begin -->>
    },

    /**
     * This is called when the game has started, after all the begin()s. This is a good spot to send orders.
     */
    _started: function() {
        TurnBasedGame._started.apply(this, arguments);
        TwoPlayerGame._started.apply(this, arguments);

        //<<-- Creer-Merge: _started -->> - Code you add between this comment and the end comment will be preserved between Creer re-runs.
        // any logic for _started can be put here
        //<<-- /Creer-Merge: _started -->>
    },


    //<<-- Creer-Merge: added-functions -->> - Code you add between this comment and the end comment will be preserved between Creer re-runs.

    /**
     * @override
     */
   _maxTurnsReached: function(){TurnBasedGame._maxTurnsReached.apply(this, arguments);
        var returned = TurnBasedGame._maxTurnsReached.apply(this, arguments);

        this._secondaryWinConditions("Max turns reached (" + this.maxTurns + ")");

        return returned;
   },

    /**
     * @override
     */
    nextTurn: function() {
        for(var i = 0; i < this.players.length; i++) {
            var player = this.players[i];
            player.bribesRemaining = this.baseBribesPerTurn + player.burnedBuildings;
        }

        var playersBurnedDownBuildings = {};
        var fireSpreads = [];

        for(var i = 0; i < this.buildings.length; i++){
            var building = this.buildings[i];

            if(building.fire > 0) {
                building.health = Math.max(0, building.health - building.fire); // it takes fire damage

                if(building.health <= 0) {
                    playersBurnedDownBuildings[building.owner.id] = (playersBurnedDownBuildings[building.owner.id] || 0) + 1;
                }
                // try to spread the fire
                if(this.currentForecast.intensity > 0) {
                    var buildingSpreadingTo = building["building" + this.currentForecast.direction.upcaseFirst()];
                    if(buildingSpreadingTo) {
                        fireSpreads.push({
                            building: buildingSpreadingTo,
                            fire: Math.min(building.fire, this.currentForecast.intensity),
                        });
                    }
                }

                building.fire = Math.max(0, building.fire - this.firePerTurnReduction); // it dies down after dealing damage
            }

            if(building.exposure && !building.bribed) { // then they didn't act, so their exposure drops
                building.exposure -= Math.max(this.exposurePerTurnReduction);
            }

            building.bribed = false;
        }

        // now that every building has been damaged, check for winner via burning down Headquarters
        var loser;
        for(var i = 0; i < this.players.length; i++) {
            var player = this.players[i];
            if(player.headquarters.health <= 0) { // then it burned down, and they have lost
                if(loser) { // someone else already lost this turn... so they both lost their headquarters this turn, so check secondary win conditions (and the game is over)
                    this._secondaryWinConditions("Both headquarters burned down on the same turn");
                }
                loser = player;
            }
        }

        if(loser) {
            this.declareLoser(loser, "Headquarters burned down.");
            this.declareWinner(this.getOtherPlayers(loser)[0], "Burned down enemy's headquarters.");
        }

        // spread fire, now that everything has taken fire damage
        for(var i = 0; i < fireSpreads.length; i++) {
            var fireSpread = fireSpreads[i];
            fireSpread.building.fire = Math.min(fireSpread.building.fire + fireSpread.fire, this.maxFire);
        }

        this.currentForecast = this.nextForecast;
        this.nextForecast = this.forecasts[this.currentTurn + 1];

        for(var i = 0; i < this.players.length; i++) {
            var player = this.players[i];
            player.bribesRemaining = this.baseBribesPerTurn + (playersBurnedDownBuildings[player.id] || 0);
        }

        return TurnBasedGame.nextTurn.apply(this, arguments);
    },

    /**
     * creates a Building of the class type, and adds it to the necessary lists.
     *
     * @param {string} buildingType - the class name of the Building sub class
     * @param {object} data - initialization data for new building. Must have an owner set
     * @returns {Building} the newly created and hooked up building
     */
    _createBuilding: function(buildingType, data) {
        var newBuilding = this.create(buildingType, data);

        this._buildingsGrid[newBuilding.x][newBuilding.y] = newBuilding;
        this.buildings.push(newBuilding);
        newBuilding.owner.buildings.push(newBuilding);
        newBuilding.owner[buildingType.lowercaseFirst() + "s"].push(newBuilding); // adds the new building to it's owner list of that building type

        return newBuilding;
    },

    /**
     * tries to get the building at a given (x, y), or null if there is none. O(1) lookup time
     *
     * @param {number} x - x position
     * @param {number} y - y position
     * @returns {Building|null} the building at (x, y) if there is one, null otherwise
     */
    _getBuildingAt: function(x, y) {
        if(x >= 0 && x < this.mapWidth && y >= 0 && y < this.mapHeight) {
            return this._buildingsGrid[x][y] || null;
        }

        return null;
    },

    /**
     * Checks and declares winner/losers based on alternative win conditions
     *
     * @param {string} reasonWhy - the reason why we have to check for secondary win conditions
     */
    _secondaryWinConditions: function(reasonWhy) {
        var calculations = []; // all the numbers we will need to figure out the secondary win conditions winner
        var winConditions = [ // the alternative win conditions the are finding calculations for
            {
                key: "headquartersHealth",
                winReason: "Your headquarters had the most health remaining.",
                loseReason: "Your headquarters had less health remaining than another player."
            },
            {
                key: "buildingsAlive",
                winReason: "You had the most buildings not burned down.",
                loseReason: "You had more building burned down than anaother player.",
            },
            {
                key: "buildingsHealthSum",
                winReason: "You had the highest health sum among your Buildings.",
                loseReason: "You had a lower health sum than another player.",
            },
        ];

        for(var i = 0; i < this.players.length; i++) {
            var player = this.players[i];
            var calculation = {
                player: player,
                headquartersHealth: player.headquarters.health,
            };

            calculations.buildingsAlive = 0;
            calculations.buildingsHealthSum = 0;
            for(var j = 0; j < player.buildings.length; j++) {
                var building = player.buildings[j];
                calculations.buildingsAlive += Number(building.health > 0); // alive will be 1, burned down will be 0
                calculations.buildingsHealthSum += building.health;
            }

            calculations.push(calculation);
        }

        // try to find the winner via most Headquarters Health remaining by sorting based on that
        for(var i = 0; i < winConditions.length; i++) {
            var winCondition = winConditions[i];
            calculations.sortDescending(winCondition.key);
            if(calculations[0][winCondition.key] > calculations[1][winCondition.key]) { // then we have a winner, otherwise two players tied for that win condition
                this.delcareLosers(this.getOtherPlayers(calculations[0].player), reasonWhy + ": " + winCondition.loseReason);
                this.declareWinner(calculations[0].player, reasonWhy + ": " + winCondition.winReason);
                return;
            }
        }

        // Win via coin flip - if we got here no player won via game rules. They probably played identically to each other.
        var winnerIndex = Math.randomInt(this.players.length);
        for(var i = 0; i < this.players.length; i++) {
            if(i === winnerIndex) {
                this.declareWinner(this.players[i], "Won via coin flip.");
            }
            else {
                this.declareLoser(this.players[i], "Lost via coin flip.");
            }
        }
    }

    //<<-- /Creer-Merge: added-functions -->>

});

module.exports = Game;
