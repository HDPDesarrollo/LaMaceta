<?php

include __DIR__ ."../../doctrine_config/doctrine-cfg.php";
include __DIR__ . '../../entities/Article.php';
include __DIR__ . '../../entities/Color.php';
include __DIR__ . '../../entities/Size.php';
include __DIR__ . '../../entities/Product.php';
include __DIR__ . '../../entities/Season.php';
include __DIR__ . '../../entities/Provider.php';
$dataPost = file_get_contents("php://input");
$request = json_decode($dataPost);


switch($request->data->action){

	case 'search':

			$filterColor = "";
			if(isset($request->data->color)){
				$filterColor = " AND (C.RGB = '".$request->data->color."') ";
			}

			$filterPriceFrom= "";
			if(isset($request->data->priceFrom)){
				$filterPriceFrom = " AND (A.PRICE <= ".$request->data->priceFrom.") ";
			}

			$filterPriceTo = "";
			if(isset($request->data->priceTo)){
				$filterPriceTo = " AND (A.PRICE >= ".$request->data->priceTo.") ";
			}

			$filterTarget = "";
			if(isset($request->data->target)){
				$filterTarget = " AND (P.TARGET = '".$request->data->target."') ";
			}

			$filterProdType = "";
			if(isset($request->data->prodType)){
				$filterProdType = " AND (P.PROD_TYPE = '".$request->data->prodType."') ";
			}

			$query = ("SELECT P.ID as id,
							  A.PRICE as price,
							  P.NAME, S.SIZE, C.COLOR, C.RGB,
							  PIC.RUTA_IMG as picture
							FROM ARTICLE A 
							INNER JOIN product P ON P.ID = A.ID_PROD
							INNER JOIN color C ON C.ID = A.ID_COLOR
							INNER JOIN size S ON S.ID = A.ID_SIZE
							INNER JOIN picture PIC ON PIC.ID_PROD = P.ID
							WHERE UPPER(P.NAME) LIKE UPPER('%".$request->data->word."%' ) 
							".$filterPriceFrom."
							".$filterPriceTo."
							".$filterColor."
							".$filterProdType."
							".$filterTarget."
							ORDER BY ".$request->data->sorting);

			$connection = $entityManager->getConnection();
			$statement = $connection->prepare($query);

			$statement->execute();

			$search = $statement->fetchAll();

			echo(json_encode($search));
		break;

	case 'getMenu':
			$connection = $entityManager->getConnection();
			$statement = $connection->prepare("SELECT TARGET AS target, 
													  PROD_TYPE as prodType
												FROM product 
												GROUP BY TARGET, PROD_TYPE
												ORDER BY TARGET, PROD_TYPE");

			$statement->execute();

			$menu = $statement->fetchAll();

			echo(json_encode($menu));
		break;

	case 'getAllColorsByProdId':
		$connection = $entityManager->getConnection();
		$statement = $connection->prepare('SELECT C.* FROM COLOR C
											INNER JOIN ARTICLE A ON C.ID = A.ID_COLOR
											WHERE A.ID_PROD ='.$request->data->prodId);
		$statement->execute();

		$colors = $statement->fetchAll();

		echo(json_encode($colors));
		break;

	case 'getAllSizesByProdId':
		$connection = $entityManager->getConnection();
		$statement = $connection->prepare('SELECT S.* FROM SIZE S
											INNER JOIN ARTICLE A ON S.ID = A.ID_SIZE
											WHERE A.ID_PROD ='.$request->data->prodId);
		$statement->execute();

		$sizes = $statement->fetchAll();

		echo(json_encode($sizes));
		break;
}		


