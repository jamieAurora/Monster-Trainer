// Multiple Character Selection
// by Jamie Geist
// Date: 3/18/19
/*:
* @plugindesc Character Selector
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
startFunc = function($this)
{
  var n = 0;

  while (n < 20)
  {
    $gameParty.removeActor(n);
    n++;
  }
  $gameParty.addActor(1);
};
var checkForDayEnd;
checkForDayEnd = function($this)
{
  if (char1trained === true && char2trained === true && char3trained === true && char4trained === true)
  {
    //End the day, go to the new day.
    goToNewDay();
  }
  else {
    chooseTraining();
  }
};

var adjustTrust;
adjustTrust = function(actorName, processID)
{
  if (processID === 1)
  {
    var tempMath;
    $gameMessage.add("...I feel like " + actorName + " trusts me a little less...");
    if (actorName === "Jesse")
    {
      tempMath = $gameVariables.value(101) - 3;
      $gameVariables.setValue(101, tempMath);
    }
    if (actorName === "Kirk")
    {
      //Maybe look into popping a setTimeout here? To delay the message from overlapping.
      tempMath = $gameVariables.value(102) - 3;
      $gameVariables.setValue(102, tempMath);
    }
    if (actorName === "Hestia")
    {
      tempMath = $gameVariables.value(103) - 3;
      $gameVariables.setValue(103, tempMath);
    }
    if (actorName === "Hellmask")
    {
      tempMath = $gameVariables.value(104) - 3;
      $gameVariables.setValue(104, tempMath);
    }
    if (actorName === "Hazel")
    {
      tempMath = $gameVariables.value(105) - 3;
      $gameVariables.setValue(105, tempMath);
    }
    if (actorName === "Tsusie")
    {
      tempMath = $gameVariables.value(106) - 3;
      $gameVariables.setValue(106, tempMath);
    }
    if (actorName === "Cassette")
    {
      tempMath = $gameVariables.value(107) - 3;
      $gameVariables.setValue(107, tempMath);
    }
    if (actorName === "Marimo")
    {
      tempMath = $gameVariables.value(108) - 3;
      $gameVariables.setValue(108, tempMath);
    }
    if (actorName === "Feliz")
    {
      tempMath = $gameVariables.value(109) - 3;
      $gameVariables.setValue(109, tempMath);
    }
    if (actorName === "Marble")
    {
      tempMath = $gameVariables.value(110) - 3;
      $gameVariables.setValue(110, tempMath);
    }
  }
  //ID of 1 - downgrade trust
    //Display a thing saying that they trust you a bit less.
  //ID of 2 - upgrade trust
    //Display a thing saying that they trust you a bit more.
};

var goToNewDay;
goToNewDay = function($this)
{
  //$gameMessage.add("DAY" + $gameVariables.value(2));
  char1trained = false;
  char2trained = false;
  char3trained = false;
  char4trained = false;
  stamina = 3;
  dayOfWeek++;
  if (dayOfWeek === 1)
  {
    $gameMessage.add("SUNDAY");
  }
  if (dayOfWeek === 2)
  {
    $gameMessage.add("MONDAY");
  }
  if (dayOfWeek === 3)
  {
    $gameMessage.add("TUESDAY");
  }
  if (dayOfWeek === 4)
  {
    $gameMessage.add("WEDNESDAY");
  }
  if (dayOfWeek === 5)
  {
    $gameMessage.add("THURSDAY");
  }
  if (dayOfWeek === 6)
  {
    $gameMessage.add("FRIDAY");
  }
  if (dayOfWeek === 7)
  {
    $gameMessage.add("SATURDAY");
  }
}



var updateStat;
updateStat = function(partyID, statID, drillID)
{
  if (statID === 0)
  {
    //Stat increase for now is set for 5 for LDs, 10 for HDs. This may be altered later.
    statIncrease = 5 * drillID;
    $gameParty.members()[partyID].addParam(2, statIncrease);
    $gameMessage.add( $gameParty.members()[partyID].name() + "'s ATK has risen by " + statIncrease + "!");
    stamina = stamina - drillID;
    //Increment ATK
  }
  if (statID === 1)
  {
    //Increment SPATK
    statIncrease = 5 * drillID;
    $gameParty.members()[partyID].addParam(3, statIncrease);
    $gameMessage.add( $gameParty.members()[partyID].name() + "'s Sp.ATK has risen by " + statIncrease + "!");
    stamina = stamina - drillID;
  }
  if (statID === 2)
  {
    //Increment DEF
    statIncrease = 5 * drillID;
    $gameParty.members()[partyID].addParam(4, statIncrease);
    $gameMessage.add( $gameParty.members()[partyID].name() + "'s DEF has risen by " + statIncrease + "!");
    stamina = stamina - drillID;
  }
  if (statID === 3)
  {
    //Increment SPDEF
    statIncrease = 5 * drillID;
    $gameParty.members()[partyID].addParam(5, statIncrease);
    $gameMessage.add( $gameParty.members()[partyID].name() + "'s Sp.DEF has risen by " + statIncrease + "!");
    stamina = stamina - drillID;
  }
  if (statID === 4)
  {
    //Increment AGL
    statIncrease = 5 * drillID;
    $gameParty.members()[partyID].addParam(6, statIncrease);
    $gameMessage.add( $gameParty.members()[partyID].name() + "'s AGL has risen by " + statIncrease + "!");
    stamina = stamina - drillID;
  }
  if (statID === 5)
  {
    //Increment LUC
    statIncrease = 5 * drillID;
    $gameParty.members()[partyID].addParam(7, statIncrease);
    $gameMessage.add( $gameParty.members()[partyID].name() + "'s LUC has risen by " + statIncrease + "!");
    stamina = stamina - drillID;
  }
  console.log("Stamina is at" + stamina);
  if (stamina === 2)
  {
    extraRep2(statID,partyID);
  }
  if (stamina === 1)
  {
    extraRep1(statID,partyID);
  }
}

var extraRep1;
extraRep1 = function(statID, partyID)
{
  $gameTemp.clearCommonEvent(9);
  $gameTemp.clearCommonEvent(7);
  $gameTemp.reserveCommonEvent(8);
  $gameMessage.add("Should I have them do an extra rep?");
  $gameMap._interpreter.setupChoices([["Light Drill", "No"], 1]);
  $gameMessage.setChoiceCallback(function(responseIndex)
  {
    if (responseIndex === 0)
    {
      setTimeout(function()
        {
          updateStat(partyID, statID, 1);
          console.log($gameParty.members()[partyID].name());
          adjustTrust($gameParty.members()[partyID].name(), 1);
          //console.log($gameParty.members()[partyID]);
          //$gameParty.members()[partyID]._nickname();
          //Check to see if we're going to the next person.
          checkForDayEnd();

        });
    }
    if (responseIndex === 1)
    {
      setTimeout(function()
      {
        checkForDayEnd();
      });
    }
  });
}


var extraRep2;
extraRep2 = function(statID,partyID)
{
  $gameTemp.clearCommonEvent(9);
  $gameTemp.reserveCommonEvent(7);
  $gameMessage.add("Should I have them do an extra rep?");
  $gameMap._interpreter.setupChoices([["Light Drill", "Heavy Drill", "No"], 1]);
  $gameMessage.setChoiceCallback(function(responseIndex)
  {
    if (responseIndex === 0)
    {
      setTimeout(function()
        {
          updateStat(partyID, statID, 1);
        });
    }
    if (responseIndex === 1)
    {
      setTimeout(function()
        {
          updateStat(partyID, statID, 2);
          adjustTrust($gameParty.members()[partyID].name(), 1);
          checkForDayEnd();
        });
    }
    if (responseIndex === 2)
    {
      setTimeout(function()
      {
        checkForDayEnd();
      });
    }
  });
}

var showTraineeIcons;
showTraineeIcons = function(id1,id2,id3,id4)
{
  console.log("ID1 : " + id1);
  console.log("ID2 : " + id2);
  console.log("ID3 : " + id3);
  console.log("ID4 : " + id4);
  //$gameVariables.setValue(101, tempMath);
  $gameVariables.setValue(21, (id1-2));
  $gameVariables.setValue(22, (id2-2));
  $gameVariables.setValue(23, (id3-2));
  $gameVariables.setValue(24, (id4-2));
  $gameTemp.reserveCommonEvent(1);
};

var chooseTraining;
chooseTraining = function($this)
{

  //choicelist_offset x 30
  $gameMessage.add("Who should I schedule today?");

  var currentChars = [];
  currentChars.push($gameParty.members()[1].name());
  currentChars.push($gameParty.members()[2].name());
  currentChars.push($gameParty.members()[3].name());
  currentChars.push($gameParty.members()[4].name());
  showTraineeIcons($gameParty.members()[1].actorId(),$gameParty.members()[2].actorId(),$gameParty.members()[3].actorId(),$gameParty.members()[4].actorId());
  //$gameTemp.clearCommonEvent(1);
//  $gameTemp.reserveCommonEvent(5);
setTimeout(function()
{
  $gameTemp.clearCommonEvent(1);
  $gameTemp.reserveCommonEvent(5);
});




  $gameMap._interpreter.setupChoices([[  currentChars[0],currentChars[1],currentChars[2],currentChars[3]], 1]);
  $gameMessage.setChoiceCallback(function(responseIndex)
    {
      if (responseIndex === 0)
      //They chose character A.
      {
        if (char1trained === true)
        {
          setTimeout(function()
          {
            $gameMessage.add("I've already trained them!");
            checkForDayEnd();
            //chooseTraining();
          });
        }
        else
        {
          stamina = 3;
          trainChar(1);
          char1trained = true;
        }
      }
      if (responseIndex === 1)
      {
        if (char2trained === true)
        {
          setTimeout(function()
          {
            $gameMessage.add("I've already trained them!");
            checkForDayEnd();
            //chooseTraining();
          });
        }
        else
        {
          stamina = 3;
          trainChar(2);
          char2trained = true;
        }
      }
      if (responseIndex === 2)
      {
        if (char3trained === true)
        {
          setTimeout(function()
          {
            $gameMessage.add("I've already trained them!");
            checkForDayEnd();
            //chooseTraining();
          });
        }
        else
        {
          stamina = 3;
          trainChar(3);
          char3trained = true;
        }
      }
      if (responseIndex === 3)
      {
        if (char4trained === true)
        {
          setTimeout(function()
          {
            $gameMessage.add("I've already trained them!");
            checkForDayEnd();
          });
        }
        else
        {
          stamina = 3;
          trainChar(4);
          char4trained = true;
        }
      }
    });
}

var sparChar;
sparChar = function(partyID)
{
  console.log("Got here. Character ID is" + partyID);
  //console.log($gameParty.members()[0].actorId() + " " + $gameParty.members()[0].name());
  console.log($gameParty.members()[1].actorId() + " " + $gameParty.members()[1].name());
  console.log($gameParty.members()[2].actorId() + " " + $gameParty.members()[2].name());
  console.log($gameParty.members()[3].actorId() + " " + $gameParty.members()[3].name());
  console.log($gameParty.members()[4].actorId() + " " + $gameParty.members()[4].name());

  //We're checking to see what character we're currently scheduling.
    if (partyID == 1)
    {
      console.log("Got to this.");
      $gameMap._interpreter.setupChoices([[$gameParty.members()[2].name(), $gameParty.members()[3].name(), $gameParty.members()[4].name()], 1]);
      $gameMessage.setChoiceCallback(function(responseIndex)
      {
        if (responseIndex === 0)
        {
          setTimeout(function()
          {
            //Increases the XP of our selected character.
            $gameActors.actor($gameParty.members()[1].actorId()).gainExp(10);
            //We can replace this flat number with an actual variable later on.
            $gameMessage.add($gameParty.members()[partyID].name() + " gained 10 EXP!");

            //Grab a variable here. Each character should have their own variable with their "base" stat.
            //check variable[130 + actorID], if it == (0 thru 5), raise corresponding stat.
            //run this for the character selected and for their training partner

            //We're done with sparring. This will go back to the main schedule menu.

            setTimeout(function()
            {
              checkForDayEnd();
            });

          });
        }
      });
    }

};

var trainChar;
trainChar = function(partyID)
{
  $gameVariables.setValue(25, $gameParty.members()[partyID].actorId());
  console.log("whoop whoop!");
  console.log($gameParty.members()[partyID].actorId());
  setTimeout(function()
  {
    $gameTemp.clearCommonEvent(1);
    $gameTemp.reserveCommonEvent(7);

    $gameMessage.add("What should " + $gameParty.members()[partyID].name() + " do today?");
    $gameMap._interpreter.setupChoices([["Train", "Spar", "Rest"], 1]);
    $gameMessage.setChoiceCallback(function(responseIndex)
    {
      if (responseIndex === 0)
      {
        setTimeout(function()
        {
          $gameTemp.clearCommonEvent(7);
          $gameTemp.reserveCommonEvent(8);
          $gameMessage.add("Should " + $gameParty.members()[partyID].name() + " do a Light Drill, or a Heavy Drill?");
          $gameMap._interpreter.setupChoices([["Light Drill", "Heavy Drill"], 1]);
          $gameMessage.setChoiceCallback(function(responseIndex)
          {
            if (responseIndex === 0)
            {
              setTimeout(function()
                {
                  $gameTemp.clearCommonEvent(8);
                  $gameTemp.reserveCommonEvent(9);
                  //$gameMessage.add("What should " + $gameParty.members()[partyID].name() + " focus on today?");
                  $gameMap._interpreter.setupChoices([["ATK", "Sp.ATK", "DEF", "Sp.DEF", "AGL", "LUC"], 1]);
                  $gameMessage.setChoiceCallback(function(responseIndex)
                  {
                    setTimeout(function()
                    {
                      updateStat(partyID, responseIndex, 1);
                    });
                });
                });
            }
            //If they chose to do a heavy drill.
            if (responseIndex === 1)
            {
              setTimeout(function()
                {
                  $gameTemp.clearCommonEvent(8);
                  $gameTemp.reserveCommonEvent(9);
                  //$gameMessage.add("What should " + $gameParty.members()[partyID].name() + " focus on today?");
                  $gameMap._interpreter.setupChoices([["ATK", "Sp.ATK", "DEF", "Sp.DEF", "AGL", "LUC"], 1]);
                  $gameMessage.setChoiceCallback(function(responseIndex)
                  {
                    setTimeout(function()
                    {
                      updateStat(partyID, responseIndex, 2);
                    });
                });
                });
            }
          });
        });

      }
      //This is for Spar
      if (responseIndex === 1)
      {
        setTimeout(function()
      {
        sparChar(partyID);
      });
      }
      //This is for Rest
      if (responseIndex === 2)
      {
        setTimeout(function()
      {
        checkForDayEnd();
      });
      }

    });

  });
}
