var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

// All Variabels 
var game = new Phaser.Game(config);
var platforms;

function preload ()
{
    //Loading all assetes
}


function hitEnimey (player, bomb)
{
    

}

function create ()
{
    //background


    //player & collider



    //enemey & collider



    //MestryBox & collider




}

function update ()
{
    //Movmenet handleng by mouse  




}