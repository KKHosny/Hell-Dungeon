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


var config = {
    type: Phaser.AUTO,
    width: screenWidth,
    height: screenHeight,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: true
        }
    },
    pixelArt: true,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

// All Variabels 
var game = new Phaser.Game(config);

function preload() {

    this.load.image('screenplatright', 'assests/platform/siderightPlatform.png');
    this.load.image('screenplatleft', 'assests/platform/sideLeftPlatform.png');

    this.load.image('leftPlat', 'assests/platform/LeftPlatform.png');
    this.load.image('rightPlat', 'assests/platform/RightPlatform.png');
    this.load.image('platform', 'assests/platform/Platform.png');


    this.load.spritesheet('idle',
        'assests/player/move/spritesheet.png',
        { frameWidth: 16, frameHeight: 12 }
    );

    this.load.spritesheet('dead',
        'assests/player/dead/spritesheet-1.png',
        { frameWidth: 16, frameHeight: 16 }
    );


}

function hitEnimey(player, bomb) {

}



function playerDead(self) {
    player = self.physics.add.sprite(50, 50, 'dead');
    player.body.setOffset(1, 2);
    player.body.width = 13;
    player.body.height = 14;
}


function playerIdle(self) {
    player = self.physics.add.sprite(50, 50, 'idle');
    player.body.setOffset(3, 1);
    player.body.width = 11;
    player.body.height = 12;
}


function loadingscene(self) {

    ScreenPlatformLeft = self.physics.add.staticGroup();
    ScreenPlatformRight = self.physics.add.staticGroup();


    ScreenPlatformLeft.create(224, 0, 'screenplatleft').setOrigin(0, 0).setScale(1, 1).refreshBody();
    ScreenPlatformRight.create(0, 0, 'screenplatright').setOrigin(0, 0).setScale(1, 1).refreshBody();

    player.body.setGravityY(800);
    player.setBounce(0.02);
    player.setCollideWorldBounds(true);

    self.physics.add.collider(player, ScreenPlatformLeft, ScreenPlatformRight);
}

function settingGamePlatform(self) {

    platformArray = [leftPlatform, rightPlatform, gamePlatform];

    for (let i = 0; i < 3; i++)
     {

        if (i == 0)
        platformArray[i] = self.physics.add.staticGroup();
        platformArray[i].create(screenWidth / 2, screenHeight / 2, 'rightPlat').setOrigin(0, 0).refreshBody();

        if (i == 1)
        platformArray[i] = self.physics.add.staticGroup();
        platformArray[i].create(screenWidth / 2, screenHeight / 2, 'leftPlat').setOrigin(0, 0).refreshBody();
        if (i == 2)
        platformArray[i] = self.physics.add.staticGroup();
        platformArray[i].create(screenWidth / 2, screenHeight / 2, 'platform').setOrigin(0, 0).refreshBody();

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
                frames: self.anims.generateFrameNumbers('idle', { start: 0, end: 2 }),
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



function create() {

    playerIdle(this);
    loadingscene(this);
    settingGamePlatform(this);
    playerAnimations(this, flagAnimation = true);
    // playerIdle(this);


}


function update() {
    //Movmenet handleng by mouse  




}