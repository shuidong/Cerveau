// Generated by Creer at 06:57PM on October 26, 2015 UTC, git hash: '1b69e788060071d644dd7b8745dca107577844e1'

var Class = require(__basedir + "/utilities/class");
var serializer = require(__basedir + "/gameplay/serializer");
var log = require(__basedir + "/gameplay/log");
var GameObject = require("./gameObject");

//<<-- Creer-Merge: requires -->> - Code you add between this comment and the end comment will be preserved between Creer re-runs.

// any additional requires you want can be required here safely between cree runs
//<<-- /Creer-Merge: requires -->>

// @class Building: A basic building. It does nothing besides burn down. Other Buildings inherit from this class.
var Building = Class(GameObject, {
    /**
     * Initializes Buildings.
     *
     * @param {Object} a simple mapping passsed in to the constructor with whatever you sent with it.
     */
    init: function(data) {
        GameObject.init.apply(this, arguments);

        /**
         * when true this building has already been bribed this turn and cannot be bribed again this turn.
         *
         * @type {boolean}
         */
        this._addProperty("bribed", serializer.defaultBoolean(data.bribed));

        /**
         * The Building directly to the east of this building, or null if not present.
         *
         * @type {Building}
         */
        this._addProperty("buildingEast", serializer.defaultGameObject(data.buildingEast));

        /**
         * The Building directly to the north of this building, or null if not present.
         *
         * @type {Building}
         */
        this._addProperty("buildingNorth", serializer.defaultGameObject(data.buildingNorth));

        /**
         * The Building directly to the south of this building, or null if not present.
         *
         * @type {Building}
         */
        this._addProperty("buildingSouth", serializer.defaultGameObject(data.buildingSouth));

        /**
         * The Building directly to the west of this building, or null if not present.
         *
         * @type {Building}
         */
        this._addProperty("buildingWest", serializer.defaultGameObject(data.buildingWest));

        /**
         * How much fire is currently burning the building, and thus how much damage it will take at the end of its owner's turn. 0 means no fire.
         *
         * @type {number}
         */
        this._addProperty("fire", serializer.defaultInteger(data.fire));

        /**
         * How much health this building currently has. When this reaches 0 the Building has been burned down
         *
         * @type {number}
         */
        this._addProperty("health", serializer.defaultInteger(data.health));

        /**
         * true if this is the Headquarters of the owning player, false otherwise. Burning this down wins the game for the other Player.
         *
         * @type {boolean}
         */
        this._addProperty("isHeadquarters", serializer.defaultBoolean(data.isHeadquarters));

        /**
         * The player that owns this building. If it burns down (health reaches 0) that player gets an additional bribe(s).
         *
         * @type {Player}
         */
        this._addProperty("owner", serializer.defaultGameObject(data.owner));

        /**
         * The location of the Building along the x-axis
         *
         * @type {number}
         */
        this._addProperty("x", serializer.defaultInteger(data.x));

        /**
         * The location of the Building along the y-axis
         *
         * @type {number}
         */
        this._addProperty("y", serializer.defaultInteger(data.y));


        //<<-- Creer-Merge: init -->> - Code you add between this comment and the end comment will be preserved between Creer re-runs.

        this.health = this.maxHealth;

        if(this.isHeadquarters) {
            this.makeHeadquarters();
        }

        //<<-- /Creer-Merge: init -->>
    },

    gameObjectName: "Building",


    //<<-- Creer-Merge: added-functions -->> - Code you add between this comment and the end comment will be preserved between Creer re-runs.

    maxHealth: 100,

    /**
     * does the basic checking that all buildings must meet for valid bribes
     *
     * @param {Player} player - the player trying to bribe this building
     * @param {*} errorValue - the error value to store in the game logic error
     * @returns {Object|undefined} a game logic error is returned if the bribe is NOT valid, undefined otherwise
     */
    _checkIfBribeIsValid: function(player, errorValue) {
        var reason;
        if(this.owner !== player) {
            reason = "Cannot bribe an enemy's building.";
        }
        else if(player.bribesRemaining <= 0) {
            reason = "Player has no bribes remaining to bribe this building with";
        }
        else if(this.health <= 0) {
            reason = "This building has been burned down and cannot be bribed.";
        }
        else if(this.bribed) {
            reason = "This building has already been bribed this turn and cannot be bribed again.";
        }

        if(reason) {
            return this.game.logicError(errorValue, reason);
        }
    },

    /**
     * sets this building as the headquarters for its owner. This should only be called once per player, and only during game initialization
     */
    makeHeadquarters: function() {
        this.isHeadquarters = true;
        this.owner.headquarters = this;
        this.health *= this.game.headquartersHealthScalar;
    },

    //<<-- /Creer-Merge: added-functions -->>

});

module.exports = Building;
