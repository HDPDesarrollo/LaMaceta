<?php

include __DIR__ ."../../doctrine_config/doctrine-cfg.php";
include __DIR__ . '../../entities/Article.php';
include __DIR__ . '../../entities/Color.php';
include __DIR__ . '../../entities/Product.php';
include __DIR__ . '../../entities/Season.php';
include __DIR__ . '../../entities/Provider.php';

include __DIR__ . '../../entities/Picture.php';
include __DIR__ . '../../entities/Size.php';

$dataPost = file_get_contents("php://input");
$request = json_decode($dataPost);


switch($request->data->action){

	case 'getOneArticle':
		$article= $entityManager->find('Article', $request->data->id);
		//var_dump($addresses);

		$connection = $entityManager->getConnection();
		$statement = $connection->prepare("SELECT ruta_img FROM picture WHERE id_prod = ".$article->idProd->id." LIMIT 1");
		$statement->execute();
		$icon = $statement->fetchAll();

		if(isset($icon[0])){
			$article->icon = "../images/producto/".$icon[0]["ruta_img"];
		}else{
			$article->icon = "../images/default-image.jpg";
		}

		echo(json_encode($article));
		break;
}		