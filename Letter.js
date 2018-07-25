// This function takes a variable character as an argument and makes a comparison against the underlying character, it will update the stored boolean value to true if the character was guessed correctly.
var Letter = function(character) {

	// This section is a string that stores the underlying character for the letter.
	this.character = character.toUpperCase();

	// This section is a boolean value that stores whether that letter has been guessed by the user.
	this.letterGuessedCorrectly = false;

	// This function returns the underlying character if one of the letters has been guessed, or a acts as a space holder if the letter hasn't been guessed yet by the user.
	this.showCharacter = function() {
		if (this.letterGuessedCorrectly) {
			console.log(this.character);
		}
		else {
			// console.log ("_");
		}

	};
};

// This section exports the Letter constructor so that the javascript file Word.js can use it.
module.exports = Letter;