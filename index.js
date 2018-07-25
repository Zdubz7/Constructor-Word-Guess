// This variable pulls the Word.Js Javascript File.
var Name = require("./Word.js");

// This variable grabs the inquirer npm package installed in the root directory and asks the user to enter a letter to begin the game.
var inquirer = require("inquirer");

// This variable requires the cli-color npm package to add some color to this game.
var clc = require('cli-color');

// This variable requires the figlet npm package to convert text to a line drawing.
var draw = require('figlet');

// This is variable is an npm package which is used to determine if the letter the user inputs is actually a letter or not a letter.
var isLetter = require('is-letter');

// This variable creates boxes in the terminal.
const boxen = require('boxen');

// This variable is pre-defined color for when the guess is incorrect.
var incorrect = clc.red.bold;

// This variable is pre-defined color for when the user guesses correctly.
var correct = clc.green.bold;

// This variable is the pre-defined color for the text when the user is playing the game.
var gameTextColor = clc.tan;

// This variable sets the variable to true for that letter when the user guesses correctly, whereas the default value of this variable is false.
var userGuessedCorrectly = false;

// This variable creates the predefined list of words for the user to choose from within the word bank.
// The name List is people who were either born in pennsylvania, or resided in pennsylvania who were famous.
var nameList = ["BenjaminFranklin", "WilliamPenn", "ArnoldPalmer", "MargaretMead", "BetsyRoss", "MaxwellAnderson", "AndrewMellon", "ReggieJackson", "RobertFulton", "DanielBoone", "MauriceSendak", "ManRay", "BenjaminWest", "StuartDavis", "JamesBuchananJR"];

// This variable chooses a name at random for the variable name list.
var randomName;
var otherName;

// These variables create counts for the wins, losses, and the guesses remaining for the user in the game.
var wins = 0;
var losses = 0;
var chancesRemaining = 10;

// This variable creates a letter placement to hold the letter that the user enters at the inquirer prompt, which the inquierer npm package pulls the general twitter api.
var userGuess = "";

// This varaible is used to hold letters that the user has already guessed in the word bank.
var lettersAlreadyGuessedList = "";
var lettersAlreadyGuessedListArray = [];

// This variable contains the slots that have been filled in with a guessed letter for the name as well as when the game starts or is reset, this value should represent 0.
var blanksFilledIn = 0;

// This function turnts the title Zachs Famous Character Hangman Game into a drawn image when the user enters the game.
draw("Zach's Famous Character Hangman Game", function (error, data) {
	if (error) {
		console.log('Thats Odd, Something Isnt Working Here...');
		console.dir(error);
		return;
	}
	console.log(data);

	// This console log screen reveals the WELCOME SCREE TEXT that the user will see when typing node index.js in the root directory of the node.js app.
	console.log(gameTextColor("Welcome to Zach's Famous Character Hangman Game!"));
	console.log(gameTextColor("The Theme Is Famous People Who Are Born Or Spent Most Of Their Life In Pennsylvania."));

	// This variable holds the game instructions on how to play the Zach's Famous Character Hangman Game.
	var howToPlay =
		"==========================================================================================================" + "\r\n" +
		"Displayed Below Are The Instructions On How To Play Zach's Famous Character Hangman Game." + "\r\n" +
		"==========================================================================================================" + "\r\n" +
		"When Commencing The Game, YOU The User Will Be Prompted To Enter A Letter, Input Any Letter A Through Z On The Keyboard To Guess A Letter For The _BLANK_." + "\r\n" +
		"All YOU have to do is keep typing letters, When guessing letters YOUR choice will either be correct or incorrect." + "\r\n" +
		"If The User's Answer Is Incorrect, The Letter YOU Guessed Will Not Appear In The Word." + "\r\n" +
		"For Every Incorrect Guess, The Number Of Guesses Remaining Decreases By 1." + "\r\n" +
		"If The Letter YOU Guessed Is Correct, The Letter YOU Guessed Appears In The Word." + "\r\n" +
		"If YOU Correctly Guess All The Letters In The Word Before The Number Of Guesses Remaining Reaches 0, YOU WIN." + "\r\n" +
		"If YOU Run Out Of Guesses Before The Entire Word Is Revealed, YOU LOSE. The Game over." + "\r\n" +
		"===========================================================================================================" + "\r\n" +
		"YOU Can Exit The Game At Any Time By Inputting Ctrl + C On YOUR Keyboard." + "\r\n" +
		"==========================================================================================================="
	console.log(gameTextColor(howToPlay));

	// This section asks the user if they are ready to play the game.
	confirmStart();
});

// This function uses the Inquierer Package to display the game confirmation prompting the user to enter his or her name.
function confirmStart() {
	var readyToStartGame = [{
			type: 'text',
			name: 'playerName',
			message: 'HI :) What Is Your Name?'
		},
		{
			type: 'confirm',
			name: 'readyToPlay',
			message: 'Are YOU ready to play Zachs Famous Character Hangman Game?',
			default: true
		}
	];

	inquirer.prompt(readyToStartGame).then(answers => {


		// This sections starts the game if the user is compliant and confirms they want to play Zachs Famous Character Hangman Game.
		if (answers.readyToPlay) {
			console.log(gameTextColor("Great Job Entering Your Information! Welcome To The Start Of The Game, " + answers.playerName + ". Let's Start Playing Zachs Famous Character Hangman Game :)."));
			startGame();
		} else {

			// This section controls exiting the game if the user decides that they don't want to play, if they don't want to play anymore the following message is displayed.
			console.log(gameTextColor("I'm Sorry YOU Don't Want To Play, " + answers.playerName + "! Come Back When You Have Free Time."));
			return;
		}
	});
}

// This function starts the functionality of the gameplay.
function startGame() {

	// This variable resets the number of guesses remaining when the user begins a new game.
	chancesRemaining = 10;

	// This section picks a random name from the list or names.
	chooseRandomName();

	// These variables empty out the list of already guessed letters once the game has been reset.
	lettersAlreadyGuessedList = "";
	lettersAlreadyGuessedListArray = [];
}
// This function randomly chooses a name from the list of famous pennsylvanians in the name bank array.
function chooseRandomName() {

	// This variable randomly generates a name from the nameList Array.
	randomName = nameList[Math.floor(Math.random() * nameList.length)].toUpperCase();

	// This variable sets the random name chosen from the name list to a random name.
	otherName = new Name(randomName);

	// This section tells the user how many letters are in the Name they are trying to guess and logs it to the console.
	console.log(gameTextColor("The Name YOU Are Guessing Contains " + randomName.length + " Letters."));
	console.log(gameTextColor("NAME TO GUESS:"));

	// This variable uses the Name constructor in Word.js to split the Name and generate letters.
	otherName.splitName();
	otherName.generateLetters();
	guessLetter();
}

// This function will ask the user to enter a letter and the letter the user chooses is the users guess.
function guessLetter() {

	// This section keeps asking the user to enter a letter if there are any slots and or underscores that still need to be filled in the game or if there are still guesses remaining.
	if (blanksFilledIn < otherName.letters.length || chancesRemaining > 0) {
		inquirer.prompt([{
			name: "Letter",
			message: "Guess A Letter:",

			// This section checks is the value of the input is actually a letter instead of anything else, this section is also using the is-letter npm package to control that.
			validate: function (value) {
				if (isLetter(value)) {
					return true;
				} else {
					return false;
				}
			}
		}]).then(function (guess) {

			// This section converts all of the letters guessed by the user to appear in Uppercase.
			guess.letter.toUpperCase();
			console.log(gameTextColor("YOU Have Guessed: " + guess.letter.toUpperCase()));

			// This variables creates as assumption that the users guess is false at this moment in time.
			userGuessedCorrectly = false;

			// This section finds out if the letter chosen was already guessed by the user. If the letter has already been guessed by the user the user will be prompted to enter another letter. The user cannot continue with the game if they enter the same letter more than one time.
			if (lettersAlreadyGuessedListArray.indexOf(guess.letter.toUpperCase()) > -1) {

				// This section prompts the user if they have already guessed a letter.
				console.log(gameTextColor("SORRY, YOU Have Already Guessed That Letter. Please Enter Another Letter To Proceed."));
				console.log(gameTextColor("====================================================================="));
				guessLetter();
			}

			// This section controls if the user has entered a letter that was not already previously guessed.
			else if (lettersAlreadyGuessedListArray.indexOf(guess.letter.toUpperCase()) === -1) {

				// This section adds a letter to the list of already guessed letters.
				lettersAlreadyGuessedList = lettersAlreadyGuessedList.concat(" " + guess.letter.toUpperCase());
				lettersAlreadyGuessedListArray.push(guess.letter.toUpperCase());

				// This section displays the letters already guessed by the user in the letter bank.
				console.log(boxen(gameTextColor('Letters YOU Have Already Guessed: ') + lettersAlreadyGuessedList, {
					padding: 1
				}));

				// This section loops through all of the letters in the name and determines if the letter the user picks matches one of the letters in the games name array.
				for (i = 0; i < otherName.letters.length; i++) {

					// This section determines if the user guess equals one of the letters or characters in the name, as well as determines if the letters or characters in name equal lettersGuessedCorrectly, if not lettersGuessedCorrectly false and the user loses a guess.
					if (guess.letter.toUpperCase() === otherName.letters[i].character && otherName.letters[i].letterGuessedCorrectly === false) {

						// This variable section sets letterGuessedCorrectly for that specific letter equal to true.
						otherName.letters[i].letterGuessedCorrectly === true;

						// This variable section sets userGuessedCorrectly to a value of true.
						userGuessedCorrectly = true;
						otherName.underscores[i] = guess.letter.toUpperCase();
						// someName.underscores.join("");
						// console.log(someName.underscores);

						// This section increases the number of slots and underscores filled in with letters by 1.
						blanksFilledIn++;
						//console.log("Number of slots remaining " + slotsFilledIn);
					}
				}
				console.log(gameTextColor("NAME TO GUESS:"));
				otherName.splitName();
				otherName.generateLetters();

				// This section controls if the user guessed correctly as well as displays a message.
				if (userGuessedCorrectly) {

					// This displays a message tot he user that they are correct as well as the letter is in the name that the user is trying to guess.
					console.log(correct('CORRECT!'));
					console.log(gameTextColor("====================================================================="));

					// This section controls checking if the user won or lost after each letter guess during the game.
					checkIfUserWon();
				}

				// This section controls if the user guessed correctly as well as displays a message.
				else {

					// This displays a message to the user that they are incorrect.
					console.log(incorrect('INCORRECT!'));

					// This variable decreases the number of guesses remaining by 1 and reveals the number of guesses remaining for the user.
					chancesRemaining--;
					console.log(gameTextColor("YOU Still Have " + chancesRemaining + " Guesses Left."));
					console.log(gameTextColor("====================================================================="));

					// This section checks if the user has won or lost after each letter the user guesses.
					checkIfUserWon();
				}
			}
		});
	}
}

// This function will check if the user won or lost after the user guesses a letter.
function checkIfUserWon() {
	// This section controls if the number of guesses remaining is 0, the game ends.
	if (chancesRemaining === 0) {
		console.log(gameTextColor("====================================================================="));
		console.log(incorrect('SORRT YOU FAILED. BETTER LUCK NEXT TIME :).'));
		console.log(gameTextColor("The Correct Name Was: " + randomName));
		// This variable increases the loss counter by 1.
		losses++;
		// These messages display the users wins and losses in the terminal.
		console.log(gameTextColor("Wins: " + wins));
		console.log(gameTextColor("Losses: " + losses));
		console.log(gameTextColor("====================================================================="));
		// This callback function asks the user if they would like to play again.
		playAgain();
	}

	// In this section if the number of slots and underscores that have been occuplied by a letter equals the number of letters in the name, the user has won.
	else if (blanksFilledIn === otherName.letters.length) {
		console.log(gameTextColor("====================================================================="));
		console.log(correct("YOU WON! CONGRATULATIONS FOR COMPLETEING ZACH'S FAMOUS CHARACTER HANGMAN GAME!"));
		// This variable increases the win counter by one and displays the result in the terminal.
		wins++;
		// This section displays a message to the user of the total wins and losses.
		console.log(gameTextColor("Wins: " + wins));
		console.log(gameTextColor("Losses: " + losses));
		console.log(gameTextColor("====================================================================="));
		// This function asks the user if they want to play again.
		playAgain();
	} else {
		// This section controls if the user doesnt win or lose to keep running the inquierer package.
		guessLetter("");
	}

}

//Create a function that will ask user if they want to play again at the end of the game.
function playAgain() {
	var playGameAgain = [{
		type: 'confirm',
		name: 'playAgain',
		message: 'Do you want to play again?',
		default: true
	}];

	inquirer.prompt(playGameAgain).then(userWantsTo => {
		if (userWantsTo.playAgain) {
			//Empty out the array that contains the letters already guessed.
			lettersAlreadyGuessedList = "";
			lettersAlreadyGuessedListArray = [];
			//Set number of slots filled in with letters back to zero.
			blanksFilledIn = 0;
			console.log(gameTextColor("Great! Welcome back. Let's begin..."));
			//start a new game.
			startGame();
		} else {
			//If user doesn't want to play again, exit game.
			console.log(gameTextColor("Good bye! Come back soon."));
			return;
		}
	});
}