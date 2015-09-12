// Generated by Creer at 08:51PM on September 11, 2015 UTC, git hash: '03260fe96997cbe767581241f330924f818c9728'
// Note: this file should never be modified, instead if you want to add game logic modify just the ../GameObject.js file. This is to ease merging main.data changes

var serializer = require("../../../utilities/serializer");
var Class = require("../../../utilities/class");
var BaseGameObject = require("../../baseGameObject");


// @class GeneratedGameObject: The generated version of the GameObject, that handles basic logic.
var GeneratedGameObject = Class(BaseGameObject, {
    init: function(data) {
        BaseGameObject.init.apply(this, arguments);


    },

    gameObjectName: "GameObject",

    _runLog: function(player, data, asyncReturn) {
        var message = serializer.toString(data.message);

        var returned = this.log(player, message, asyncReturn);
    },

});

module.exports = GeneratedGameObject;