// the Game object used by the phaser.io library
var stateActions = { preload: preload, create: create, update: update };

// Phaser parameters:
// - game width
// - game height
// - renderer (go for Phaser.AUTO)
// - element where the game will be drawn ('game')
// - actions on the game state (or null for nothing)
var game = new Phaser.Game(800, 800, Phaser.AUTO, 'game', stateActions);

/*
 * Loads all resources for the game and gives them names.
 */
function preload() {
    game.load.image("playerImg", "assets/flappy_superman.png");
    game.load.image("playerImg2", "assets/flappy_batman.png");
    game.load.audio("score","assets/point.ogg");
    game.load.image("Pipe","assets/pipe.png");

}
/*
 * Initialises the game. This function is only called once.
 */

var score=0;
var player;
var pipes;

function create() {

    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.stage.setBackgroundColor("#FF0066");
    pipes=game.add.group();
    game.time.events.loop(1*Phaser.Timer.SECOND,generate_pipes);
    game.add.text(200, 200, "Welcome to Steve & Eirini's game!!!! :)", {font: "25px TimesNewRoman", fill:"#ffff00"});
    var x = 20;
    var y = 500;
    player=game.add.sprite(x, y,"playerImg");
    game.physics.arcade.enable(player);
    player.anchor.setTo(0.5,0.5);
    player.checkWorldBounds=true;
    player.body.velocity.y=-100;
    player.body.velocity.x=0;
    player.body.gravity.y=250;
    game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(spaceHandler);
    game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(player_jump);
}

function add_pipe_part(x,y,pipe_part){
    var pipe=pipes.create(x,y,pipe_part);
    game.physics.arcade.enable(pipe);
    pipe.body.velocity.x=-200;
}

function generate_pipes() {
    var gapStart = Math.floor(Math.random() * 5) + 1;
    var gapSize = Math.floor(Math.random() * 3) + 2;
    var pipe_offset = 850;

    for (var count2 = 0; count2 < gapStart; count2 += 1) {
        add_pipe_part(pipe_offset, count2 * 50, "Pipe")
    }

    for (var count = gapStart + gapSize; count <= 15; count += 1) {
        add_pipe_part(pipe_offset, count * 50, "Pipe")
    }
}

function player_jump(){
    player.body.velocity.y=-200;
}

function clickHandler (event) {

    player.x = event.x;
    player.y = event.y;
    score=score+1;

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
function game_over(){
    //alert("YOU SUCK! :P :P :P :P :P");
    location.reload();
}

/*
 * This function updates the scene. It is called for every new frame.
 */
function update() {
game.physics.arcade.overlap(player,pipes,game_over);
}


