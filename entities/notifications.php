<?php 
include("../PHP/clases/MP/mercadopago.php");

$mp = new MP("ACCESS_TOKEN");

$json_event = file_get_contents('php://input', true);
$event = json_decode($json_event);


 ?>