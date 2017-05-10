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
	$sale = $entityManager->getRepository('sale')->findOneBy(array('id_payment' => $exRef));
	$sale_state = $entityManager->getRepository('sale_state')->findOneBy(array('id_sale' => $sale->getId() ));

	switch ($payment_info['status']) {

		case 'pending':
			$sale_state->setIdSale(1);
			break

		case 'approved':
			$sale_state->setIdSale(2);
			break;

		case 'authorized':
			$sale_state->setIdSale(3);
			break;

		case 'in_process':
			$sale_state->setIdSale(4);
			break;

		case 'in_mediation':
			$sale_state->setIdSale(5);
			break;

		case 'rejected':
			$sale_state->setIdSale(6);
			break;

		case 'cancelled':
			$sale_state->setIdSale(7);
			break;

		case 'refunded':
			$sale_state->setIdSale(8);
			break;

		case 'charged_back':
			$sale_state->setIdSale(9);
			break;
	}

	$entityManager->merge($sale_state);
	$entityManager->flush();


} else if($_GET["topic"] == 'merchant_order'){
	$merchant_order_info = $mp->get("/merchant_orders/" . $_GET["id"]);
}

?>