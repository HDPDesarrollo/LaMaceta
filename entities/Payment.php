<?php 
include("../PHP/clases/MP/mercadopago.php");
/**
* Clase mPay con funciones referidas a los estado de pagos,
* seguimiento de envios(si corresponde), etc
*/

class mPay
{
	private $mp;

 	function __construct(){
 		$this->mp = new MP("7946879739002924", "fheDWZZVYy03UT7CJXCIUdXpYdowjqzJ");
 	}

	private function ItemsToArray($dato){
		$arrayItem = array();
		for ($i=0; $i <= count($dato)-1; $i++){
				$arrayItem += array(
					"id" => $dato[$i]->id,
					"currency_id" => "ARG",
					"picture_url" => $dato[$i]->img,
					"description" =>$dato[$i]->description,
					"quantity" => $dato[$i]->quantity,
					"unit_price" =>  $dato[$i]->price
					);
			}
		return $arrayItem;
	}
	
	public static function  makePay($articles,$address,$shippingCost,$user){
		$preference_data = array(
						"items" => array(ItemsToArray($articles)),
						"payer" => array(
								"name" => $user->name,
								"surname" => $user->surname,
								"email" => $user->email,
								"phone" => array(
										"area_code" => "11",
										"number" => $address->phone,
										),
								"address" => array(
											"street_name" => $address->street,
											"street_number" => $address->number,
											"zip_code" => $address->zip_code
											)
								),
						);
		$preference = $this->mp->create_preference($preference_data);
		echo $preference["response"]["sandbox_init_point"];

	}

	/**
	 *funcion que buscar los pagos hechos por un usuario con su external_reference (id que vincula MercadoPago y el sistema propio)
	 * @param $sale recibe una venta para obtener el 'external_reference'
	 */
	public static function SearchPayment($sale){
		$filtro = array(
			"site_id" => "MLA",
			"external_reference" => $sale->external_reference);
		$searchResult = $this->mp->search_payment($filtro);
		echo $searchResult;
	}

	
}


 ?>