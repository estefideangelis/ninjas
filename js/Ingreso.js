var ZPlat = ZPlat || {};
var confirmado = false;

ZPlat.Ingreso = function() {

    ZPlat.Ingreso.prototype.confirmado = function(confirm) {
    	confirmado = confirm;
        return confirmado;
    }

    ZPlat.Ingreso.prototype.inicio = function() {
    	if (confirmado == true) {
        	console.log("hola mundo");
    	} else {
        	console.log("hola mundo");
    	}
    }
};