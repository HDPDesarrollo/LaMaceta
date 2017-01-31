<?php

include __dir__ ."../../doctrine_config/doctrine-cfg.php";
include __DIR__ . '../../entities/Article.php';
include __DIR__ . '../../entities/Color.php';
include __DIR__ . '../../entities/Size.php';
include __DIR__ . '../../entities/Product.php';
include __DIR__ . '../../entities/Season.php';
include __DIR__ . '../../entities/Provider.php';
$datapost = file_get_contents("php://input");
$request = json_decode($datapost);


switch($request->data->action){

	case 'search':

			$filterColor = "";
			if(isset($request->data->color)){
				$filterColor = " and (c.rgb = '".$request->data->color."') ";
			}

			$filterPriceFrom= "";
			if(isset($request->data->priceFrom)){
				$filterPriceFrom = " and (a.price <= ".$request->data->priceFrom.") ";
			}

			$filterPriceTo = "";
			if(isset($request->data->priceTo)){
				$filterPriceto = " and (a.price >= ".$request->data->priceTo.") ";
			}

			$filterTarget = "";
			if(isset($request->data->target)){
				$filterTarget = " and (p.target = '".$request->data->target."') ";
			}

			$filterProdType = "";
			if(isset($request->data->prodType)){
				$filterProdType = " and (p.prod_type = '".$request->data->prodType."') ";
			}

			$filterSeason = "";
			if(isset($request->data->season)){
				$filterSeason = " and (se.season = '".$request->data->season."') ";
			}

			$query = ("select p.id as id,
							  a.price as price,
							  p.name, s.size, c.color, c.rgb,
							  pic.ruta_img as picture,
							  se.season
							from article a 
							inner join product p on p.id = a.id_prod
							inner join color c on c.id = a.id_color
							inner join size s on s.id = a.id_size
							inner join season se on se.id = p.id_season
							inner join picture pic on pic.id_prod = p.id
							where upper(p.name) like upper('%".$request->data->word."%' ) 
							".$filterPriceFrom."
							".$filterPriceTo."
							".$filterColor."
							".$filterProdType."
							".$filterTarget."
							".$filterSeason."
							order by ".$request->data->sorting);

			/*echo($query);
			break;*/

			$connection = $entityManager->getConnection();
			$statement = $connection->prepare($query);

			$statement->execute();

			$search = $statement->fetchAll();

			echo(json_encode($search));
		break;

	case 'getMenu':
			$connection = $entityManager->getConnection();
			$statement = $connection->prepare("select target as target, 
													  prod_type as prodtype
												from product 
												group by target, prod_type
												order by target, prod_type");

			$statement->execute();

			$menu = $statement->fetchAll();

			echo(json_encode($menu));
		break;

	case 'getAllColorsByProdId':
		$connection = $entityManager->getConnection();
		$statement = $connection->prepare('select c.* from color c
											inner join article a on c.id = a.id_color
											where a.id_prod ='.$request->data->prodId);
		$statement->execute();

		$colors = $statement->fetchAll();

		echo(json_encode($colors));
		break;

	case 'getAllSizesByProdId':
		$connection = $entityManager->getConnection();
		$statement = $connection->prepare('select s.* from size s
											inner join article a on s.id = a.id_size
											where a.id_prod ='.$request->data->prodId);
		$statement->execute();

		$sizes = $statement->fetchAll();

		echo(json_encode($sizes));
		break;
}		


