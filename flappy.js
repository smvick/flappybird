// the Game object used by the phaser.io library
var stateActions = { preload: preload, create: create, update: update };

// Phaser parameters:
// - game width
// - game height
// - renderer (go for Phaser.AUTO)
// - element where the game will be drawn ('game')
// - actions on the game state (or null for nothing)
var game = new Phaser.Game(800, 400, Phaser.AUTO, 'game', stateActions);

/*
 * Loads all resources for the game and gives them names.
 */
function preload() {
    game.load.image("playerImg", "assets/flappy_superman.png");
    game.load.image("playerImg2", "assets/flappy_batman.png");
    game.load.audio("score","assets/point.ogg");

}
/*
 * Initialises the game. This function is only called once.
 */
var score=0;
var player;


function create() {

    game.stage.setBackgroundColor("#FF0066");

    game.add.text(200, 200, "Welcome to Steve & Eirini's game!!!! :)", {font: "25px TimesNewRoman", fill:"#ffff00"});

    //alert (score);
    var x = 20;
    var y = 100;
    var rightKey=game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    var leftKey=game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    var upKey=game.input.keyboard.addKey(Phaser.Keyboard.UP);
    var downKey=game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
    player=game.add.sprite(x, y,"playerImg");

    game.input.onDown.add(clickHandler);

    game.input.onDown.add(spaceHandler);

    game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(spaceHandler);

    leftKey.onDown.add(moveLeft);

    rightKey.onDown.add(moveRight);

    upKey.onDown.add(moveUp);

    downKey.onDown.add(moveDown);

}

function clickHandler (event) {

    //game.add.sprite(event.x,event.y,"playerImg");
    player.x = event.x;
    player.y = event.y;
    score=score+1;
    //alert(score);

}

function spaceHandler() {

    game.sound.play("score")

}

function moveRight(){
    player.x +=10;
}

function moveLeft(){
    player.x -=10;
}

function moveUp(){
    player.y -= 10;
}

function moveDown(){
    player.y += 10;
}


/*
 * This function updates the scene. It is called for every new frame.
 */
function update() {

}


