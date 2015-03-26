// Generated by Creer, git hash Error: git probably not installed
// Note: this is the file you should modify. The logic generated by Creer should be mostly in ./generated/
var Class = require("../../structures/class");
var GeneratedChecker = require("./generated/generatedChecker")

// @class Checker: A checker on the game board
var Checker = Class(GeneratedChecker, {
	init: function(data) {
		GeneratedChecker.init.apply(this, arguments);

		// put any initialization logic here. the base variables should be set from 'data' in GeneratedChecker's init function
	},

	/// Moves the checker from its current location to the given (x, y)
	// @param <int> x: The x coordinate to move to
	// @param <int> y: The y coordinate to move to
	move: function(player, x, y) {
		game = this.game;
		if(this.owner !== player) {
			return game.declairLoser(commandingPlayer, "tried to move a checker they didn't own");
		}

		if(game.checkerMoved) {
			if(game.checkerMoved !== this) {
				return game.declairLoser(player, "tried to move a diferent checker than the already moved one");
			}
			else if(!game.checkerMovedJumped) {
				return game.declairLoser(player, "tried to move again after not jumping another checker.");
			}
		}

		if(game.getCheckerAt(x, y)) {
			return game.declairLoser(player, "tried to move onto another checker");
		}

		var yOffset = 0;
		var yKing = 0;
		if(this.owner.id == 0) { // then first player, moves down
			yOffset = 1;
			yKing = game.boardHeight - 1;
		}
		else {
			yOffset = -1;
			yKing = 0;
		}

		var dy = y - this.y
		var dx = x - this.x

		if(!this.kinged) { // then check if they are moving the right direction via dy when not kinged
			if((yOffset == 1 && dy < 1) || (yOffset == -1 && dy > -1)) {
				return game.declairLoser(player, "moved in the wrong vertical direction");
			}
		}

		var jumped;
		if(Math.abs(dx) === 2 && Math.abs(dy) === 2) { // then it's jumping something
			jumped = game.getCheckerAt(this.x + dx/2, this.y + dy/2);

			if(!jumped) {
				return game.declairLoser(player, "tried to jump nothing");
			}
			else if(jumped.owner.id === this.owner.id) {
				return game.declairLoser(player, "tried to jump own checker");
			}
		}
		else if(Math.abs(dx) === 1 && Math.abs(dy) === 1) { // then they are just moving 1 tile diagonally
			if(game.checkerMovedJumped) {
				return game.declairLoser(player, "current checker must jump again, not move diagonally one tile");
			}
			// else valid as normal move
		}
		else {
			return game.declairLoser(player, "can't move there");
		}

		// if we got here all the checks passed! the checker moves

		this.x = x;
		this.y = y;

		if(this.y === yKing) {
			this.kinged = true;
		}

		if(!game.checkerMoved) {
			game.checkerMoved = this;
		}

		if(jumped) {
			if(jumped.owner !== this.owner) {
				game.checkers.removeElement(jumped);

				var checkersOwnerWon = true;
				for(var i = 0; i < game.checkers.length; i++) {
					if(this.owner !== game.checkers[i].owner) {
						checkersOwnerWon = false;
						break;
					}
				}

				if(checkersOwnerWon) {
					return game.declairWinner(checkersOwner);
				}
			}

			game.checkerMovedJumped = true;
		}

		return true;
	},
});

module.exports = Checker;
