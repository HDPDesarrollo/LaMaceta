<?php 
/*
Centro de notificacion fuera de servicio por el momento, falta retocar
*/
include __DIR__ ."../../doctrine_config/doctrine-cfg.php";
include __DIR__ . '../../entities/User.php';
include __DIR__ . '../../entities/Address.php';
include __DIR__ . '../../entities/Sale.php';
include __DIR__ . '../../entities/SaleState.php';
include __DIR__ . '../../entities/State.php';

include("../PHP/clases/MP/mercadopago.php");

$sale_state;
$sale;

if (!isset($_GET["id"], $_GET["topic"]) || !ctype_digit($_GET["id"])) {
	http_response_code(400);
	return;
}

if($_GET["topic"] == 'payment'){
	$payment_info = $mp->get("/collections/notifications/" . $_GET["id"]);
	$exRef = $payment_info['collection']['external_reference'];
	$sale = $entityManager->getRepository('sale')->findOneBy(array('id' => $exRef));
	$sale_state = $entityManager->getRepository("SaleState")->findOneBy(array("idSale" => $sale->getId() ));

	switch ($payment_info['status']) {
		case 'pending':
			$state = $entityManager->getRepository("State")->findOneBy(array("id" => 1));
			$sale_state->setIdState($state);
			break;

		case 'approved':
			$state = $entityManager->getRepository("State")->findOneBy(array("id" => 2));
			$sale_state->setIdState($state);
			break;

		case 'authorized':
			$state = $entityManager->getRepository("State")->findOneBy(array("id" => 3));
			$sale_state->setIdState($state);
			break;

		case 'in_process':
			$state = $entityManager->getRepository("State")->findOneBy(array("id" => 4));
			$sale_state->setIdState($state);
			break;

		case 'in_mediation':
			$state = $entityManager->getRepository("State")->findOneBy(array("id" => 5));
			$sale_state->setIdState($state);
			break;

		case 'rejected':
			$state = $entityManager->getRepository("State")->findOneBy(array("id" => 6));
			$sale_state->setIdState($state);
			break;

		case 'cancelled':
			$state = $entityManager->getRepository("State")->findOneBy(array("id" => 7));
			$sale_state->setIdState($state);
			break;

		case 'refunded':
			$state = $entityManager->getRepository("State")->findOneBy(array("id" => 8));
			$sale_state->setIdState($state);
			break;

		case 'charged_back':
			$state = $entityManager->getRepository("State")->findOneBy(array("id" => 9));
			$sale_state->setIdState($state);
			break;

		}
		
	$entityManager->merge($sale_state);
	$entityManager->flush();
	http_response_code(201);
	return;


} else if($_GET["topic"] == 'merchant_order'){
	$merchant_order_info = $mp->get("/merchant_orders/" . $_GET["id"]);
}

?>