<?php   //Ver

include __DIR__ ."../../doctrine_config/doctrine-cfg.php";
include __DIR__ . '../../entities/Product.php';
include __DIR__ . '../../entities/Provider.php';
include __DIR__ . '../../entities/Season.php';
include __DIR__ . '../../entities/Picture.php';

$dataPost = file_get_contents("php://input");
$request = json_decode($dataPost);


switch($request->data->action){

	case 'getAllSliders':
		$pictures = $entityManager->getRepository('picture')->findBy(array('path' => 'slider1'));
		echo(json_encode($pictures));
		break;
}

?>