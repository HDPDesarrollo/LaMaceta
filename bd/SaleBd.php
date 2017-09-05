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

$Updatesale = $entityManager->getRepository("Sale")->findOneBy(array("id" => $exRef));
$Updatesale->setId_collection($request['collection_id']);

$sale_state = $entityManager->getRepository("SaleState")->findOneBy(array("idSale" => $exRef));


switch ($request['collection_status']) {

		case 'pending':
			$state = $entityManager->getRepository("State")->findOneBy(array("id" => 1));
			$sale_state->setIdState($state);
			break;

		case 'approved':
			$state = $entityManager->getRepository("State")->findOneBy(array("id" => 2));
			$Updatesale->setLink_pago("null");
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

$entityManager->merge($Updatesale);
$entityManager->flush();


header('Location: http://lamacetaweb.com.ar/lamaceta/theme/shop-index.html');
 ?>