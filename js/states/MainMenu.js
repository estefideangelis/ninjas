var ZPlat = ZPlat || {};

ZPlat.MainMenu = function (game) {

  this.music = null;
  this.playButton = null;
  

};

ZPlat.MainMenu.prototype = {
  preload: function () {
    this.load.image('titlepage', 'assets/images/inicio.png'); //Esta linea carga la imagen de fondo del menu
  },

  create: function () {

    //  We've already preloaded our assets, so let's kick right into the Main Menu itself.
	//Ya hemos cargado todas las partes, asi que ahora vayamos al menu en si mismo
    //  Here all we're doing is playing some music and adding a picture and button
	//Lo que hacemos aqui es reproducir algo de musica, agregar una imagen y un boton.
    //  Naturally I expect you to do something significantly better :)
	//Naturalmente, espero que hagas algo mejor que yo.
 this.add.sprite(0, 0, 'titlepage');
  //Agrega como sprite la imagen de fondo que cargamos antes, en la posicion 0x y 0y (comienza desde arriba a la izquierda.

   /* this.loadingText = this.add.text(this.game.width / 2, this.game.height / 2 + 80, "Presioná z o hacé clic para comenzar", { font: "20px monospace", fill: "#fff" }); //Esto agrega texto en pantalla, ancho de la pantalla divido 2, alto de la pantalla dividido 2 + 80 pixeles. Luego define el texto: "press z or tap/click game to start". Luego define el tamaño de la fuente, si es monoespaciado y el color.
	
    this.loadingText.anchor.setTo(0.5, 0.5); //Esto define el punto de anclaje del texto, en X e Y//
    this.add.text(this.game.width / 2, this.game.height - 90, "Videojuego desarrollado para la materia de programación", { font: "14px monospace", fill: "#fff", align: "center"}).anchor.setTo(0.5, 0.5);    
	//Lo mismo que el texto de arriba
    this.add.text(this.game.width / 2, this.game.height - 70, "Realizado con phaser por Silvina Orengo", { font: "14px monospace", fill: "#fff", align: "center"}).anchor.setTo(0.5, 0.5); 
	//Lo mismo que el texto de arriba.*/

  },

  update: function () {
	  



    if (this.input.keyboard.isDown(Phaser.Keyboard.Z) || this.input.activePointer.isDown) {
		
      this.startGame(); //Esto detecta si se apretó el boton Z, lo cual inicia el juego
	  
    }
    //  Do some nice funky main menu effect here

  },

  startGame: function (pointer) {

   
	//Ok, el boton de INICION ha sido clickeado, paremos la musica (o si prefieres, dejalo comentado asi continua)
	
	    // this.music.stop();

    //  And start the actual game
    this.state.start('Game');
	//Y esto empieza el juego mismo

  }

};
// JavaScript Document