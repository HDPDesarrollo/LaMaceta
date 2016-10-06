<?php

include "C:/xampp/htdocs/www/LaMaceta/doctrine_config/doctrine-cfg.php";
include "C:/xampp/htdocs/www/LaMaceta/entities/User.php";
include "C:/xampp/htdocs/www/LaMaceta/entities/UserType.php";

$dataPost = file_get_contents("php://input");
$request = json_decode($dataPost);


switch($request->data->action){

	//User
	case 'getAllUsers':
		$users =  $entityManager->getRepository("User")->findAll();
		//var_dump($addresses);

		echo(json_encode($users));
		break;
}		