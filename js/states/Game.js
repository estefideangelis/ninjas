var ZPlat = ZPlat || {};

ZPlat.GameState = {

  init: function(level) {    

    this.currentLevel = level || 'level1';
    
    //constants
    this.RUNNING_SPEED = 180;
    this.JUMPING_SPEED = 400;
    this.D_JUMPING_SPEED = 600;
    this.BOUNCING_SPEED = 150;
    this.DASHING_SPEED = 500;

	/*this.timer=60;
	this.timerText;*/

	this.coinText;
	this.totalCoins=0;

    //gravity
    this.game.physics.arcade.gravity.y = 1000;    
    
    //cursor keys to move the player
    this.cursors = this.game.input.keyboard.createCursorKeys();
  },
  create: function() {
	  
	  this.background = this.add.image(0, 0, 'background');
    //load current level
    this.loadLevel();
	
///////////////////////////////////////////////////////////////////////////////
    this.coins = this.game.add.group();
    this.coins.enableBody = true;
	
	for (i = 0; i < 5; i++) {
		
    this.coin = this.coins.create(i* 180,0, 'coin');
	//this.chest.body.gravity.y = 6;
	//this.chest = this.game.add.sprite(400,50, 'chest');
	//this.game.physics.enable(this.chest, Phaser.Physics.ARCADE);
	//this.chest.body.collideWorldBounds = true;
	//this.chest.enableBody = true;
}	
	
	this.coinText = this.game.add.text(10, 10, 'Banderines: 0/8', { font:"11px arial", fill: '#fff' });
	this.coinText.fixedToCamera = true;
	
	this.timerText = this.game.add.text(100, 10, 'Tiempo: ', { font:"11px arial", fill: '#fff' });
	this.timerText.fixedToCamera = true;
	
	this.timerDown();
	
  },   
  update: function() {    
    //collision between the player, enemies and the collision layer
    this.game.physics.arcade.collide(this.player, this.collisionLayer); 
    this.game.physics.arcade.collide(this.enemies, this.collisionLayer); 
    
    //collision between player and enemies
    this.game.physics.arcade.collide(this.player, this.enemies, this.hitEnemy, null, this);
    
    //overlap between player and goal
    this.game.physics.arcade.overlap(this.player, this.goal, this.changeLevel, null, this);
	
	
	this.game.physics.arcade.collide(this.coins, this.collisionLayer); 
	this.game.physics.arcade.overlap(this.player, this.coins, this.pickCoin, null, this);
    
    //generic platformer behavior (as in Monster Kong)
    this.player.body.velocity.x = 0;

    if(this.cursors.left.isDown || this.player.customParams.isMovingLeft) {
      this.player.body.velocity.x = -this.RUNNING_SPEED;
      this.player.scale.setTo(1, 1);
      this.player.play('walking_left');
      if(this.cursors.down.isDown)
      {
        this.player.body.velocity.x = -this.DASHING_SPEED;
      }
    }
    else if(this.cursors.right.isDown || this.player.customParams.isMovingRight) {
      this.player.body.velocity.x = this.RUNNING_SPEED;
      this.player.scale.setTo(-1, 1);
      this.player.play('walking_right');
      if(this.cursors.down.isDown)
      {
        this.player.body.velocity.x = this.DASHING_SPEED;
      }
    }
    else {
      this.player.animations.stop();
      this.player.frame = 0;
    }

    if((this.cursors.up.isDown /*|| this.player.customParams.mustJump*/) && (this.player.body.blocked.down || this.player.body.touching.down)) {
      this.player.body.velocity.y = -this.JUMPING_SPEED;

      if (this.cursors.up.shiftKey)
        {
          this.player.body.velocity.y = -this.D_JUMPING_SPEED;
      }
    }

    
    //kill enemy if it falls off
    if(this.player.bottom == this.game.world.height){
      this.gameOver();
    }
  },
  loadLevel: function(){  
    //create a tilemap object
    this.map = this.add.tilemap(this.currentLevel);
    
    //join the tile images to the json data
    this.map.addTilesetImage('tiles_spritesheet', 'gameTiles');
    
    //create tile layers
    this.backgroundLayer = this.map.createLayer('backgroundLayer');
    this.collisionLayer = this.map.createLayer('collisionLayer');
    
    //send background to the back
    this.game.world.sendToBack(this.backgroundLayer);
    
    //collision layer should be collisionLayer
    this.map.setCollisionBetween(1, 160, true, 'collisionLayer');
    
    //resize the world to fit the layer
    this.collisionLayer.resizeWorld();
    
    //create the goal
    var goalArr = this.findObjectsByType('goal', this.map, 'objectsLayer');
    this.goal = this.add.sprite(goalArr[0].x, goalArr[0].y, goalArr[0].properties.key);
    this.game.physics.arcade.enable(this.goal);
	
	this.goal.scale.setTo(1, 1);
    this.goal.body.allowGravity = false;
    this.goal.nextLevel = goalArr[0].properties.nextLevel;
	  
    
    //create player
    var playerArr = this.findObjectsByType('player', this.map, 'objectsLayer');
    this.player = this.add.sprite(playerArr[0].x, playerArr[0].y, 'player', 3);
    this.player.anchor.setTo(0.5);
    this.player.animations.add('walking_right', [ 3, 4], 6, true);
	this.player.animations.add('walking_left', [ 1, 2], 6, true);
    this.game.physics.arcade.enable(this.player);
    this.player.customParams = {};
    this.player.body.collideWorldBounds = true;

    //follow player with the camera
    this.game.camera.follow(this.player);
    
    //create enemies
    this.enemies = this.add.group();
    this.createEnemies();
    
  },
  findObjectsByType: function(targetType, tilemap, layer){
    var result = [];
    
    tilemap.objects[layer].forEach(function(element){
      if(element.properties.type == targetType) {
        element.y -= tilemap.tileHeight;        
        result.push(element);
      }
    }, this);
    
    return result;
  },
  changeLevel: function(player, goal){
	  if(this.totalCoins==8){
    this.game.state.start('Game', true, false, goal.nextLevel);
	  } else {
		  // this.loadLevel();
	  }
  },
  createEnemies: function(){
    var enemyArr = this.findObjectsByType('enemy', this.map, 'objectsLayer');
    var enemy;
     

    enemyArr.forEach(function(element){
      enemy = new ZPlat.Enemy(this.game, element.x, element.y, 'slime', +element.properties.velocity, this.map);
	  	  
      this.enemies.add(enemy);

	  
    }, this);
  },
  hitEnemy: function(player, enemy){
    if(enemy.body.touching.up){
      enemy.kill();
      player.body.velocity.y = -this.BOUNCING_SPEED;
    }
    else {
      this.gameOver();
    }
  },
  gameOver: function(){
    this.game.state.start('Game', true, false, this.currentLevel);
  },
  pickCoin:function(player, coin){
	  this.totalCoins+=1;
	this.coinText.text = 'Coins: ' + this.totalCoins +'/8';
	  coin.kill();
  },
  
 timerDown:function(){ 
 
 setInterval(function(){	  
	if(this.timer>0){
		this.timer -= 1;
		this.timerText.text = 'Tiempo: ' + this.timer;
	} else {
		//this.gameOver();
		//gameOverText.fixedToCamera = true;
	}
	},1000);
	
 }
  
};
