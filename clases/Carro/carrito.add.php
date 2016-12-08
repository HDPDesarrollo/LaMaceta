<?php
include_once("./lib/Carrito.class.php");

$carro = new Carrito();

$DatosPorPost = file_get_contents("php://input");
$dato = json_decode($DatosPorPost);
$articulo = array(
	"id" => $dato->id,
	"cantidad"=>$dato->quantity,
	"precio"=>$dato->price);
try{
	$carro.add($articulo);
	return true;
}
catch(Exception $ex){
	return $ex;
}

?>