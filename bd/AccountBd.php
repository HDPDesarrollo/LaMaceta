<?php

include "C:/xampp/htdocs/www/LaMaceta/doctrine_config/doctrine-cfg.php";//Sacar rutas absolutas
include "C:/xampp/htdocs/www/LaMaceta/entities/Address.php";
include "C:/xampp/htdocs/www/LaMaceta/entities/User.php";
include "C:/xampp/htdocs/www/LaMaceta/entities/Province.php";
include "C:/xampp/htdocs/www/LaMaceta/entities/City.php";
include "C:/xampp/htdocs/www/LaMaceta/entities/UserType.php";

include "C:/xampp/htdocs/www/LaMaceta/entities/Article.php";
include "C:/xampp/htdocs/www/LaMaceta/entities/Color.php";
include "C:/xampp/htdocs/www/LaMaceta/entities/DetailSale.php";
include "C:/xampp/htdocs/www/LaMaceta/entities/Product.php";
include "C:/xampp/htdocs/www/LaMaceta/entities/Sale.php";
include "C:/xampp/htdocs/www/LaMaceta/entities/SaleState.php";
include "C:/xampp/htdocs/www/LaMaceta/entities/State.php";
include "C:/xampp/htdocs/www/LaMaceta/entities/Size.php";

$dataPost = file_get_contents("php://input");
$request = json_decode($dataPost);


switch($request->data->action){

	//Address
	case 'getAllAddresses':
		$addresses =  $entityManager->getRepository("Address")->findAll();
		echo(json_encode($addresses));
		break;

	case 'getAllProvinces':
		$provinces =  $entityManager->getRepository("Province")->findAll();
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
		$user= $entityManager->find('User', 2);//obtener del SESSION (el id)

		$newAddress->setIdUser($user);
		$newAddress->setZipCode($request->data->address->zipCode);
		$newAddress->setApartment($request->data->address->apartment);

		$province= $entityManager->find('Province', 1);//obtener del SESSION (el id)
		$newAddress->setIdProvince($province);

		$entityManager->persist($newAddress);
		$entityManager->flush();

		$addresses =  $entityManager->getRepository("Address")->findAll();
		echo(json_encode($addresses));
		break;
		
	case 'deleteAddress':
		$addressToDelete = $request->data->address;
		$address= $entityManager->find('Address', $addressToDelete->id);
		$address->setActive(false);
		$entityManager->merge($address);
		$entityManager->flush();

		$addresses =  $entityManager->getRepository("Address")->findAll();
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

		$user= $entityManager->find('User', 2);//obtener del SESSION (el id)

		$newAddress->setIdUser($user);
		$newAddress->setZipCode($request->data->address->zipCode);
		$newAddress->setApartment($request->data->address->apartment);

		$province= $entityManager->find('Province', 1);//obtener del SESSION (el id)
		$newAddress->setIdProvince($province);

		$entityManager->merge($newAddress);
		$entityManager->flush();

		$addresses =  $entityManager->getRepository("Address")->findAll();
		echo(json_encode($addresses));
		break;

	//User

	case 'getUser':
		$user= $entityManager->find('User', 2);//obtener del SESSION (el id)
		//$newBirthDate = new DateTime($user->getBirthDate());

		//$user->setBirthDate($newBirthDate);

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

	case 'getAllPurchases': // hacerlo por cliente
		$query = $entityManager->createQuery('SELECT s.id, s.saleNumber, s.date, se.description, 
		p.name, c.color, sz.size, ds.quantity, ds.unitPrice
					FROM Sale s, 
					DetailSale ds,
					SaleState st, 
					State se,
					Article a,
					Color c, 
					Size sz, 
					Product p
					WHERE ds.idSale = s.id 
					AND st.idSale = s.id
					AND st.idState = se.id
					AND ds.idArticle = a.id
					AND a.idColor = c.id
					AND a.idSize = sz.id
					AND a.idProd = p.id
					ORDER BY s.id');
		$purchases = $query->getResult();

		echo(json_encode($purchases));
		break;

	case 'cancelPurchase':
		$purchase= $entityManager->find('Sale', $request->data->purchase->id);	
		$purchase->setActive(false);
		$entityManager->merge($purchase);
		$entityManager->flush();		

		$state = $entityManager->getRepository('State')->findOneBy(array('description' => 'CANCELADO'));

		$saleState = $entityManager->getRepository('SaleState')->findOneBy(array('idSale' => $request->data->purchase->id));
		$saleState->setIdState($state);
		$entityManager->merge($purchase);
		$entityManager->flush();
		
		//no duplicar consulta!
		$query = $entityManager->createQuery('SELECT s.id, s.saleNumber, s.date, se.description, 
			p.name, c.color, sz.size, ds.quantity, ds.unitPrice
					FROM Sale s, 
					DetailSale ds,
					SaleState st, 
					State se,
					Article a,
					Color c, 
					Size sz, 
					Product p
					WHERE ds.idSale = s.id 
					AND st.idSale = s.id
					AND st.idState = se.id
					AND ds.idArticle = a.id
					AND a.idColor = c.id
					AND a.idSize = sz.id
					AND a.idProd = p.id
					ORDER BY s.id');
		$purchases = $query->getResult();

		echo(json_encode($purchases));
		break;

}		


