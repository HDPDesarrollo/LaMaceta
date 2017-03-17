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

$dataPost = file_get_contents("php://input");
$request = json_decode($dataPost);


switch($request->data->action){

	//Address
	case 'getAllAddresses':
		$addresses = $entityManager->getRepository('Address')->findBy(array('idUser' => $request->data->user->id));
		echo(json_encode($addresses));
		break;

	case 'getAllActiveAddresses':

		if(isset($request->data->user->id)){
			$addresses = $entityManager->getRepository('Address')->findBy(array('idUser' => $request->data->user->id, 'active' => true));
			echo(json_encode($addresses));
		}
		break;

	case 'getAllProvinces':
		$provinces =  $entityManager->getRepository("Province")->findBy(array('active' => true));
		echo(json_encode($provinces));
		break;

	case 'saveAddress':
		$newAddress = new Address();
		$newAddress->setActive(true);
		$newAddress->setStreet($request->data->address->street);
		$newAddress->setNumber($request->data->address->number);
		$newAddress->setCity($request->data->address->city);
		$newAddress->setMobilePhone($request->data->address->mobilePhone);
		if(isset($request->data->address->phone)){
			$newAddress->setPhone($request->data->address->phone);
		}
		$user= $entityManager->find('User', $request->data->user->id);

		$newAddress->setIdUser($user);
		$newAddress->setZipCode($request->data->address->zipCode);
		if(isset($request->data->address->apartment)){
			$newAddress->setApartment($request->data->address->apartment);
		}

		$province= $entityManager->find('Province', $request->data->address->province->id);
		$newAddress->setIdProvince($province);

		$entityManager->persist($newAddress);
		$entityManager->flush();

		$addresses = $entityManager->getRepository('Address')->findBy(array('idUser' => $request->data->user->id));
		echo(json_encode($addresses));
		break;
		
	case 'deleteAddress':
		$addressToDelete = $request->data->address;
		$address= $entityManager->find('Address', $addressToDelete->id);
		$address->setActive(false);
		$entityManager->merge($address);
		$entityManager->flush();

		$addresses = $entityManager->getRepository('Address')->findBy(array('idUser' => $request->data->user->id));
		echo(json_encode($addresses));
		break;

	case 'updateAddress':
		$newAddress = new Address();
		$newAddress->setId($request->data->address->id);
		$newAddress->setActive(true);
		$newAddress->setStreet($request->data->address->street);
		$newAddress->setNumber($request->data->address->number);
		$newAddress->setCity($request->data->address->city);
		$newAddress->setPhone($request->data->address->phone);
		$newAddress->setMobilePhone($request->data->address->mobilePhone);

		$user= $entityManager->find('User', $request->data->user->id);

		$newAddress->setIdUser($user);
		$newAddress->setZipCode($request->data->address->zipCode);
		$newAddress->setApartment($request->data->address->apartment);

		$province= $entityManager->find('Province', $request->data->address->province->id);
		$newAddress->setIdProvince($province);

		$entityManager->merge($newAddress);
		$entityManager->flush();

		$addresses = $entityManager->getRepository('Address')->findBy(array('idUser' => $request->data->user->id));
		echo(json_encode($addresses));
		break;


	//User

	case 'getUser':
		$user= $entityManager->find('User', $request->data->user->id);
		echo(json_encode($user));
		break;

	case 'updateProfile':
		$newUser = new User();
		$newUser->setId($request->data->user->id);
		$newUser->setActive(true);
		$newUser->setEmail($request->data->user->email);
		$newUser->setPassword($request->data->user->password);
		//$newUser->setBirthDate($request->data->user->birthDate);
		$newUser->setGender($request->data->user->gender);

		$userType= $entityManager->find('UserType', $request->data->user->idUserType->id);
		$newUser->setIdUserType($userType);
		
		$newUser->setName($request->data->user->name);
		$newUser->setSurname($request->data->user->surname);

		$entityManager->merge($newUser);
		$entityManager->flush();

		$user= $entityManager->find('User', $request->data->user->id);
		echo(json_encode($user));
		break;

	//Purchase

	case 'getAllPurchases':

		$connection = $entityManager->getConnection();
		$statement = $connection->prepare('SELECT s.id, s.sale_Number, s.date, se.description, 
		p.name, c.color, sz.size, ds.quantity, ds.unit_Price
					FROM Sale s, 
					Detail_Sale ds,
					Sale_State st, 
					State se,
					Article a,
					Color c, 
					Size sz, 
					Product p
					WHERE ds.id_Sale = s.id 
					AND st.id_Sale = s.id and last_update = (SELECT MAX(LAST_UPDATE) FROM SALE_STATE WHERE ID_SALE = ds.id_sale)
					AND st.id_State = se.id
					AND ds.id_Article = a.id
					AND a.id_Color = c.id
					AND a.id_Size = sz.id
					AND a.id_Prod = p.id
					AND s.id_User = '.$request->data->user->id.'
					ORDER BY s.id');
		$statement->execute();

		$purchases = $statement->fetchAll();

		echo(json_encode($purchases));
		break;

	case 'cancelPurchase':

		$saleId = $request->data->purchase->id;

		$dia = new DateTime();
		$dia = $dia->format('Y-m-d H:i:s');

		$connection = $entityManager->getConnection();
		$statement = $connection->prepare("INSERT INTO sale_state (active, id_sale, id_state, last_update, motive) VALUES (1,".$saleId.",2,'".$dia."','CANCELACION')");
		$statement->execute();
		break;
		

	case 'confirmCheckout'://hacerlo atomico
		$pay = new mPay();

		$checkout = $request->data->checkout;
		$address = null;
		$user= $entityManager->find('User', $checkout->idUser);

		if(isset($checkout->address->id)){
			$address= $entityManager->find('Address', $checkout->address->id);
		}

		$state = $entityManager->getRepository('State')->findOneBy(array('description' => 'SOLICITADO'));

		if($address==null){//nueva direccion
			$address = new Address();
			$address->setActive(true);
			$address->setStreet($checkout->address->street);
			$address->setNumber($checkout->address->number);
			$address->setCity($checkout->address->city);
			$address->setMobilePhone($checkout->address->mobilePhone);
			if(isset($checkout->address->phone)){
				$address->setPhone($checkout->address->phone);
			}
			$address->setIdUser($user);
			$address->setZipCode($checkout->address->zipCode);
			if(isset($checkout->address->apartment)){
				$address->setApartment($checkout->address->apartment);
			}
			

			$province= $entityManager->find('Province', $checkout->address->idProvince->id);
			$address->setIdProvince($province);

			$entityManager->persist($address);
			$entityManager->flush();
		}


		$sale = new Sale();
		$sale->setActive(true);
		$sale->setDate(new DateTime());
		$sale->setPrice($checkout->totalAmount);
		$sale->setShippingCost($checkout->shippingCost);
		$sale->setPromotion($checkout->promotion);
		$sale->setSaleNumber(rand(1,8000));
		$sale->setIdUser($user);
		$sale->setIdAddress($address);
		//$sale->setIdCard($card);
		$sale->setPaymentMethod($checkout->paymentMethod);
		$sale->setQuota($checkout->quota);

		$entityManager->persist($sale);
		$entityManager->flush();

		$saleState = new SaleState();
		$saleState->setActive(true);
		$saleState->setLastUpdate(new DateTime());
		$saleState->setMotive("SALE");
		$saleState->setIdSale($sale);
		$saleState->setIdState($state);

		$entityManager->persist($saleState);
		$entityManager->flush();

		for ($i=0; $i < sizeof($checkout->articles); $i++) { 

			$id = $checkout->articles[$i]->id;
			$article= $entityManager->find('Article', $id);

			$detailState = new DetailSale();
			$detailState->setActive(true);
			$detailState->setQuantity($checkout->articles[$i]->quantity);
			$detailState->setUnitPrice($article->price);
			$detailState->setIdArticle($article);
			$detailState->setIdSale($sale);

			$entityManager->persist($detailState);
			$entityManager->flush();

			//bajar cantidad
			$article= $entityManager->find('Article', $id);
			$newQuantity = ($article->getStock() - $checkout->articles[$i]->quantity);
			$article->setStock($newQuantity);
			$entityManager->persist($article);
			$entityManager->flush();
		}

		var_dump($checkout->articles);
		//echo $pay->makePay($checkout->articles,$address,$checkout->shippingCost,$user);
		
		//echo($sale->id);

		break;

	case 'checkMinStock':

		if(isset($request->data->artId)){
			$article = $entityManager->find('Article', $request->data->artId);

			if($article != null && $article->minStock >= $article->stock){
				echo($article->id);
			}else{
				echo(false);
			}
		}
		break;


	case 'sendAgain'://VER

		$saleId = $request->data->purchase->id;

		$dia = new DateTime();
		$dia = $dia->format('Y-m-d H:i:s');

		$connection = $entityManager->getConnection();
		$statement = $connection->prepare("INSERT INTO sale_state (active, id_sale, id_state, last_update, motive) VALUES (1,".$saleId.",1,'".$dia."','Pedido de envio nuevo')");
		$statement->execute();
		break;
		
	/*case 'getRejectedSales':

		$blacklistSales = $entityManager->getRepository('BlacklistDetail')->findBy(array('idUser' => $request->data->user->id, 'active' => true));
		echo(json_encode($blacklistSales));
		break;

	case 'pagarBlacklist':

		$blacklistSales = $entityManager->getRepository('BlacklistDetail')->findBy(array('idUser' => $request->data->user->id));
		//echo(json_encode($blacklistSales));

		foreach ($blacklistSales as $item) {
			$item->setActive(false);
			$entityManager->merge($item);
		}

		$user = $entityManager->find('User', $request->data->user->id);
		$user = $user->setBlacklist(false);
		$entityManager->merge($user);
		$entityManager->flush();

		echo(json_encode($user));

		break;
	case 'getCreditCards':
		$creditCards = $entityManager->getRepository('CreditCard')->findBy(array('idUser' => $request->data->user->id, 'active' => true));
		echo(json_encode($creditCards));
		break;

	case 'createCreditCard':
		$newCreditCard = new CreditCard();
		$newCreditCard->setActive(true);
		$newCreditCard->setNumber($request->data->creditCard->number);

		$bankCard =  $entityManager->getRepository("BankCard")->findOneBy(array("idBank" => $request->data->creditCard->bank->id, "idCard" => $request->data->creditCard->card->id));
		$newCreditCard->setIdBankCard($bankCard);

		$newCreditCard->setCvv($request->data->creditCard->cvv);

		$newCreditCard->setName($request->data->creditCard->name);

		$user= $entityManager->find('User', $request->data->user->id);
		$newCreditCard->setIdUser($user);

		$vencimiento = "01/".$request->data->creditCard->expirationDateMonth."/".$request->data->creditCard->expirationDateYear;
		$date = date_create_from_format('d/m/y', $vencimiento); 

		$newCreditCard->setExpirationDate($date);

		$entityManager->persist($newCreditCard);
		$entityManager->flush();

		$creditCards = $entityManager->getRepository('CreditCard')->findBy(array('idUser' => $request->data->user->id, 'active' => true));
		echo(json_encode($creditCards));
		break;

	case 'updateCreditCard':
		$newCreditCard= $entityManager->find('CreditCard', $request->data->creditCard->id);
		$newCreditCard->setActive(true);
		$newCreditCard->setNumber($request->data->creditCard->number);

		$bankCard =  $entityManager->getRepository("BankCard")->findOneBy(array("idBank" => $request->data->creditCard->bank->id, "idCard" => $request->data->creditCard->card->id));
		$newCreditCard->setIdBankCard($bankCard);

		$newCreditCard->setCvv($request->data->creditCard->cvv);

		$newCreditCard->setName($request->data->creditCard->name);

		$user= $entityManager->find('User', $request->data->user->id);
		$newCreditCard->setIdUser($user);

		$vencimiento = "01/".$request->data->creditCard->expirationDateMonth."/".$request->data->creditCard->expirationDateYear;
		$date = date_create_from_format('d/m/y', $vencimiento); 

		$newCreditCard->setExpirationDate($date);

		$entityManager->persist($newCreditCard);
		$entityManager->flush();

		$creditCards = $entityManager->getRepository('CreditCard')->findBy(array('idUser' => $request->data->user->id, 'active' => true));
		echo(json_encode($creditCards));
		break;

	case 'deleteCreditCard':
		$creditCardToDelete = $request->data->creditCard;
		$creditCard= $entityManager->find('CreditCard', $creditCardToDelete->id);
		$creditCard->setActive(false);
		$entityManager->merge($creditCard);
		$entityManager->flush();

		$creditCards = $entityManager->getRepository('CreditCard')->findBy(array('idUser' => $request->data->user->id, 'active' => true));
		echo(json_encode($creditCards));
		break;
		*/


}		


