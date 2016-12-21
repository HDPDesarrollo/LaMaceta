<?php

include __DIR__ ."../../doctrine_config/doctrine-cfg.php";
include __DIR__ . '../../entities/Article.php';
include __DIR__ . '../../entities/Color.php';
include __DIR__ . '../../entities/Size.php';
include __DIR__ . '../../entities/Product.php';
include __DIR__ . '../../entities/Provider.php';
include __DIR__ . '../../entities/Picture.php';
include __DIR__ . '../../entities/Season.php';


$dataPost = file_get_contents("php://input");
$request = json_decode($dataPost);


switch($request->data->action){

	case 'getPicturesByProdId':
		if(isset($request->data->id)){
			$pictures = $entityManager->getRepository('Picture')->findBy(array('idProd' => $request->data->id));
			echo(json_encode($pictures));
		}
		break;

	case 'getArticlesByProdId': 
		if(isset($request->data->id)){
			$articles = $entityManager->getRepository('Article')->findBy(array('idProd' => $request->data->id));
			echo(json_encode($articles));
		}
		break;

	case 'validateStockByArticle': 
		$connection = $entityManager->getConnection();
		$statement = $connection->prepare('SELECT MAX(ID) as ID
					FROM ARTICLE 
					WHERE ID_PROD = '.$request->data->idProd.' 
					AND ID_SIZE = '.$request->data->idSize.' 
					AND ID_COLOR = '.$request->data->idColor.' 
					AND STOCK >= '.$request->data->quantity);
		$statement->execute();

		$idArticle = $statement->fetchAll();

		echo(json_encode($idArticle));
		break;

	case 'getPromotions': 

		if(isset($request->data->idBankCard)){		
			$connection = $entityManager->getConnection();
			$statement = $connection->prepare('SELECT MAX(PERCENTAGE) AS percentage
												FROM PROMOTION
											    	WHERE CURDATE() BETWEEN DATE_FROM AND DATE_TO 
											    	AND ID_BANK_CARD = '.$request->data->idBankCard.'
											    	AND ACTIVE = 1
											        AND (
											        	   (WEEKDAY(CURDATE()) = 0 AND MONDAY = 1)
											            OR (WEEKDAY(CURDATE()) = 1 AND TUESDAY = 1)
											            OR (WEEKDAY(CURDATE()) = 2 AND WEDNESDAY = 1)
											            OR (WEEKDAY(CURDATE()) = 3 AND THURSDAY = 1)
											            OR (WEEKDAY(CURDATE()) = 4 AND FRIDAY = 1)
											            OR (WEEKDAY(CURDATE()) = 5 AND SATURDAY = 1)
											            OR (WEEKDAY(CURDATE()) = 6 AND SUNDAY = 1)            
											        )');
			$statement->execute();
			$percentage = $statement->fetchAll();
			echo(json_encode($percentage));
		}
		break;
}		


