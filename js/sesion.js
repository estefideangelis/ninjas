var ZPlat = ZPlat || {};

$(document).ready(function() {

	// *.. Autenticacion del formulario ..*
	$('#formulario').submit(function() {
		var datosUsuario = $("#nombredeusuario").val()    // tomo lo que esta en el input de usuario
		var datosPassword = $("#clave").val()             // tomo lo que esta en el input de password
		
	  	archivoValidacion = "http://juego-ninja.tk/validacion_de_datos.php?jsoncallback=?" // url del archivo php que busca en la db

		$.getJSON(archivoValidacion,{usuario:datosUsuario ,password:datosPassword})
        .done(function(respuestaServer) {
            $mensa = respuestaServer.mensaje;             // tomo los mensajes que devuelve el php

            if(respuestaServer.validacion == "ok") {
			                
                for (i= 0; i < $mensa.length; i++) {
                    $.each($mensa[i], function(a,b) {
                        if (a == "id_usuario") {
                            localStorage.setItem("id_usuario", b);
                        } else if (a == "usuario") {
                            $saludo = "Hola " + b + "!";
                            $('#datos_inc').append($saludo);
                            ingreso();
                        }
                    });
                }
            } else {
                $('#datos_inc').append(respuestaServer.mensaje);
            }
        })
		return false;
	});

    $aide = localStorage.getItem("id_usuario");
	
	  function ingreso() {
    /*   ZPlat.dim = ZPlat.getGameLandscapeDimensions(700, 350);

       ZPlat.game = new Phaser.Game(ZPlat.dim.w, ZPlat.dim.h, Phaser.AUTO); // Instancio Phaser y especifico las dimensiones
        // // Cargo los estados
       ZPlat.game.state.add('Boot', ZPlat.BootState); 
       ZPlat.game.state.add('Preload', ZPlat.PreloadState); 
       ZPlat.game.state.add('Game', ZPlat.GameState);
       ZPlat.game.state.add('MainMenu', ZPlat.MainMenu);
       ZPlat.game.state.start('Boot');
    */
		
		
		

    }

   
});