<?php
$conexion=mysqli_connect("localhost", "ucymxbzr_estefi", "maimo!123", "ucymxbzr_movivet");

//$conexion=mysqli_connect("localhost","ucymxbzr_estefi","maimo!123","ucymxbzr_movivet");


if(!$conexion){
	echo 'Error al conectar a la base de datos';
}
else{
	echo 'Conectados a la base de datos';
}

?>