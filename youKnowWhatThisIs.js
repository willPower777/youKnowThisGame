//This is a test to see if I can make the "initial" program...

var startInfo = function(){return window.confirm("Jim, you are about to play a game of You know What!\n"+
	"Do you accept?");};
var contestantName = function(){return window.prompt("What is your name valiant player? -Incase you aren't Jim");};
var readyFriend = function(){return window.confirm("Have you asked someone nicely?");};
var friendName = function(){return window.prompt("What is your friend's name? Please enter now.\n"+
	"(And PLEASE put in a regular name.)");};
var gameplayRules1 = function(){return window.confirm("Alright, your friend "+ nemesis +" will need to"
	+"pick 4 letters from A-F.\n They could be all the same (DDDD) or any mix in any order. For example:\n"+
	"(AAFF) (ABCD) (EAAE) (DCBA)\n Once they enter the code, you will have 12 attempts to\n"+
	"figure it out! Do you get it so far?");};
var gameplayRules2 = function(){return window.confirm("Okay so once the code is entered I will give you feedback on your attempts!\n"+
	"For instance if the winning code is (AADD) and you entered (DACC)\n I will say 'you have 1 correct placement' and"+
	"'you have 1 correct letter'\n Keep in mind placement will imply correct letter. Just 'letter' means not\n"+
	"the right placement but a correct letter in the code. But you are on the right track.\n Do you understand?");};
var winCondition = function(){return window.prompt("Alright friend what is your code? Please keep it to 4 letters.\n"+
	"Between A-F. -Or you'll be hearing from me again.");};
var playersTurn = function(){return window.prompt("So, "+playerName+" what is your first guess? Remember:\n"+
	"Exactly 4 Letters please between A-F, any order. GOOD LUCK!");};
var winConditionClean=[];
var nemesis;
var enteredCode;
var codeArray=[];
var playerName;
var previousGuesses = [];

var checkCodeLength = function(enteredCode){
			while (enteredCode.length!=4){
				enteredCode = window.prompt("Apparently, you didn't notice the 4 letter limit and requirement. \n Try Again!")
			};
	return enteredCode;
};
//these two functions check the entered code
var checkCodeCondition = function(enteredCode){
	checkCodeLength(enteredCode);
	for (var i = 0; i< enteredCode.length; i++){
		codeArray.push(enteredCode.charAt(i))
	}
	//Do I need to make the following an Array? Javascript makes string Inmutable; apparently not easily changed
	// Above 'for' loop is trying to start that but then how to match? Tested matching and I think it works.
	for (var i = 0; i< codeArray.length; i++){
		if (codeArray[i].match(/\d/)!=null){
			while (codeArray[i].match(/\d/)!= null){
				codeArray[i] = window.prompt("It appears your "+(i+1)+" entry is a number not a letter.\n"+
				"Please re-enter that one letter now.");
			};
			codeArray[i] = codeArray[i].toUpperCase();
		} else if(codeArray[i].match(/\W/)!=null){
			codeArray[i] = window.prompt("It appears your "+(i+1)+" entry is a symbol not a letter.\n"+
				"Please re-enter that one letter now.");
			codeArray[i]= codeArray[i].toUpperCase();
		} else {
			codeArray[i]= codeArray[i].toUpperCase();
		}
	}
	//Following is to check if entry is between A-F used to try enteredCode.charAt(i) but strings are inmutable
	//Also below I originally used || to check but if it was an A than the following were true and causing probs
	//TO DO - Look into making array for below set to shorten this up perhaps?
	for (var i=0; i< codeArray.length; i++){
		if (codeArray[i]!='A' &&
			codeArray[i]!='B' &&
			codeArray[i]!='C' &&
			codeArray[i]!='D' &&
			codeArray[i]!='E' &&
			codeArray[i]!='F'){
			while (codeArray[i]!='A' &&
			codeArray[i]!='B' &&
			codeArray[i]!='C' &&
			codeArray[i]!='D' &&
			codeArray[i]!='E' &&
			codeArray[i]!='F'){
			codeArray[i] = window.prompt("It appears your "+(i+1)+" entry is not between A-F\n"+
				"Or maybe you put in a symbol... tsk tsk...\nPlease enter that letter now.");
			};
		}
	}
	var codeArrayReturn=codeArray;
	// console.log(codeArray+" right before emptying line")
	//Doing this to keep the array from building up in subsequent usages
	codeArray=[];
	// console.log(codeArray+" right after emptying line")
	// console.log(codeArrayReturn+" makin sure it returns something")
	return codeArrayReturn;
};

function mainMind(){
	var answer1 = startInfo();
	if (answer1!=true){
		alert("Let's not triffle the weary. Please come back when you dare!");
		return;
	} else if (answer1 == true){
		//start of the game with entry info
		alert("Alright then let's start!");
		playerName = contestantName();
		// console.log(playerName + typeof playerName);
		while (playerName.match(/\d+/g) != null ){
			playerName = window.prompt("So you didn't enter it quite right. Okay that can happen. \n"+
				"Try again with a name, please");
		}
		alert("Okay "+ playerName +" you will need a hapless friend. Grab one now");
		var prepFriend = readyFriend();
		while (prepFriend != true){
			alert("Try to get them this time!");
			prepFriend = readyFriend();
		} 
		nemesis = friendName();
		while (nemesis.match(/\d+/g) != null){
			nemesis = window.prompt("Alright try that name of your friend again without the numbers!");
		}
		var ruleSet1 = gameplayRules1();
		while (ruleSet1!=true){
			alert("Come on it isn't that hard. Please re-read");
			ruleSet1 = gameplayRules1();
		};
		var ruleSet2 = gameplayRules2();
		while (ruleSet2!=true){
			alert("Really try to get it this time man!");
			ruleSet2 = gameplayRules2();
		}
		if (ruleSet2==true){
			alert("Alrighty then; on with the game!");
		};
		var winningCode = winCondition();
		console.log(winningCode+" preClean");
		//above call may be redundant. May just need below line. And or it needs to be assigned a variable?
		winConditionClean = checkCodeCondition(winningCode);
		console.log(winConditionClean+" postClean");
		alert("Now it's time for the player to guess. You have at most 12 chances.");
		var playersGuess = playersTurn();
		console.log(winConditionClean+" right after playersGuess happens")
		//previous calls the variable out and player enters. Line below should clean it up like the other.
		var timeToPlay = function(){
			for (t=1; t<=12; t++){
				console.log(winConditionClean+" just before reenter of new code")
				var playersTurnClean = checkCodeCondition(playersGuess);
				console.log(playersTurnClean+" now this is the players entryCleaned");
				console.log(t +"this is t");
				previousGuesses.push(playersTurnClean+"\n");
				// console.log(winConditionClean+" pre if winning statementClean");
				// console.log(playersTurnClean+" now this is the players entry after the push");
				// alert("this the win condition "+winConditionClean+"\nthis the play turn "+playersTurnClean);
				if ((winConditionClean[0] == playersTurnClean[0])&&(winConditionClean[1] == playersTurnClean[1])&&
					(winConditionClean[2] == playersTurnClean[2])&&(winConditionClean[3] == playersTurnClean[3])&& (t=1)){
					return alert("You WON! You made it even on your first try! WOOHOO!\n"+
						"The code was: "+winConditionClean+"\n Your winning guess was: "+playersTurnClean);
				} else if ((winConditionClean[0] == playersTurnClean[0])&&(winConditionClean[1] == playersTurnClean[1])&&
					(winConditionClean[2] == playersTurnClean[2])&&(winConditionClean[3] == playersTurnClean[3]) && (t==12)) {
					return alert("WHEW! ...You finally won! You got it right after only "+t+" times! Yay!!\n"+
						"The code was: "+winConditionClean+"\n Your winning guess was: "+playersTurnClean+ "\n"+
						"Your previous guesses were: " + previousGuesses);
				} else if ((winConditionClean[0] == playersTurnClean[0])&&(winConditionClean[1] == playersTurnClean[1])&&
					(winConditionClean[2] == playersTurnClean[2])&&(winConditionClean[3] == playersTurnClean[3])) {
					return alert("You got it! After only "+t+" tries!\n"+
						"The code was: "+winConditionClean+"\n Your winning guess was: "+playersTurnClean+ "\n"+
						"Your previous guesses were: " + previousGuesses);
				} else {
					var inPlaceLetter=0;
					var rightLetter=0;
					for(i=0; i<playersTurnClean.length; i++){
						if (playersTurnClean[i]==winConditionClean[i]){
							inPlaceLetter++;
						} 
					}
					//---NEED To figure out below how to get to check against all in an array. line 149
					//--added winConditionPluck to be able to pull a checked value out of the array to not doublecheck
					var winConditionPluck=winConditionClean;
					for(j=0; j<playersTurnClean.length; j++){
						// console.log(playersTurnClean[i]);
						console.log(winConditionPluck+" this is pluck total");
						console.log(winConditionPluck[j]+" this is pluck single "+j+" time through this player guess: " +playersTurnClean[j]);
						console.log(winConditionPluck.indexOf(playersTurnClean[j])+" That is indexOf pluck array based on players guess letter");
						if ((playersTurnClean[j]!=winConditionClean[j]) && 
							(winConditionPluck.indexOf(playersTurnClean[j])!=-1)){
							rightLetter++;
							console.log(rightLetter +" this time"+j)
							var winConditionPulled=winConditionPluck.splice(winConditionPluck.indexOf(playersTurnClean[j]),1);
						}
					}
					playersGuess=window.prompt("Okay you didn't get it with that last guess.\n"+
						"You have "+inPlaceLetter+" correct letter(s) in the right placement!!\n"+
						"You got "+rightLetter+" letter(s) in the code but not in the right spot.\n"+
						"Your previous guesses were: \n"+ previousGuesses+ "  \nNow you should try again!"+
						" You have " +(12-t)+ " tries left!");
				}
			};
			return alert("Sadly, it would appear that "+contestantName+"\nhas been bested by " +friendName+"!\n"+
				"The code from "+friendName+" was: "+winConditionClean+"\n"+ 
				"Your previous guesses were: " + previousGuesses);

		};
		timeToPlay();
	return;
	}
}
mainMind();