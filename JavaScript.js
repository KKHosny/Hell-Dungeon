var screenWidth = 240;
var screenHeight = 240;

var ScreenPlatformLeft;
var ScreenPlatformRight;

var player;
var flagAnimation = false;


var gamePlatform;
var leftPlatform;
var rightPlatform;

var platformArray = new Array(3);


let keyA;
let keyS;
let keyD;
let keyW;

var blackenemy;
var player;
var cannonball;

var input;
var mouse;

var coinsText;
var killsText;

var coins = 0;
var kills = 0;

var coin;
var bomb;

var playerStatus = "Alive";
var control = false;
var flag2 = false;

var config = {
    type: Phaser.AUTO,
    width: screenWidth,
    height: screenHeight,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 00 },
            debug: false
        }
    },
    renderer: Phaser.AUTO,
    antialias: true,
    multiTexture: true,
    pixelArt: true,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

function preload ()
{
    this.load.image('bomb','assets/bomb.png');
    this.load.image('coin','assets/coin.png');
    this.load.image('cannonBall','assets/cannonBall.png');
    this.load.image('blackenemy','assets/blackenemy.png'); 
    this.load.image('background','assets/background.jpeg'); 
    this.load.image('screenplatright', 'assests/platform/siderightPlatform.png');
    this.load.image('screenplatleft', 'assests/platform/sideLeftPlatform.png');
    this.load.image('leftPlat', 'assests/platform/LeftPlatform.png');
    this.load.image('rightPlat', 'assests/platform/RightPlatform.png');
    this.load.image('platform', 'assests/platform/Platform.png');

    this.load.spritesheet('player',
        'assests/player/move/spritesheet.png',
        { frameWidth: 16, frameHeight: 12 }
    );

    this.load.spritesheet('dead',
        'assests/player/dead/spritesheet-1.png',
        { frameWidth: 16, frameHeight: 16 }
    );
}

function playerDead(self) 
{
    player = self.physics.add.sprite(50, 50, 'dead');
    player.body.setOffset(1, 2);
    player.body.width = 13;
    player.body.height = 14;
}

function playerIdle(self) 
{
    player = self.physics.add.sprite(200, 200, 'player');
    player.body.setOffset(3, 1);
    player.body.width = 11;
    player.body.height = 12;
}

function loadingscene(self) 
{
    ScreenPlatformLeft = self.physics.add.staticGroup();
    ScreenPlatformRight = self.physics.add.staticGroup();

    //enemey & collider
    ScreenPlatformRight.create(screenWidth-18, 0, 'screenplatleft').setOrigin(0, 0).setScale(1, 1).refreshBody();
    ScreenPlatformLeft.create(0, 0, 'screenplatright').setOrigin(0, 0).setScale(1, 1).refreshBody();

    player.body.setGravityY(0);
    player.setBounce(0.02);
    player.setCollideWorldBounds(true);

    //MestryBox & collider
    self.physics.add.collider(player, ScreenPlatformLeft);
    self.physics.add.collider(player, ScreenPlatformRight);
}

function settingGamePlatform(self) 
{
    platformArray = [leftPlatform, rightPlatform, gamePlatform];

    for (let i = 0; i < 3; i++)
        {

        if (i == 0){
        platformArray[i] = self.physics.add.staticGroup();
        platformArray[i].create(screenWidth / 2, screenHeight / 2, 'rightPlat').setOrigin(0, 0).refreshBody();
        }
        if (i == 1)
        {platformArray[i] = self.physics.add.staticGroup();
        platformArray[i].create(screenWidth / 2, screenHeight / 2, 'leftPlat').setOrigin(0, 0).refreshBody();
        }
        if (i == 2)
        {platformArray[i] = self.physics.add.staticGroup();
        platformArray[i].create(screenWidth / 2, screenHeight / 2, 'platform').setOrigin(0, 0).refreshBody();
        }
        }
}

function playerAnimations(self, flag) {
    switch (flag) {
        case true:

            self.anims.create({
                key: 'dead1',
                frames: self.anims.generateFrameNumbers('dead', { start: 0, end: 3 }),
                frameRate: 8,
                repeat: -1
            });
            player.anims.play('dead1', true);
            break;

        case false:
            self.anims.create({
                key: 'alive',
                frames: self.anims.generateFrameNumbers('player', { start: 0, end: 2 }),
                frameRate: 8,
                repeat: -1
            });
            player.anims.play('alive', true);
            break;
        default: console.log("Error in Animation");
            break;
    }

    player.anims.play('dead1', true);
}

function destroyEnemies(cannonball,blackenemy) 
{
    blackenemy.disableBody(true,true);
    cannonball.disableBody(true,true);
    kills += 1;
    killsText.setText('kills: ' + kills);
    control=false;
}

function collectgold(cannon,coin)
{
    coin.disableBody(true, true);
    coins += 10;
    coinsText.setText('Coins: ' + coins);
}

function OnHitPlayer(player,bomb)
{
    player.disableBody(true, true);
    playerStatus = "Dead";
    statusText.setText('Status: '+ playerStatus);
    flag2 = true;
}

function OnMouseClick(self)
{
    let angle = Phaser.Math.Angle.Between(player.x,player.y,input.x,input.y);
    //player.setRotation(angle+Math.PI/2);

    if(mouse.isDown && flag2==false)
    {
        if(control==false)
        {
            var difference= self.input.y - player.y;
            if(difference>0 )
            {
               console.log("hjh"); 
            cannonball=self.physics.add.sprite(player.x,player.y,'cannonBall');
            self.physics.moveTo(cannonball,input.x,input.y,1024);
            self.physics.add.overlap(cannonball,blackenemy,destroyEnemies,null,self);
            }
        }
        
        control=true;
    }

    else
    {
        control = false;
    }
}

function OnKeyboardPress(self)
{
     if (cursors.left.isDown || keyA.isDown)
     {
         player.setVelocityX(-160);
     }
 
     else if (cursors.right.isDown || keyD.isDown)
     {
         player.setVelocityX(160);
     }
 
     else
     {
         player.setVelocityX(0);
     }
}

function CheckCollision(self) 
{
    self.physics.add.overlap(player,coin,collectgold,null,self);
    self.physics.add.overlap(player,bomb,OnHitPlayer,null,self);
}

function GetMouseInput(self) 
{
    input = self.input;
    mouse = self.input.mousePointer;
}

function GetKeyboardInput(self) 
{
    keyA = self.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    keyD = self.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    cursors = self.input.keyboard.createCursorKeys();
}

function LoadingText(self) 
{
    killsText = self.add.text(20, 20, "Kills: 0", {fontSize: '16px', fill: '#fff'});
    coinsText = self.add.text(120, 20, "Coins: 0", {fontSize: '16px', fill: '#fff'}); 
    statusText = self.add.text(20, 360, "Status: Alive", {fontSize: '16px', fill: 'red'}); 
}

function LoadingAssets(self) 
{
    //BACKGROUND
    //self.add.image( 0 , 0 , 'background').setOrigin(0,0);
       
    //GOLDEN COINS
   // coin = self.physics.add.image(300, 250, 'coin');

    //DANGEROUS BOMB
    bomb = self.physics.add.image(100, 200, 'bomb');
    
    //ENEMIES
    // blackenemy = self.physics.add.staticGroup();
    // blackenemy.create(100,150,'blackenemy');
    // blackenemy.create(300,120,'blackenemy');
    // blackenemy.create(400,350,'blackenemy');
    // blackenemy.create(600,200,'blackenemy');
}

function create() 
{
    // playerIdle(this);
    GetMouseInput(this); 
    GetKeyboardInput(this);
    LoadingAssets(this);
    playerIdle(this);
    loadingscene(this);
    settingGamePlatform(this);
    playerAnimations(this, flagAnimation = false);
    //LoadingAssets(this); 
    LoadingText(this);
     
}

function update ()
{
    OnMouseClick(this);
    OnKeyboardPress(this);
    CheckCollision(this);
}

