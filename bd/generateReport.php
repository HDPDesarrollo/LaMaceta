<?php //Ver si queda

include __DIR__ ."../../FPDF/PDF.php";

include __DIR__ ."../../doctrine_config/doctrine-cfg.php";


include __DIR__ . '../../entities/Article.php';
include __DIR__ . '../../entities/User.php';
include __DIR__ . '../../entities/UserType.php';

$dataPost = file_get_contents("php://input");
$request = json_decode($dataPost);

switch($request->data->report->type){

	case 'Articulos':

		$connection = $entityManager->getConnection();
		$statement = $connection->prepare('SELECT 
				p.id, 
				p.name, 
				p.description, 
				p.active as prodActive, 
				c.id as idColor, 
				s.id as idSize, 
				a.sku, 
				a.active, 
				(CAST(a.stock AS SIGNED)) as stock,
				(CAST(a.min_Stock AS SIGNED)) as minStock,
				a.price as price,
				c.color, 
				s.size, 
				a.id as idArt
					FROM Product p 
					LEFT JOIN Article a ON a.id_prod = p.id
					LEFT JOIN Color c ON a.id_Color = c.id
					LEFT JOIN Size s ON a.id_Size = s.id');
		$statement->execute();

		$articles = $statement->fetchAll();

		$pdf = new PDF();
		 
		$pdf->AddPage();
		 
		$miCabecera = array('Nombre', 'Color', 'Talle', 'Stock', 'Precio', 'SKU');
		 
		$pdf->tablaHorizontal($miCabecera, $articles, $request->data->report);
		 
		$pdf->Output(__DIR__ ."../..//reportes/".$request->data->report->type.".pdf","F"); //Salida al navegador

		echo "reportes/".$request->data->report->type.".pdf";

		break;

	case 'Ventas':

		$connection = $entityManager->getConnection();
		$statement = $connection->prepare('	SELECT 		
				S.SALE_NUMBER as saleNumber, 
				S.DATE as saleDate, 
				STATE.DESCRIPTION as state, 
				S.PRICE as price, 
				CONCAT( USER.SURNAME, ", ",USER.NAME) AS userName 
				FROM SALE S INNER JOIN USER ON S.ID_USER = USER.ID
				INNER JOIN SALE_STATE ST ON ST.ID_SALE = S.ID 
									AND ST.LAST_UPDATE = (SELECT MAX(LAST_UPDATE) FROM SALE_STATE ST WHERE ST.ID_SALE = S.ID)
				INNER JOIN STATE ON ST.ID_STATE = STATE.ID');
		$statement->execute();

		$sales = $statement->fetchAll();

		$pdf = new PDF();
		 
		$pdf->AddPage();
		 
		$miCabecera = array('Nº Venta', 'Estado', 'Usuario', 'Fecha', 'Monto Total');
		 
		$pdf->tablaHorizontal($miCabecera, $sales, $request->data->report);
		 
		$pdf->Output(__DIR__ ."../../reportes/".$request->data->report->type.".pdf","F"); //Salida al navegador

		echo "reportes/".$request->data->report->type.".pdf";

		break;

	case 'Usuarios':
		
		$users =  $entityManager->getRepository("User")->findAll();

		$pdf = new PDF();
		 
		$pdf->AddPage();
		 
		$miCabecera = array('Nombre', 'Apellido', 'e-mail', 'Nacimiento', 'Tipo');
		 
		$pdf->tablaHorizontal($miCabecera, $users, $request->data->report);
		 
		$pdf->Output(__DIR__ ."../../reportes/".$request->data->report->type.".pdf","F"); //Salida al navegador

		echo "reportes/".$request->data->report->type.".pdf";

		break;

}
