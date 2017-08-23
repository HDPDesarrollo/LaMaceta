<?php

include __DIR__ ."../../FPDF/PDF.php";

include __DIR__ ."../../doctrine_config/doctrine-cfg.php";


include __DIR__ . '../../entities/Article.php';
include __DIR__ . '../../entities/User.php';
include __DIR__ . '../../entities/UserType.php';

$dataPost = file_get_contents("php://input");
$request = json_decode($dataPost);

switch($request->data->report->type){

	case 'Articulos':
		try{
			$connection = $entityManager->getConnection();
			$statement = $connection->prepare('SELECT p.id, p.name, p.description, p.active as prodActive, c.id as idColor, s.id as idSize, a.sku, a.active, (CAST(a.stock AS SIGNED)) as stock,(CAST(a.min_Stock AS SIGNED)) as minStock, a.price as price, c.color, s.size, a.id as idArt FROM product p LEFT JOIN article a ON a.id_prod = p.id LEFT JOIN color c ON a.id_Color = c.id LEFT JOIN size s ON a.id_Size = s.id');
			$statement->execute();

			$articles = $statement->fetchAll();

			$pdf = new PDF();
			 
			$pdf->AddPage();
			 
			$miCabecera = array('Nombre', 'Color', 'Talle', 'Stock', 'Precio', 'SKU');
			 
			$pdf->tablaHorizontal($miCabecera, $articles, $request->data->report);
			 
			$pdf->Output(__DIR__ ."../..//reportes/".$request->data->report->type.".pdf","F"); //Salida al navegador

			echo "reportes/".$request->data->report->type.".pdf";
		}catch(Exception $e){
			echo json_encode($e->getMessage());
		}
		break;

	case 'Ventas':
		try{
		$connection = $entityManager->getConnection();
		$statement = $connection->prepare('SELECT S.sale_number as saleNumber, S.date as saleDate, state.description as state, S.price as price, CONCAT( user.surname, ", ",user.name) AS userName FROM sale S INNER JOIN user ON S.id_user = user.id inner JOIN sale_state ST ON ST.id_sale = S.ID AND ST.last_update = (SELECT MAX(LAST_UPDATE) FROM sale_state ST WHERE ST.id_sale = S.id) INNER JOIN state ON ST.ID_STATE = state.id');
		$statement->execute();

		$sales = $statement->fetchAll();

		$pdf = new PDF();
		 
		$pdf->AddPage();
		 
		$miCabecera = array('Nº Venta', 'Estado', 'Usuario', 'Fecha', 'Monto Total');
		 
		$pdf->tablaHorizontal($miCabecera, $sales, $request->data->report);
		 
		$pdf->Output(__DIR__ ."../../reportes/".$request->data->report->type.".pdf","F"); //Salida al navegador

		echo "reportes/".$request->data->report->type.".pdf";
		}catch(Exception $e){
			echo json_encode($e->getMessage());
		}
		break;

	case 'Usuarios':
		try{
			$users =  $entityManager->getRepository("User")->findAll();

			$pdf = new PDF();
			 
			$pdf->AddPage();
			 
			$miCabecera = array('Nombre', 'Apellido', 'e-mail', 'Nacimiento', 'Tipo');
			 
			$pdf->tablaHorizontal($miCabecera, $users, $request->data->report);
			 
			$pdf->Output(__DIR__ ."../../reportes/".$request->data->report->type.".pdf","F"); //Salida al navegador

			echo "reportes/".$request->data->report->type.".pdf";
		}catch(Exception $e){
			echo json_encode($e->getMessage);
		}
		break;

}
