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

if (!isset($_GET["id"], $_GET["topic"]) || !ctype_digit($_GET["id"])) {
	http_response_code(400);
	return;
}

if($_GET["topic"] == 'payment'){
	$payment_info = $mp->get("/collections/notifications/" . $_GET["id"]);
	$user = $entityManager->find('User', $payment_info["response"]["collection"]["payer"]["email"]);
	$address = $entityManager->find('address',$user->id);

	$sale = new Sale();
	$sale->setIdUser($user->id);
	$sale->setId_payment($payment_info["response"]["collection"]["id"]);
	$sale->setPrice($payment_info["response"]["collection"]["total_paid_amount"]);
	$sale->setPaymentMethod($payment_info["response"]["collection"]["payment_type"]);
	$sale->setDate($payment_info["response"]["collection"]["date_created"]);
	$sale->setIdAddress($address->id);

	$entityManager->persist($sale);
	$entityManager->flush();

	$state = $entityManager->find('State', $payment_info["response"]["collection"]["status"]);
	$saleid = $entityManager->find('sale',$payment_info["response"]["collection"]["id"]);

	$saleState = new saleState();
	$saleState->setIdSale($saleid->id);
	$saleState->setIdState($state->id);
	$saleState->setLastUpdate($payment_info["response"]["collection"]["last_modified"]);
	$saleState->setMotive($payment_info["response"]["collection"]["reason"]);

	$entityManager->persist($saleState);
	$entityManager->flush();


	

} else if($_GET["topic"] == 'merchant_order'){
	$merchant_order_info = $mp->get("/merchant_orders/" . $_GET["id"]);
}

?>