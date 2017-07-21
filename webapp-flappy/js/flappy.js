// the Game object used by the phaser.io library
var stateActions = { preload: preload, create: create, update: update };


// Phaser parameters:
// - game width
// - game height
// - renderer (go for Phaser.AUTO)
// - element where the game will be drawn ('game')
// - actions on the game state (or null for nothing)
var game = new Phaser.Game(790, 500, Phaser.AUTO, 'game', stateActions);
var pipes = [];
var score=-2;
var labelScore;
var player;
var gameinterval = 1.75 * Phaser.Timer.SECOND;
var registerScore;
var millisecondsToWait = 2000;
var gameGravity = 450;
var jumpPower = 225;
var gapSize = 120;
var blockHeight = 50;
var gapMargin = 50;
var height = 500;
var width = 790;
var pipeEndHeight = 10;
var pipeEndExtraWidth = 5;
//bonuses
var balloons= [];
var weights= [];
var wrench=[];




/*
 * Loads all resources for the game and gives them names.
 */
function preload() {
  score=-2;
  gapSize = 120;
  game.load.image("birdy", "../assets/birdysprite.png");
  game.load.audio("score", "../assets/point.ogg");
  game.load.image("pipeEnd","../assets/pipe2-end.png");
  game.load.image("pipeBlock","../assets/pipe2-body.png");
  game.load.image("backdrop", "../assets/FlappyBackground.png");
  game.load.audio("nice", "../assets/noice..ogg");
  game.load.image("balloons", "../assets/balloon (1).png" );
  game.load.image("weights", "../assets/weight.png" );
  game.load.image("wrench", "../assets/wrench.png" );
}

/*
 * Initialises the game. This function is only called once.
 */
function create() {
  var gapSize = 125;
  game.physics.startSystem(Phaser.Physics.ARCADE);
  game.add.image(0, 0, "backdrop");
    // set the background colour of the scene
  game.add.text(0, 0, "Welcome to Annoyed Bird",{font:"35px Arial", fill: "#971dad"});
    //Text

    //Sound is played here

   labelScore = game.add.text(20, 60, "0",
   {font: "30px Arial", fill: "#FFFFFF"});
   //The score

   player= game.add.sprite(200,200,"birdy");
   player.anchor.setTo(0.5, 0.5);

   //game.input.keyboard.addKey(Phaser.Keyboard.RIGHT)
                      //.onDown.add(moveRight);

  // game.input.keyboard.addKey(Phaser.Keyboard.LEFT)
                      //.onDown.add(moveLeft);

   //game.input.keyboard.addKey(Phaser.Keyboard.DOWN)
                      //.onDown.add(moveDown);

   //game.input.keyboard.addKey(Phaser.Keyboard.UP)
                      //.onDown.add(moveUp);
   game.physics.arcade.enable(player);
   player.body.gravity.y = gameGravity;
   game.input.keyboard
       .addKey(Phaser.Keyboard.SPACEBAR)
       .onDown
       .add(function() {
         player.body.velocity.y = -jumpPower;
       });
    //Making the birdy jump

    var pipeInterval = 1.75 * Phaser.Timer.SECOND;
    game.time.events.loop(
      pipeInterval,
      generate
    );
//generatePipe();

}

/*
 * This function updates the scene. It is called for every new frame.
 */
function update() {
  game.physics.arcade.overlap(
    player,
    pipes,
    gameOver);
  if (player.body.y < 0){
    gameOver();
  }
  if (player.body.y > 475){
    gameOver();
  }
  player.rotation = Math.atan(player.body.velocity.y/200);
for(var i = balloons.length - 1; i>= 0; i--){
  game.physics.arcade.overlap(player,balloons[i], function(){
    changeGravity(-200);
    balloons[i].destroy();
    balloons.splice(i,1);
  });
  }

for(var i = weights.length - 1; i>= 0; i--){
  game.physics.arcade.overlap(player,weights[i], function(){
    changeGravity(200);
    weights[i].destroy();
    weights.splice(i,1);
    });
  }
  for(var i = wrench.length - 1; i>= 0; i--){
    game.physics.arcade.overlap(player,wrench[i], function(){
      changeGapSize();
      wrench[i].destroy();
      wrench.splice(i,1);
      });

}
}

function clickHandler(event) {
  //alert("Click To Start");
  //alert("3")
  //alert("2")
  //alert("1")
  //alert("GO")
  //alert("The position is: " + event.x + "," + event.y);
  //game.add.sprite(event.x, event.y, "birdy");
}

function spaceHandler() {
  game.sound.play("score");
}

function changeScore(){

  score++;
  labelScore.setText(score.toString());
}


function generate(){
  var diceRoll = game.rnd.integerInRange(1,10);
  if(diceRoll==1){
      generateBalloons();
  } else if(diceRoll==2){
      generateWeights();
    }
    else if(diceRoll==3){
      generateWrench();
    }
    else {
      generatePipe();
  }
}

function moveRight(){
  player.x+=100;
}
function moveLeft(){
  player.x-=100;
}
function moveUp(){
  player.y-=100;
}
function moveDown(){
  player.y+=100;
}


function generatePipe() {
  //this is the gap in the pipe
  var gapStart = game.rnd.integerInRange(gapMargin, height - gapSize - gapMargin) ;

  addPipeEnd(width - (pipeEndExtraWidth/2), gapStart);
  for(var y = gapStart; y > 0; y -= blockHeight){
     // y is the coordinate of the bottom of the block, subtract blockHeight
     // to get the top
    addPipeBlock(width, y + - blockHeight);
  }
  addPipeEnd(width - (pipeEndExtraWidth / 2), gapStart + gapSize);
  for(var y = gapStart + gapSize; y < height; y += blockHeight){
    // y is already taken so I changed to x
    addPipeBlock(width, (y+12));
  }
  changeScore();
}


function addPipeEnd(x,y){
  var pipeEnd = game.add.sprite(x,y, "pipeEnd");
  pipes.push(pipeEnd);
  game.physics.arcade.enable(pipeEnd);
  pipeEnd.body.velocity.x=-150;

}
function addPipeBlock(x,y){
//Create a new pipe block
  var pipeBlock = game.add.sprite(x,y, "pipeBlock");
  //insert it into the 'pipes' array
  pipes.push(pipeBlock);
  game.physics.arcade.enable(pipeBlock);
  pipeBlock.body.velocity.x=-150;
}
function generateBalloons(){
  var bonus = game.add.sprite(width, height, "balloons");
  balloons.push(bonus);
  game.physics.arcade.enable(bonus);
  bonus.body.velocity.x = - 200;
  bonus.body.velocity.y = -game.rnd.integerInRange(60,110);
}
function generateWeights(){
  var bonus = game.add.sprite(width, 0, "weights");
  weights.push(bonus);
  game.physics.arcade.enable(bonus);
  bonus.body.velocity.x = - 200;
  bonus.body.velocity.y = game.rnd.integerInRange(60,110);
}
function generateWrench(){
  var bonus = game.add.sprite(width, 0, "wrench");
  wrench.push(bonus);
  game.physics.arcade.enable(bonus);
  bonus.body.velocity.x = - 200;
  bonus.body.velocity.y = game.rnd.integerInRange(60,110);
}

function playerJump() {
  player.body.velocity.y = -jumpPower;
}
function changeGravity(g){
  gameGravity += g;
  player.body.gravity.y = gameGravity;
}
function changeGapSize(gs){
  gapSize=gapSize-30;

}

function gameOver(){
  gameGravity=450;
  game.paused = true;
  game.add.text(130, 200, "Unlucky Try Again",{font:"60px Arial", fill: "#971dad"});
  registerScore(score);
  game.stage.setBackgroundColor("#FFFFFF");
  game.sound.play("nice");

  setTimeout(function() {
    game.paused = false;

    game.state.restart();
}, millisecondsToWait);

      }
