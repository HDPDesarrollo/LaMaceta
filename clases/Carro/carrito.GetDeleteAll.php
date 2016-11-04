<?php
include_once("./lib/Carrito.class.php");
$carro = new Carrito();

$DatosPorPost = file_get_contents("php://input");
$Datos = json_decode($DatosPorPost);
switch ($Datos->data) {
	case 'DeleteAll':
		return $carro->destroy();
		break;
	
	default:
		return false;
		break;
}

?>