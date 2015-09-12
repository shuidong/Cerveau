// Generated by Creer at 08:51PM on September 11, 2015 UTC, git hash: '03260fe96997cbe767581241f330924f818c9728'
// Note: this file should never be modified, instead if you want to add game logic modify just the ../Player.js file. This is to ease merging main.data changes

var serializer = require("../../../utilities/serializer");
var Class = require("../../../utilities/class");
var GameObject = require("../gameObject");


// @class GeneratedPlayer: The generated version of the Player, that handles basic logic.
var GeneratedPlayer = Class(GameObject, {
    init: function(data) {
        GameObject.init.apply(this, arguments);

        this.checkers = (data.checkers === undefined ? [] : data.checkers);
        this.clientType = serializer.toString(data.clientType === undefined ? "" : data.clientType);
        this.lost = serializer.toBoolean(data.lost === undefined ? false : data.lost);
        this.name = serializer.toString(data.name === undefined ? "" : data.name);
        this.reasonLost = serializer.toString(data.reasonLost === undefined ? "" : data.reasonLost);
        this.reasonWon = serializer.toString(data.reasonWon === undefined ? "" : data.reasonWon);
        this.timeRemaining = serializer.toNumber(data.timeRemaining === undefined ? 0 : data.timeRemaining);
        this.won = serializer.toBoolean(data.won === undefined ? false : data.won);
        this.yDirection = serializer.toInteger(data.yDirection === undefined ? 0 : data.yDirection);

        this._serializableKeys["checkers"] = true;
        this._serializableKeys["clientType"] = true;
        this._serializableKeys["lost"] = true;
        this._serializableKeys["name"] = true;
        this._serializableKeys["reasonLost"] = true;
        this._serializableKeys["reasonWon"] = true;
        this._serializableKeys["timeRemaining"] = true;
        this._serializableKeys["won"] = true;
        this._serializableKeys["yDirection"] = true;
    },

    gameObjectName: "Player",

});

module.exports = GeneratedPlayer;