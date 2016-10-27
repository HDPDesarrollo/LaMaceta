<?php

include "C:/xampp/htdocs/www/LaMaceta/doctrine_config/doctrine-cfg.php";
include "C:/xampp/htdocs/www/LaMaceta/entities/User.php";
include "C:/xampp/htdocs/www/LaMaceta/entities/UserType.php";

include "C:/xampp/htdocs/www/LaMaceta/entities/Article.php";
include "C:/xampp/htdocs/www/LaMaceta/entities/Color.php";
include "C:/xampp/htdocs/www/LaMaceta/entities/Product.php";
include "C:/xampp/htdocs/www/LaMaceta/entities/Size.php";

$dataPost = file_get_contents("php://input");
$request = json_decode($dataPost);


switch($request->data->action){

	//User
	case 'getAllUsers':
		$users =  $entityManager->getRepository("User")->findAll();
		//var_dump($addresses);

		echo(json_encode($users));
		break;

	case 'getAllUserTypes':
		$userTypes =  $entityManager->getRepository("UserType")->findAll();
		//var_dump($addresses);

		echo(json_encode($userTypes));
		break;

	case 'createUser':
		$newUser = new User();
		$newUser->setActive(true);
		$newUser->setEmail($request->data->user->email);
		$newUser->setPassword($request->data->user->password);
		$newUser->setBirthDate(new DateTime());//$request->data->user->birthDate
		$newUser->setGender($request->data->user->gender);
		$newUser->setName($request->data->user->name);
		$newUser->setSurname($request->data->user->surname);

		$userType= $entityManager->find('UserType', $request->data->user->idUserType->id);
		$newUser->setIdUserType($userType);

		$entityManager->persist($newUser);
		$entityManager->flush();

		$users =  $entityManager->getRepository("User")->findAll();
		echo(json_encode($users));
		break;

	case 'updateUser':
		$newUser = new User();
		$newUser->setId($request->data->user->id);
		$newUser->setActive(true);
		$newUser->setEmail($request->data->user->email);
		$newUser->setPassword($request->data->user->password);
		$newUser->setBirthDate(new DateTime());//$request->data->user->birthDate
		$newUser->setGender($request->data->user->gender);

		$userType= $entityManager->find('UserType', $request->data->user->idUserType->id);
		$newUser->setIdUserType($userType);
		
		$newUser->setName($request->data->user->name);
		$newUser->setSurname($request->data->user->surname);

		$entityManager->merge($newUser);
		$entityManager->flush();

		$users =  $entityManager->getRepository("User")->findAll();
		echo(json_encode($users));
		break;

	case 'removeUser':
		$user= $entityManager->find('User', $request->data->user->id);
		$user->setActive(false);
		$entityManager->merge($user);
		$entityManager->flush();

		$users =  $entityManager->getRepository("User")->findAll();
		echo(json_encode($users));
		break;

	case 'updateUserType':
		$user= $entityManager->find('User', $request->data->user->id);

		$userType= $entityManager->find('UserType', $request->data->user->idUserType->id);
		$user->setIdUserType($userType);

		$entityManager->merge($user);
		$entityManager->flush();

		$users =  $entityManager->getRepository("User")->findAll();
		echo(json_encode($users));
		break;

	//Articles
	case 'getAllArticles': // hacerlo por cliente
		$query = $entityManager->createQuery('SELECT 
				p.id, p.active as prodActive, c.id as idColor, a.sku, a.active, a.stock, a.minStock, a.price, 
				p.name, p.description, 
				c.color, s.size
					FROM Article a, 
					Product p,
					Color c, 
					Size s
					WHERE a.idColor = c.id
					AND a.idSize = s.id
					AND a.idProd = p.id
					ORDER BY s.id');
		$purchases = $query->getResult();

		echo(json_encode($purchases));
		break;

	case 'getAllColors':
		$colors =  $entityManager->getRepository("Color")->findAll();
		//var_dump($addresses);

		echo(json_encode($colors));
		break;

	case 'getAllSizes':
		$sizes =  $entityManager->getRepository("Size")->findAll();
		//var_dump($addresses);

		echo(json_encode($sizes));
		break;
}		