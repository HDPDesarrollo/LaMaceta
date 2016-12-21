<?php

include_once 'Usuario.php';
include_once 'JWT.php';
include_once 'ExpiredException.php';
include_once 'BeforeValidException.php';
include_once 'SignatureInvalidException.php';


$dataPost = file_get_contents("php://input");
$request = json_decode($dataPost);

$objDatos=json_decode(file_get_contents("php://input"));


try {
	//$elUsuario = new usuario();
	$elUsuario=$user::fijateSiEstaElUser($objDatos->nombre,$objDatos->mail);

} catch (Exception $e) {
					echo $e->getMessage();
}


//
//echo json_encode($elUsuario);
//1-tomo datos del http
//2-verifico con un metodo de la clase usuario si son datos validos
//3-de ser validos creo el token y lo retorno

//deberia ejecutar una funcion de php que me dice si el usuario existe o no
//if ($objDatos->nombre=="pepito" && $objDatos->mail=="pepito@pepito.com") {


if(isset($elUsuario))
{

	try 
	{
			$token=array(
			"id"=> $elUsuario->id,
			"nombre"=> $elUsuario->nombre,
			"mail"=> $elUsuario->mail,

			"exp"=>time()+9600
			);

			$token=Firebase\JWT\JWT::encode($token,'29jackkeylo92');
			//token ya terminado
			$array['tokenMascota2016']=$token;

			echo json_encode($array);

	} 
	catch (Exception $e) 
	{
		echo json_encode($e->getMessage());
	}


}
else
{
	try 
	{
				$token=array(
				"id"=>"natalia",
				"nombre"=>"natalia",
				"perfil"=>"trucho",
				"exp"=>time()-9600
				);

				$token=Firebase\JWT\JWT::encode($token,'29jackkeylo92');
				//token ya terminado
				$array['tokenMascota2016']=$token;

				echo json_encode($array);
	} 
	catch (Exception $e) 
	{
		echo json_encode($e->getMessage());
	}
	
}



?>