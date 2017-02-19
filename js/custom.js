/******************************************************************************\

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
    //drawNeuronLines();
    convertData();

    if($('.training').prop('checked')){
      var response = computeData();
      activateData(response);
      addPointToChart(response);
    } else if(currentKey == null){
      trainingset.push({input: [speed,distance,dino_y,obst_y,obst_width,obst_height], output:[0]});
      zeros++;
    } else {
      trainingset.push({input: [speed,distance,dino_y,obst_y,obst_width,obst_height], output:[1]});
      ones++;
    }

    updateProgressBar();
    updateButtons();

  }
}


function trainNetwork(amount, t_rate){
  if(trainingset.length > 0){
    trainer.train(trainingset, {
      rate: t_rate,
      error: 0.0005,
      iterations: amount,
      shuffle: true,
      cost: Trainer.cost.MSE,
      log: 1,
      schedule: {
        every: amount,
        do: function(data){
          log('Trained the network ' + amount + ' times, learning rate ' + t_rate);
          log('New error: ' + Math.round(data.error*10000)/10000);
        }
      }
    });
    trainingAmount += amount;
    $(".trainingamount").text(trainingAmount);
  }
}
function activateData(response){
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

function exportNetwork(){
  var content = network.toJSON();
  content = JSON.stringify(content);
  var name = 's' + trainingset.length + 't' + trainingAmount + '.txt';
  download(name, content);
}

function importNetwork(){
  var input = document.createElement('input');
  input.type = 'file';
  input.click();
  $(input).change(function(e){
    f = input.files[0];

    if (f) {
          var r = new FileReader();
          r.onload = function(e) {
    	      var content = e.target.result;
            var json = JSON.parse(content);
            network = Network.fromJSON(json);
            alert('Import success');
          }
          r.readAsText(f);
        } else {
          alert("Failed to load file");
        }
  });


}

// http://stackoverflow.com/questions/3665115/create-a-file-in-memory-for-user-to-download-not-through-server
function download(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

/*function drawNeuronLines(){
  game.canvasCtx.beginPath();
  game.canvasCtx.moveTo(dino_x, dino_y+47);
  game.canvasCtx.lineTo(obst_x, obst_y+obst_height);

  game.canvasCtx.strokeStyle = '#ff0000';
  game.canvasCtx.stroke();
  game.canvasCtx.moveTo(dino_x, dino_y);
  game.canvasCtx.lineTo(dino_x+speed*10, dino_y);
  game.canvasCtx.strokeStyle = '#ccc';
  game.canvasCtx.stroke();
}*/
