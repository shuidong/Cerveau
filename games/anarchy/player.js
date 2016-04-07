// Generated by Creer at 09:57PM on April 07, 2016 UTC, git hash: 'e7ec4e35c89d7556b9e07d4331ac34052ac011bd'

var Class = require(__basedir + "/utilities/class");
var serializer = require(__basedir + "/gameplay/serializer");
var log = require(__basedir + "/gameplay/log");
var GameObject = require("./gameObject");

//<<-- Creer-Merge: requires -->> - Code you add between this comment and the end comment will be preserved between Creer re-runs.

// any additional requires you want can be required here safely between cree runs
//<<-- /Creer-Merge: requires -->>

// @class Player: A player in this game. Every AI controls one player.
var Player = Class(GameObject, {
    /**
     * Initializes Players.
     *
     * @param {Object} data - a simple mapping passsed in to the constructor with whatever you sent with it. GameSettings are in here by key/value as well.
     */
    init: function(data) {
        GameObject.init.apply(this, arguments);

        /**
         * How many bribes this player has remaining to use during their turn. Each action a Building does costs 1 bribe. Any unused bribes are lost at the end of the player's turn.
         *
         * @type {number}
         */
        this._addProperty("bribesRemaining", serializer.defaultInteger(data.bribesRemaining));

        /**
         * All the buildings owned by this player.
         *
         * @type {list.<Building>}
         */
        this._addProperty("buildings", serializer.defaultArray(data.buildings));

        /**
         * What type of client this is, e.g. 'Python', 'JavaScript', or some other language. For potential data mining purposes.
         *
         * @type {string}
         */
        this._addProperty("clientType", serializer.defaultString(data.clientType));

        /**
         * All the FireDepartments owned by this player.
         *
         * @type {list.<FireDepartment>}
         */
        this._addProperty("fireDepartments", serializer.defaultArray(data.fireDepartments));

        /**
         * The Warehouse that serves as this player's headquarters and has extra health. If this gets destroyed they lose.
         *
         * @type {Warehouse}
         */
        this._addProperty("headquarters", serializer.defaultGameObject(data.headquarters));

        /**
         * If the player lost the game or not.
         *
         * @type {boolean}
         */
        this._addProperty("lost", serializer.defaultBoolean(data.lost));

        /**
         * The name of the player.
         *
         * @type {string}
         */
        this._addProperty("name", serializer.defaultString(data.name));

        /**
         * This player's opponent in the game.
         *
         * @type {Player}
         */
        this._addProperty("otherPlayer", serializer.defaultGameObject(data.otherPlayer));

        /**
         * All the PoliceDepartments owned by this player.
         *
         * @type {list.<PoliceDepartment>}
         */
        this._addProperty("policeDepartments", serializer.defaultArray(data.policeDepartments));

        /**
         * The reason why the player lost the game.
         *
         * @type {string}
         */
        this._addProperty("reasonLost", serializer.defaultString(data.reasonLost));

        /**
         * The reason why the player won the game.
         *
         * @type {string}
         */
        this._addProperty("reasonWon", serializer.defaultString(data.reasonWon));

        /**
         * The amount of time (in ns) remaining for this AI to send commands.
         *
         * @type {number}
         */
        this._addProperty("timeRemaining", serializer.defaultNumber(data.timeRemaining));

        /**
         * All the warehouses owned by this player. Includes the Headquarters.
         *
         * @type {list.<Warehouse>}
         */
        this._addProperty("warehouses", serializer.defaultArray(data.warehouses));

        /**
         * All the WeatherStations owned by this player.
         *
         * @type {list.<WeatherStation>}
         */
        this._addProperty("weatherStations", serializer.defaultArray(data.weatherStations));

        /**
         * If the player won the game or not.
         *
         * @type {boolean}
         */
        this._addProperty("won", serializer.defaultBoolean(data.won));


        //<<-- Creer-Merge: init -->> - Code you add between this comment and the end comment will be preserved between Creer re-runs.

        // put any initialization logic here. the base variables should be set from 'data' above
        // NOTE: no players are connected (nor created) at this point. For that logic use 'begin()'

        //<<-- /Creer-Merge: init -->>
    },

    gameObjectName: "Player",


    //<<-- Creer-Merge: added-functions -->> - Code you add between this comment and the end comment will be preserved between Creer re-runs.

    // You can add additional functions here. These functions will not be directly callable by client AIs

    //<<-- /Creer-Merge: added-functions -->>

});

module.exports = Player;
