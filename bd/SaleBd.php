<?php 
include __DIR__ ."../../doctrine_config/doctrine-cfg.php";
include __DIR__ . '../../entities/Address.php';
include __DIR__ . '../../entities/User.php';
include __DIR__ . '../../entities/BlacklistDetail.php';
include __DIR__ . '../../entities/SaleState.php';
include __DIR__ . '../../entities/City.php';
include __DIR__ . '../../entities/UserType.php';
include __DIR__ . '../../entities/Article.php';
include __DIR__ . '../../entities/Color.php';
include __DIR__ . '../../entities/DetailSale.php';
include __DIR__ . '../../entities/Product.php';
include __DIR__ . '../../entities/Provider.php';
include __DIR__ . '../../entities/Sale.php';
include __DIR__ . '../../entities/Season.php';
include __DIR__ . '../../entities/State.php';
include __DIR__ . '../../entities/Size.php';
include __DIR__ . '../../entities/CreditCard.php';
include __DIR__ . '../../entities/Bank.php';
include __DIR__ . '../../entities/Card.php';
include __DIR__ . '../../entities/BankCard.php';
include __DIR__ . '../../entities/Province.php';
include __DIR__ . '../../entities/Payment.php';

$request = $_GET;

$exRef = $request['external_reference'];

$Updatesale = $entityManager->getRepository("sale")->findOneBy(array("id" => $exRef));
$Updatesale->setId_collection($request['collection_id']);

$sale_state = $entityManager->getRepository("SaleState")->findOneBy(array("idSale" => $exRef));

//$state = $entityManager->getRepository("State")->findOneBy(array("id" => 1));
$state = new State();
switch ($request['collection_status']) {

		case 'pending':
			$state->setId(1);
			break;

		case 'approved':
			$state->setId(2);
			break;

		case 'authorized':
			$sale_state->setIdState(3);
			break;

		case 'in_process':
			$sale_state->setIdState(4);
			break;

		case 'in_mediation':
			$sale_state->setIdState(5);
			break;

		case 'rejected':
			$sale_state->setIdState(6);
			break;

		case 'cancelled':
			$sale_state->setIdState(7);
			break;

		case 'refunded':
			$sale_state->setIdState(8);
			break;

		case 'charged_back':
			$sale_state->setIdState(9);
			break;
	}

$sale_state->setIdState($state);

$entityManager->merge($Updatesale);
$entityManager->flush();

$entityManager->merge($sale_state);
$entityManager->flush();


header('Location: http://localhost/laMaceta/theme/shop-index.html');
 ?>