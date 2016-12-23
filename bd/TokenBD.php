<?php//Ver

include __DIR__ ."../../doctrine_config/doctrine-cfg.php";
include __DIR__ . '../../entities/User.php';


$dataPost = file_get_contents("php://input");
$request = json_decode($dataPost);


switch($request->data->action){

	case 'getIfUserExists':
		$pictures = $entityManager->getRepository('user')->findBy(array('email' => 'slider1'));
		echo(json_encode($pictures));
		break;
}

?>