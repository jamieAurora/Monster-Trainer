// Multiple Character Selection
// by Jamie Geist
// Date: 3/18/19
/*:
* @plugindesc Custom plugins for Monster Trainer
* @author JamieGeist

* @param null
* @desc Fill out later.
* @default 0
*/
var stamina = 3;
var trainableParty;
var char1trained = false;
var char2trained = false;
var char3trained = false;
var char4trained = false;
var dayOfWeek = 1;

var startFunc;
startFunc = function($this){
  var n = 0;
  while (n < 20){
    $gameParty.removeActor(n);
    n++;}
  $gameParty.addActor(1);};

var checkForDayEnd;
checkForDayEnd = function($this){
  if (char1trained === true && char2trained === true && char3trained === true && char4trained === true){
    //End the day, go to the new day.
    goToNewDay();}
  else {
    chooseTraining();}};

//This function takes the name of the character, and the processID, and adjusts the trust of the character.
//If the processID is 1, the character's trust is downgraded.
//If the processID is 2, the character's trust is upgraded.
var adjustTrust;
adjustTrust = function(actorName, processID){
  var actorVar;
  switch (actorName){
      case "Jesse":
        actorVar = 101;
        break;
      case "Kirk":
        actorVar = 101;
        break;
      case "Hestia":
        actorVar = 101;
        break;
      case "Hellmask":
        actorVar = 101;
        break;
      case "Hazel":
        actorVar = 101;
        break;
      case "Tsusie":
        actorVar = 101;
        break;
      case "Cassette":
        actorVar = 101;
        break;
      case "Marimo":
        actorVar = 101;
        break;
      case "Feliz":
        actorVar = 101;
        break;
      case "Marble":
        actorVar = 101;
        break;}
  if (processID === 1){
  var tempMath = $gameVariables.value(actorVar) - 3;
  $gameVariables.setValue(actorVar, tempMath);
  $gameMessage.add("...I feel like " + actorName + " trusts me a little less...");
  }
  if else (processID === 2){
    var tempMath = $gameVariables.value(actorVar) + 3;
    $gameVariables.setValue(actorVar, tempMath);
    $gameMessage.add("...I feel like " + actorName + " trusts me a bit more...");
  }
};

//This function sets all the charTrained values to false, letting them be trained again.
//It also increments dayOfTheWeek, and will display a game message saying the name of the current day.
//The function only goes to seven days, and will need to be reset.
var goToNewDay;
goToNewDay = function($this){
  char1trained = false;
  char2trained = false;
  char3trained = false;
  char4trained = false;
  stamina = 3;
  dayOfWeek++;
  switch(dayOfWeek){
    case 1:
    $gameMessage.add("SUNDAY");
    case 2:
    $gameMessage.add("MONDAY");
    case 3:
    $gameMessage.add("TUESDAY");
    case 4:
    $gameMessage.add("WEDNESDAY");
    case 5:
    $gameMessage.add("THURSDAY");
    case 6:
    $gameMessage.add("FRIDAY");
    case 7:
    $gameMessage.add("SATURDAY");}}

//This function takes in the partyID, the statID, and the drillID.
//The partyID is the ID of the character in the party.
//The statID is which stat will be raised. The drillID correlates to 1 for Light Drill, 10 for Heavy Drill.
var updateStat;
updateStat = function(partyID, statID, drillID){
  var statString;
  switch(statID){
    case 0:
    statString "ATK";
    break;
    case 1:
    statString = "Sp.ATK";
    break;
    case 2:
    statString = "DEF";
    break;
    case 3:
    statString = "Sp.DEF";
    break;
    case 4:
    statString = "AGL";
    break;
    case 5:
    statString = "LUC";
    break;}
  //Stat increase for now is set for 5 for LDs, 10 for HDs. This may be altered later.
  statIncrease = 5 * drillID;
  $gameParty.members()[partyID].addParam((drillID + 2), statIncrease);
  $gameMessage.add( $gameParty.members()[partyID].name() + "'s " + statString " has risen by " + statIncrease + "!");
  stamina = stamina - drillID;
  if (stamina === 2){
    extraRep2(statID,partyID);}
  if (stamina === 1){
    extraRep1(statID,partyID);}}

//This function asks the player if they would like to execute an extra Light Drill for the selected character.
var extraRep1;
extraRep1 = function(statID, partyID){
  $gameTemp.clearCommonEvent(9);
  $gameTemp.clearCommonEvent(7);
  $gameTemp.reserveCommonEvent(8);
  $gameMessage.add("Should I have them do an extra rep?");
  $gameMap._interpreter.setupChoices([["Light Drill", "No"], 1]);
  $gameMessage.setChoiceCallback(function(responseIndex){
    if (responseIndex === 0){
      setTimeout(function(){
          updateStat(partyID, statID, 1);
          console.log($gameParty.members()[partyID].name());
          adjustTrust($gameParty.members()[partyID].name(), 1);
          //Check to see if we're going to the next person.
          checkForDayEnd();});}
    if (responseIndex === 1){
      setTimeout(function(){
        checkForDayEnd();});}});}

//This function asks the player if they would like to execute either an extra Light Drill or Heavy Drill for the character.
var extraRep2;
extraRep2 = function(statID,partyID){
  $gameTemp.clearCommonEvent(9);
  $gameTemp.reserveCommonEvent(7);
  $gameMessage.add("Should I have them do an extra rep?");
  $gameMap._interpreter.setupChoices([["Light Drill", "Heavy Drill", "No"], 1]);
  $gameMessage.setChoiceCallback(function(responseIndex){
    if (responseIndex === 0){
      setTimeout(function(){
          updateStat(partyID, statID, 1);});}
    if (responseIndex === 1){
      setTimeout(function(){
          updateStat(partyID, statID, 2);
          adjustTrust($gameParty.members()[partyID].name(), 1);
          checkForDayEnd();});}
    if (responseIndex === 2){
      setTimeout(function(){
        checkForDayEnd();});}});}

//Shows the icons of the characters.
var showTraineeIcons;
showTraineeIcons = function(id1,id2,id3,id4){
  $gameVariables.setValue(21, (id1-2));
  $gameVariables.setValue(22, (id2-2));
  $gameVariables.setValue(23, (id3-2));
  $gameVariables.setValue(24, (id4-2));
  $gameTemp.reserveCommonEvent(1);};



//Prompts the player to select which of their four party members they should train for the day.
var chooseTraining;
chooseTraining = function($this){
  $gameMessage.add("Who should I schedule today?");
  var currentChars = [];
  var i;
  for (i = 1; i < 5; i++;){
    currentChars.push($gameParty.members()[i].name());}
  showTraineeIcons($gameParty.members()[1].actorId(),$gameParty.members()[2].actorId(),$gameParty.members()[3].actorId(),$gameParty.members()[4].actorId());
  setTimeout(function(){
    $gameTemp.clearCommonEvent(1);
    $gameTemp.reserveCommonEvent(5);});
  $gameMap._interpreter.setupChoices([[  currentChars[0],currentChars[1],currentChars[2],currentChars[3]], 1]);
  $gameMessage.setChoiceCallback(function(responseIndex){
      if (responseIndex === 0){
      //They chose character A.
      //If a charTrainer variable is set to true, it means the character has been trained that day, and cannot be selected to exercise.
        if (char1trained === true){
          setTimeout(function(){
            $gameMessage.add("I've already trained them!");
            checkForDayEnd();});}
      else {
          stamina = 3;
          trainChar(1);
          char1trained = true; }}
      if (responseIndex === 1) {
        if (char2trained === true) {
          setTimeout(function() {
            $gameMessage.add("I've already trained them!");
            checkForDayEnd();});}
      else{
          stamina = 3;
          trainChar(2);
          char2trained = true;}}
      if (responseIndex === 2){
        if (char3trained === true){
          setTimeout(function(){
            $gameMessage.add("I've already trained them!");
            checkForDayEnd();});}
        else{
          stamina = 3;
          trainChar(3);
          char3trained = true;}}
      if (responseIndex === 3){
        if (char4trained === true){
          setTimeout(function(){
            $gameMessage.add("I've already trained them!");
            checkForDayEnd();});}
        else{
          stamina = 3;
          trainChar(4);
          char4trained = true;}}});}

//The actual function for sparring with a character.
//The player is prompted to choose between the three remaining party members.
//Then, the function raises relevant stats.
var sparChar;
sparChar = function(partyID){
   //We're checking to see what character we're currently scheduling.
   switch(partyID){
     case 1:
     $gameMap._interpreter.setupChoices([[$gameParty.members()[2].name(), $gameParty.members()[3].name(), $gameParty.members()[4].name()], 1]);
     break;
     case 2:
     $gameMap._interpreter.setupChoices([[$gameParty.members()[1].name(), $gameParty.members()[3].name(), $gameParty.members()[4].name()], 1]);
     break;
     case 3:
     $gameMap._interpreter.setupChoices([[$gameParty.members()[2].name(), $gameParty.members()[1].name(), $gameParty.members()[4].name()], 1]);
     break;
     case 4:
     $gameMap._interpreter.setupChoices([[$gameParty.members()[2].name(), $gameParty.members()[3].name(), $gameParty.members()[1].name()], 1]);
     break;
   }

    $gameMessage.setChoiceCallback(function(responseIndex){
            setTimeout(function(){
            //Increases the XP of the character we're scheduling for sparring, as well as their partner.
            //We can replace this flat number with an actual variable later on.

            $gameActors.actor($gameParty.members()[responseIndex].actorId()).gainExp(10);
            $gameActors.actor($gameParty.members()[partyID].actorId()).gainExp(10);
            $gameMessage.add($gameParty.members()[partyID].name() + " gained 10 EXP!");
            $gameMessage.add($gameParty.members()[responseIndex].name() + " gained 10 EXP!");

            switch($gameParty.members()[partyID].name()){
            case 'Streya':
            //Need to find syntax for adjusting the stat.
            break;
            case 'Marble':
            break;
            case 'Cassette':
            break;
            case 'Tsusie':
            break;
            case 'Jessie':
            break;
            case 'Kirk':
            break;
            case 'Hellmask':
            break;
            case 'Hestia':
            break;
            case 'Hazel':
            break;
            case 'Pallas':
            break;
            case 'Feliz':
            break;
            case 'Marimo':
            break;
            }


            //ATK - Streya, Marble
            //SP ATK - Cassette, Tsusie
            //AGL - Jessie, Kirk
            //DEF - Hellmask, Hestia
            //SP DEF - Hazel, Pallas
            //LUK - Feliz, Marimo

            //Check for any illnesses

            //Decrease stamina
            setTimeout(function(){
              checkForDayEnd();
            });
            });

            });
            };

//After a character has been selected to train, the player then chooses if they want to Train, Spar, or Rest.
//For Rest and Spar, corresponding functions are called.
//For Train, the player is asked which type of drill to execute, and then for which stat.
var trainChar;
trainChar = function(partyID){
  $gameVariables.setValue(25, $gameParty.members()[partyID].actorId());
  setTimeout(function(){
    $gameTemp.clearCommonEvent(1);
    $gameTemp.reserveCommonEvent(7);
    $gameMessage.add("What should " + $gameParty.members()[partyID].name() + " do today?");
    $gameMap._interpreter.setupChoices([["Train", "Spar", "Rest"], 1]);
    $gameMessage.setChoiceCallback(function(responseIndex){
      if (responseIndex === 0){
        setTimeout(function(){
          $gameTemp.clearCommonEvent(7);
          $gameTemp.reserveCommonEvent(8);
          $gameMessage.add("Should " + $gameParty.members()[partyID].name() + " do a Light Drill, or a Heavy Drill?");
          $gameMap._interpreter.setupChoices([["Light Drill", "Heavy Drill"], 1]);
          $gameMessage.setChoiceCallback(function(responseIndex){
            if (responseIndex === 0){
              setTimeout(function(){
                  $gameTemp.clearCommonEvent(8);
                  $gameTemp.reserveCommonEvent(9);
                  $gameMap._interpreter.setupChoices([["ATK", "Sp.ATK", "DEF", "Sp.DEF", "AGL", "LUC"], 1]);
                  $gameMessage.setChoiceCallback(function(responseIndex){
                    setTimeout(function(){
                      updateStat(partyID, responseIndex, 1);});});});}
            //If they chose to do a heavy drill.
            if (responseIndex === 1){
              setTimeout(function(){
                  $gameTemp.clearCommonEvent(8);
                  $gameTemp.reserveCommonEvent(9);
                  $gameMap._interpreter.setupChoices([["ATK", "Sp.ATK", "DEF", "Sp.DEF", "AGL", "LUC"], 1]);
                  $gameMessage.setChoiceCallback(function(responseIndex){
                    setTimeout(function(){
                      updateStat(partyID, responseIndex, 2);});});});}});});}
      //This is for Spar
      if (responseIndex === 1){
        setTimeout(function(){
        sparChar(partyID);});}
      //This is for Rest
      if (responseIndex === 2){
        setTimeout(function(){
        checkForDayEnd();});}});});}
