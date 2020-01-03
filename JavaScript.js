var config = {
    type: Phaser.AUTO,
    width: 700,
    height: 400,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 }, ///// NO GRAVITY FOR NOW
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

//keyboard keys
let keyA;
let keyS;
let keyD;
let keyW;
//Enemies
var blackenemy;
//Player
var player;
//Weapon
var cannonball;
//Mouse Input
var input;
var mouse;
//Text
var coinsText;
var killsText;
//Counters
var coins = 0;
var kills = 0;
//goldencoins
var coin;
//dangerous items
var bomb;
//player status
var playerStatus = "Alive";


function preload ()
{
    //LOADING ASSETS FOR TESTING, NEED TO BE REPLACED
    this.load.image('player','assets/player.png');//////////PLAYER
    this.load.image('bomb','assets/bomb.png');//////////DANGEROUS BOMB
    this.load.image('coin','assets/coin.png');/////////COINS
    this.load.image('cannonBall','assets/cannonBall.png');/////////BULLET
    this.load.image('blackenemy','assets/blackenemy.png'); /////////////ENEMIES
    this.load.image('background','assets/background.png'); /////////// BACKGROUND
}


function create ()
{
    //MOUSE INPUT
    input=this.input;
    mouse=this.input.mousePointer;

    //KEYBOARD INPUT KEYS (AWSD)
    keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

    //KEYBOARD INPUT KEYS (ARROWS)
    cursors = this.input.keyboard.createCursorKeys();

    //BACKGROUND
    this.add.image( 0 , 0 , 'background').setOrigin(0,0);
   
    //GOLDEN COINS
    coin = this.physics.add.image(300, 250, 'coin');

    //DANGEROUS BOMB
    bomb = this.physics.add.image(500, 250, 'bomb');
   
    //PLAYER
    player = this.physics.add.image(384,256,'player');
    
    //ENEMIES
    blackenemy = this.physics.add.staticGroup();
    blackenemy.create(100,150,'blackenemy');
    blackenemy.create(300,120,'blackenemy');
    blackenemy.create(400,350,'blackenemy');
    blackenemy.create(600,200,'blackenemy');

    //NUMBER OF KILLS
    killsText = this.add.text(20, 20, "Kills: 0", {fontSize: '16px', fill: '#fff'});
    //NUMBER OF COLLECTED COINS 
    coinsText = this.add.text(120, 20, "Coins: 0", {fontSize: '16px', fill: '#fff'}); 
    // STATUS OF PLAYER
    statusText = this.add.text(20, 360, "Status: Alive", {fontSize: '16px', fill: 'red'}); 
}

function update ()
{
    //ANGLE BETWEEN PLAYER AND MOUSE
    let angle = Phaser.Math.Angle.Between(player.x,player.y,input.x,input.y);

    //PLAYER ROTATION
    player.setRotation(angle+Math.PI/2);

    if(mouse.isDown)
    {
        //FIRE WEAPON FROM THE POSITION OF PLAYER
        cannonball=this.physics.add.sprite(player.x,player.y,'cannonBall');
        
        //MOVE WEAPON IN THE DIRECTION OF MOUSE
        this.physics.moveTo(cannonball,input.x,input.y,500);

        //FOR COLLISION BETWEEN WEAPON OF PLAYER AND ENEMIES 
        this.physics.add.overlap(cannonball,blackenemy,destroyEnemies,null,this);
    }
    
    //MOVE PLAYER WITH VELOCITY (-160) IN X DIRECTION IF (A) KEY || LEFT ARROW IS PRESSED 
    if (cursors.left.isDown || keyA.isDown)
    {
        player.setVelocityX(-160);
        player.setRotation(0);
    }

    //MOVE PLAYER WITH VELOCITY (160) IN X DIRECTION IF (D) KEY || RIGHT ARROW IS PRESSED 
    else if (cursors.right.isDown || keyD.isDown)
    {
        player.setVelocityX(160);
        player.setRotation(0);

    }

    //IDLE STATE WITH (0) VELOCITY
    else
    {
        player.setVelocityX(0);
    }

    //FOR COLLISION BETWEEN PLAYER AND THE GOLDEN COINS 
    this.physics.add.overlap(player,coin,collectgold,null,this);

    //FOR COLLISION BETWEEN PLAYER AND THE DANGEROUS BOMBS 
    this.physics.add.overlap(player,bomb,OnHitPlayer,null,this);
}

//COLLOID WEARPON OF PLAYER WITH ENEMIES
function destroyEnemies(cannonball,blackenemy) 
{
    blackenemy.disableBody(true,true);
    cannonball.disableBody(true,true);
    control=false;
    kills += 1;
    killsText.setText('kills: ' + kills);
}

//COLLOID PLAYER WITH THE GOLDEN COINS
function collectgold(cannon,coin)
{
    coin.disableBody(true, true);
    coins += 10;
    coinsText.setText('Coins: ' + coins);
}

//COLLOID PLAYER WITH THE DANGEROUS BOMB
function OnHitPlayer(player,bomb)
{
    player.disableBody(true, true);
    playerStatus = "Dead";
    statusText.setText('Status: '+ playerStatus);
}