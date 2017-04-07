<?php 
include("../PHP/clases/MP/mercadopago.php");
//include("../PHP/clases/ML/meli.php");
/**
* Clase mPay con funciones referidas a los estado de pagos,
* seguimiento de envios(si corresponde), etc
*/

class mPay
{
	private $mp;
	private $meli;
 	function __construct(){
 		//Credenciales del usuario test como comprador
 		$this->mp = new MP("8597128488150533", "RPqizvXasdzgNt23lsFUYSsKQYq1bosP");
 		/*$this->meli = new meli(array('appId' =>  "7946879739002924",
 									 'secret' => "fheDWZZVYy03UT7CJXCIUdXpYdowjqzJ"
 									 ));*/
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

	private function shipingToArray($dato,$address){
		$array = array("mode" => "me2",
						"dimensions" => $dato->dimensions,
						"default_shipping_method" => $dato->method,
						"zip_code" => $address->zip_code
						);
		if($dato->freeShipping != null)
		{
			$array["free_methods"] = array(array("id" => $dato->free_method));
		}

		$array["receiver_address"] = array(
											"street_name" => $address->street,
											"street_number" => $address->number,
											"zip_code" => $address->zip_code,
											"floor" => $address->apartment,
											"apartment" => $address->apartment
											);

		return $array;
	}
	
	/**
	* Realiza el pago tomando todos los datos (obligatorios) 
	* que se pasen por parametro
	*@param  $articles
	*@param $address
	*@param $shipping (dimension(alto,largo,ancho) + peso(gramos), retiro por local oca(true, false), costo de envio, tipo de envio (Estándar, Prioritario),CP)
	*@param $user
	*/
	public function  makePay($articles,$address,$shipping,$user){
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
											"zip_code" => $address->zip_code,
											"floor" => $address->apartment,
											"apartment" => $address->apartment
											),
						),
						"shipments" => shipingToArray($shipping,$address)
						);

		$preference = $this->mp->create_preference($preference_data);
		return $preference["response"]["sandbox_init_point"];
	}

	/**
	 *funcion que buscar los pagos hechos por un usuario con su external_reference (id que vincula MercadoPago y el sistema propio)
	 * @param $sale recibe una venta para obtener el 'external_reference'
	 */
	public function SearchPayment($sale){
		$filtro = array(
			"site_id" => "MLA",
			"payer_email" => $sale);
		$searchResult = $this->mp->search_payment($filtro);
		return $searchResult;
	}

	/**
	*Busca pagos hechos por $email que se pase como parametro
	*@param $email
	*/
	public function SearchEmail($email){
		$filtro = array("payer_email" => $email);
		$searchResult = $this->mp->search_payment($filtro);
		return $searchResult;
	}

	/**
	* Busca por medio del id de pago (de un usuario) en la coleccion de pagos recibidos 
	*@param $id (id de referencia de pago guardado en la db) 
	*/
	public function SearchCollection($id){
		$data = "/collections/notifications/".$id;
		return $this->mp->get($data);
	}

	/**
	* Devolucion de pago por ID
	*@param $id (id del usuario)
	*/
	
	public function RefoundPay($id){

		$respuesta = $this->mp->refund_payment($id);

		if($respuesta["status"] != 200){
			return false;
		}
		return true;
	}


	public function get($url,$dato=null){
		return $this->mp->get($url,$dato);
	}

	public function post($url,$dato=null){
		return $this->mp->post($url,$dato);
	}

	
}


 ?>