<?php
$nombre=$_POST['nombre'];
$password=$_POST['password'];

//conectar a la base de datos 

$conexion=mysqli_connect("localhost","ucymxbzr_estefi","maimo!123","ucymxbzr_juego");



$consulta="SELECT * FROM usuarios WHERE nombre='$nombre' and password='$password'";
$resultado=mysqli_query($conexion,$consulta);


$filas=mysqli_num_rows($resultado);
if($filas>0){
	header("location:index.html");
}else{
	echo "<script language='javascript'>
alert('Usuario o contraseña incorrecta');
window.location.href = 'http://juego-ninja.TK/';
</script>";
}
mysqli_free_result($resultado);
mysqli_close($conexion);

?>