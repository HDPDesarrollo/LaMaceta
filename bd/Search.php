<?php 
include("../doctrine_config/doctrine-cfg.php");
include("../entities/Article.php");
include("../entities/Product.php");
include("../entities/Color.php");
include("../entities/Size.php");

$data = file_get_contents("php://input");
$request = json_decode($data);

switch ($request->data->action) {
	case 'string':
		$result = $entityManager->getRepository("Product")->findBy(array('name' => $request->data->cadena));
		echo json_encode($result);
		break;
	case 'id':
		
		break;
	default:
		
		break;
}


 ?>