<?php 
require_once "../clases/MP/mercadopago.php";
 
$mp = new MP("7946879739002924", "fheDWZZVYy03UT7CJXCIUdXpYdowjqzJ");

$DatosPorPost = file_get_contents("php://input");
$dato = json_decode($DatosPorPost);

function ItemsToArray($dato){
	$arrayItem = array();
	for ($i=0; $i <= count($dato->art)-1; $i++){
				$arrayItem += array(
					"id" => $dato->art[$i]->id,
					"currency_id" => "ARG",
					"picture_url" => $dato->art[$i]->img,
					"description" =>$dato->art[$i]->description,
					"quantity" => $dato->art[$i]->quantity,
					"unit_price" =>  $dato->art[$i]->price
					);
			}
	return $arrayItem;
}

$preference_data = array(
		"items" => array(ItemsToArray($dato)),
		"payer" => array(
			"name" => $dato->ShipInf[0]->name,
			"surname" => $dato->ShipInf[0]->surname,
			"email" => $dato->ShipInf[0]->email,
			"phone" => array(
				"area_code" => "11",
				"number" => "4444-4444"
				),
			"identification" => array(
				"type" => "DNI",
				"number" => $dato->ShipInf[0]->dni,
				),
			"address" => array(
				"street_name" => $dato->ShipInf[0]->address->street,
				"street_number" => $dato->ShipInf[0]->address->number,
				"zip_code" => $dato->ShipInf[0]->address->zipCode
				)
			)
	);

$preference = $mp->create_preference($preference_data);

echo $preference["response"]["sandbox_init_point"];

 ?>