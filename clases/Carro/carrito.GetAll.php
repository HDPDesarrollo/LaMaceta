<?php 
include_once("./lib/Carrito.class.php");
$carro = new Carrito();

$DatosPorPost = file_get_contents("php://input");
$data = json_decode($DatosPorPost);
if($data->data === "getAll")
{
	$result = $carro->get_content();
}else{
	$result = false;
}
echo json_encode($result);
 ?>