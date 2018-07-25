// This variable depends on the letter constructor in the letter.js javascript file so it needs to be acquired in such a way that we can use it in the current file.
var Letter = require("./Letter");

var Name = function(myName) {
	// This variable takes a chosen name from the name list.
	this.myName = myName;
	// This variable is an array of letters that represents the letters of the remaining chosen name.
	this.letters = [];
	// This variable is an array of underscores that represents the number of underscores that the user needs for the name chosen at random and is based on the number of letters in the name.
	this.underscores = [];
	// This variable applies the split method after we acquire the random name from the name list.
	this.splitName = function() {
		this.letters = this.myName.split("");
		//console.log(this.letters);
		// This variable shows the number of underscores needed to be guesses based on the length of the this.letters array which is in the word constructor.
		numberUnderscoresNeeded = this.letters.length;
		//console.log("Underscores: " + numberUnderscoresNeeded);
		//Create for loop that pushes the underscores to the this.underscores array in Word constructor.
		// for (var i=0; i < numberUnderscoresNeeded; i++ ) {
		//this.underscores.push("_ ");
		// }
		//console.log(this.underscores);
		// In this section the .join method is being applied to each underscore that we have pushed to the this.underscores array by a space.
		console.log(this.underscores.join(" "));
	};
	this.generateLetters = function() {
		for (i=0; i < this.letters.length; i++){
			this.letters[i] = new Letter (this.letters[i]);
			//this.letters[i].letterGuessedCorrectly = true;
			//This line of code shows the super array of letter objects for debugging purposes.
			//console.log(this.letters[i]);
			this.letters[i].showCharacter();
		}
	};
};

//test word constructor. Test successful.
// var someWord = new Word ("Burnsville");
// someWord.splitWord();
// someWord.generateLetters();

//Export the Word constructor so that we can use/reference it in index.js.
module.exports = Name;

