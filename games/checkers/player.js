// Generated by Creer at 08:51PM on September 11, 2015 UTC, git hash: '03260fe96997cbe767581241f330924f818c9728'
// Note: this is the file you should modify. The logic generated by Creer should be mostly in ./generated/

var Class = require("../../utilities/class");
var GeneratedPlayer = require("./generated/generatedPlayer");

//<<-- Creer-Merge: requires -->> - Code you add between this comment and the end comment will be preserved between Creer re-runs.
// any additional requires you want can be required here safely between cree runs
//<<-- /Creer-Merge: requires -->>

// @class Player: A player in this game. Every AI controls one player.
var Player = Class(GeneratedPlayer, {
    /**
     * Initializes Players.
     *
     * @param {Object} a simple mapping passsed in to the constructor with whatever you sent with it.
     */
    init: function(data) {
        GeneratedPlayer.init.apply(this, arguments);

        //<<-- Creer-Merge: init -->> - Code you add between this comment and the end comment will be preserved between Creer re-runs.
        // put any initialization logic here. the base variables should be set from 'data' in Generated${obj_key}'s init function
        // NOTE: no players are connected at this point.
        //<<-- /Creer-Merge: init -->>
    },


    //<<-- Creer-Merge: added-functions -->> - Code you add between this comment and the end comment will be preserved between Creer re-runs.
    // You can add additional functions here. These functions will not be directly callable by client AIs
    //<<-- /Creer-Merge: added-functions -->>

});

module.exports = Player;
