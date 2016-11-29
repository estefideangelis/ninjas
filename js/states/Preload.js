var ZPlat = ZPlat || {};

//loading the game assets
ZPlat.PreloadState = {
  preload: function() {
    //show loading screen
    this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'preloadbar');
    this.preloadBar.anchor.setTo(0.5);
    this.preloadBar.scale.setTo(3);

    this.load.setPreloadSprite(this.preloadBar);

    //load game assets    
	this.load.image('fin', 'assets/images/fin.png');//Menu del juego
	this.load.image('titlePage', 'assets/images/inicio.png');//Menu del juego

 /*   this.load.image('platform', 'assets/images/platform.png');*/
    this.load.image('goal', 'assets/images/goal.png');
    this.load.image('slime', 'assets/images/slime.png');
    this.load.spritesheet('player', 'assets/images/player.png', 50, 50); 
 /*   this.load.spritesheet('fly', 'assets/images/fly_spritesheet.png', 35, 18, 2, 1, 2);    */
    
    this.load.image('gameTiles', 'assets/images/tiles_spritesheet.png');    
    this.load.tilemap('level1', 'assets/levels/level1.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.tilemap('level2', 'assets/levels/level2.json', null, Phaser.Tilemap.TILED_JSON);
    
	this.load.image('coin', 'assets/images/coin.png');
	
	this.load.image('arrowButton', 'assets/images/arrowButton.png');    
    this.load.image('actionButton', 'assets/images/actionButton.png'); 
	
	
  },
  create: function() {
  this.state.start('MainMenu');
  }
};