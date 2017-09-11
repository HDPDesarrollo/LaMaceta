<?php

include __DIR__ ."../../doctrine_config/doctrine-cfg.php";
include __DIR__ . '../../entities/Product.php';

include __DIR__ . '../../entities/Provider.php';
include __DIR__ . '../../entities/Season.php';
include __DIR__ . '../../entities/Picture.php';


if(isset($_FILES['files'])){

	try {

	$product = $_POST['product'];
	$type = $_POST['type'];
	$files = $_FILES['files'];

	for ($i=0; $i < count($files["name"]); $i++) { 
				
		$file_name = rand()*rand()."-".$files['name'][$i];
	    $file_tmp = $files['tmp_name'][$i];

	    move_uploaded_file($file_tmp,"../images/".$type."/".$file_name);

	    $picture = new Picture();

	    $picture->setActive(true);
		$picture->setPath($type);
		$picture->setRutaImg($file_name);

		if($type=="producto"){
			$someProduct= $entityManager->find('Product', $product["id"]);
			$picture->setIdProd($someProduct);
		}
		if($type=="slider1" && isset($_POST["sliderLink"])){
			$picture->setLink($_POST["sliderLink"]);
		}

		$entityManager->persist($picture);
	}

	$entityManager->flush();

	echo "Imágenes subidas correctamente";

	} catch (Exception $e) {
		echo json_encode($e->getMessage());
	}
}else{
	echo "Sin setear PESOS_FILES";
}

?>
