var registerScore;
var score;
var firstPlace=0;
var secondPlace=0;
var thirdPlace=0;

jQuery("#credits").on("click",function(){
  var message = "Game and website Created by Fabian!";
  jQuery("#credits").append(
    "<p>" + message + "</p>");
});

jQuery("#hiscore").on("click",function(){
  var randomScore = "100";
  jQuery(".gold").append(
    "<p>" + randomScore + "</p>");
});


function registerScore(){

    if(score > firstPlace){
      var playerNameG = prompt("What's your name?");
      firstPlace = score;
      jQuery(".gold").empty();
      jQuery(".gold").append(
      "<p>" + score + "-" + playerNameG + "</p>");

      //alert("First: " + firstPlace + " Second: " + secondPlace + " Third: " + thirdPlace);
    }

    else if(score > secondPlace){
      var playerNameS = prompt("What's your name?");
      secondPlace = score;
      jQuery(".silver").empty();
      jQuery(".silver").append(
      "<p>" + score + "-" + playerNameS + "</p>");

    }
    else if(score > thirdPlace){
      var playerNameB = prompt("What's your name?");
      thirdPlace = score;
      jQuery(".bronze").empty();
      jQuery(".bronze").append(
      "<p>" + score + "-" + playerNameB + "</p>");
    }
  }
