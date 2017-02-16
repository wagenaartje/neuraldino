/******************************************************************************\
It should work as follows: the neural network will output either 1 or 0, when
it has outputted 1 and stops outputting anything, it should get a keydown, like
wise it should keydown a 1 when transisting to a 0

Inputs:
- Speed, distance, dino_y, object_y, object_width, object_height

KEYCODE CAN ONLY BE 1 OR null AT THE MOMENT
\******************************************************************************/

var network;
var trainer;
var trainingset = [];
var isTraining = true;
var trainingAmount = 0;

var game;

var speed;
var distance;
var dino_x;
var dino_y;
var isObject;
var obst_x;
var obst_y;
var obst_width;
var obst_height;

var zeros = 0;
var ones = 0;

var currentKey = null;

// Creates the dinosaur for us to use
$( document ).ready(function() {
  log('Initialising...');
  game = new Runner('.interstitial-wrapper');
  network = new Architect.Perceptron(6, 10, 1);
  trainer = new Trainer(network);

  $('.panel-body').slideUp();

  generateChart();
  initialiseClicks();
  log('Initialising complete!');
});

// Get's called by the dinosaur update function l:2464
function customLoop(){
  getGameData();
  if(isObject){
    convertData();

    if(!isTraining){
      var response = computeData();
      activateData(response);
      log('Response ' + response);
      chart.series[0].addPoint(response);
    } else {
      if(currentKey == null){
        trainingset.push({input: [speed,distance,dino_y,obst_y,obst_width,obst_height], output:[0]});
        zeros++;
      } else {
        log(currentKey);
        trainingset.push({input: [speed,distance,dino_y,obst_y,obst_width,obst_height], output:[1]});
        ones++;
      }
      updateProgressBar();
      $(".setsize").text(trainingset.length);
    }
  }
}

function updateProgressBar(){
  var total = zeros + ones;
  $('.zeros').css('width', zeros/total * 100 + '%');
  $('.ones').css('width', ones/total * 100 + '%');
}

function evenTrainingSet(){
  if(zeros > ones){
    var extra = zeros - ones;
    var type = 0;
  } else {
    var extra = ones - zeros;
    var type = 1;
  }

  while(extra > 0){
    var random = Math.round(Math.random()*(trainingset.length-1));
    if(trainingset[random].output[0] == type){
      trainingset.splice(random, 1)
      extra--;
      console.log(extra);
      if(type == 1){
        ones--;
      } else {
        zeros--;
      }

      updateProgressBar();
    }
  }
}

function log(text){
  $('.log').append(" > ", text, "<br>");
  $('.log').animate({ scrollTop: $('.log').prop("scrollHeight")}, 10);
}

function trainNetwork(amount, t_rate){
  //evenTrainingSet();
  trainer.train(trainingset, {
    rate: t_rate,
    error: 0.0005,
    iterations: amount,
    shuffle: true,
    cost: Trainer.cost.MSE,
    log: 1,
    schedule: {
      every: 10, // repeat this task every 500 iterations
      do: function(data) {
          // custom log
          log("error " + Math.round(data.error *10000)/10000 + " iteration no. " + data.iterations);
      }
    }
  });

  trainingAmount += amount;
  $(".trainingamount").text(trainingAmount);
}
function activateData(response){
  // Response > 0.6, jump!
  // Response < 0.4, duk!
  // 0.6 > response > 0.4, nothing!

  if(response > 0.01){
    if (currentKey == null){
      keyDown(1);
    }
    currentKey = 1;
  } else {
    if(currentKey != null){
      keyUp(currentKey);
    }
    currentKey = null;
  }
}

function computeData(){
  //console.log([speed,distance,dino_y,obst_y,obst_width,obst_height]);
  return network.activate([speed,distance,dino_y,obst_y,obst_width,obst_height]);
}

function convertData(){
  speed = speed / 20;
  dino_y = dino_y / 200;
  distance = distance / 600;
  obst_y = obst_y / 200;
  obst_width = obst_width / 200;
  obst_height = obst_height / 200;
}

function getGameData(){
  isObject = false;

  // First get all the data ready
  speed = game.currentSpeed;
  dino_x = game.tRex.xPos;
  dino_y = game.tRex.yPos;

  for(var i = 0; i < game.horizon.obstacles.length && i < 1;i++){
    isObject = true;
    distance = game.horizon.obstacles[i].xPos - game.tRex.xPos;
    obst_x = game.horizon.obstacles[i].xPos;
    obst_y = game.horizon.obstacles[i].yPos;
    obst_width = game.horizon.obstacles[i].typeConfig.width * game.horizon.obstacles[i].size;
    obst_height = game.horizon.obstacles[i].typeConfig.height;
  }
}

function keyDown(action){
  // Keydown on jump (1)
  if(action == 1){
    if (!game.tRex.jumping && !game.tRex.ducking) {
        game.playSound(game.soundFx.BUTTON_PRESS);
        game.tRex.startJump(game.currentSpeed);
    }
  }

  // Keydown on duck (0)
  if(action == 0){
    if (game.tRex.jumping) {
        // Speed drop, activated only when jump key is not pressed.
        game.tRex.setSpeedDrop();
    } else if (!game.tRex.jumping && !game.tRex.ducking) {
        // Duck.
        game.tRex.setDuck(true);
    }
  }
}

function keyUp(action){
  if (action == 1) {
      game.tRex.endJump();
  } else if (action  == 0) {
      game.tRex.speedDrop = false;
      game.tRex.setDuck(false);
  }

}
