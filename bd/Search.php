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
		$rName = "%".$request->data->cadena."%";
		$query = $entityManager->createQuery("SELECT p.id,p.name,p.description,
											art.stock,art.price,art.old_price,
											s.size,
											c.color 
											FROM product p 
											INNER JOIN article art ON p.id = art.id_prod 
											INNER JOIN color c ON art.id_color = c.id 
											INNER JOIN size s ON art.id_size = s.id
											WHERE p.name LIKE '$rName' ");
		//$result = $entityManager->getRepository("Product")->findBy(array('name' => $request->data->cadena));
		$result = $query->getResult();
		echo json_encode($result);
		break;
	case 'id':
		$result = $entityManager->getRepository("Product")->findOneBy(array('id' => $request->data->id));
		echo json_encode($result);
		break;
	default:
		
		break;
}

 ?>
