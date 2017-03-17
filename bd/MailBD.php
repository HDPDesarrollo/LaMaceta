<?php

require '../PHPMailer/PHPMailerAutoload.php';

include __DIR__ ."../../doctrine_config/doctrine-cfg.php";
include __DIR__ . '../../entities/Article.php';
include __DIR__ . '../../entities/Color.php';
include __DIR__ . '../../entities/Product.php';
include __DIR__ . '../../entities/Size.php';
include __DIR__ . '../../entities/User.php';
include __DIR__ . '../../entities/UserType.php';
include __DIR__ . '../../entities/Season.php';
include __DIR__ . '../../entities/Provider.php';

include __DIR__ . '../../entities/Sale.php';
include __DIR__ . '../../entities/DetailSale.php';

$dataPost = file_get_contents("php://input");
$request = json_decode($dataPost);


$mail = new PHPMailer;

$mail->isSMTP();                  
$mail->Host = 'smtp.gmail.com';
$mail->SMTPAuth = true;
$mail->Username = 'lamaceta1234@gmail.com';   
$mail->Password = 'LA_MACETA';
$mail->SMTPSecure = 'tls';
$mail->Port = 25;
$mail->setFrom('admin@lamaceta.com', 'LaMaceta');
$mail->isHTML(true);
$mail->SMTPOptions = array(
    'ssl' => array(
        'verify_peer' => false,
        'verify_peer_name' => false,
        'allow_self_signed' => true
    )
);

switch($request->data->action){

	case 'mailMinStock':
		$theAdmin =  $entityManager->getRepository("User")->findOneBy(array("idUserType" => 3));
		$mail->addAddress($theAdmin->email);

		$theArticle = $entityManager->find('Article', $request->data->idArticulo);

		$bodyContent = '<h1>Stock bajo de:</h1>';
		$bodyContent .= "Producto: ".$theArticle->idProd->name;
		$bodyContent .= "<br>Color: ".$theArticle->idColor->color;
		$bodyContent .= "<br>Talle: ".$theArticle->idSize->size;
		$bodyContent .= "<br><br>El stock ha bajado del valor minimo que es de ".$theArticle->minStock." productos";

		$mail->Subject = 'Stock bajo de '.$theArticle->idProd->name.", color ".$theArticle->idColor->color.", talle ".$theArticle->idSize->size;
		$mail->Body    = $bodyContent;
		break;

	case 'mailDetailCheckout':

		$connection = $entityManager->getConnection();
		$statement = $connection->prepare("	SELECT *
				FROM sale s WHERE s.id =".$request->data->idSale);
		$statement->execute();

		$theSale = $statement->fetchAll();

		$theUser = $entityManager->find('User', $theSale[0]["id_user"]);
		$mail->addAddress($theUser->email);

		$statement = $connection->prepare("	SELECT *
		FROM DETAIL_SALE DS WHERE ds.id_sale =".$request->data->idSale);
		$statement->execute();

		$detail = $statement->fetchAll();

		//echo(var_dump($detail));

		$bodyContent = '<b>Su compra ha sido efectuada de manera correcta, gracias por elegir La Maceta.</b><br><br>';
		$bodyContent .= '<h2>Detalle de compra: #'.$theSale[0]["sale_number"].'</h2>';
		
		$bodyContent .= "<table>
						  <tr>
						    <th>Producto</th>
						    <th></th>
						    <th>Cantidad</th>
						  </tr>";
		
		for ($i=0; $i < sizeof($detail); $i++) { 

			$id = $detail[$i]["id_article"];
			$article= $entityManager->find('Article', $id);

			$bodyContent .= "<tr>";
			$bodyContent .= "<td>".$article->idProd->name." ".$article->idColor->color." ".$article->idSize->size."</td>";
			$bodyContent .= "<td></td>";
			$bodyContent .= "<td style='text-align:right'>".$detail[$i]["quantity"]."</td>";
			$bodyContent .= "</tr>";
		}

		$bodyContent .= '</table>';
		$bodyContent .= '<h2>Costo total: $'.$theSale[0]["price"].'</h2>';

		//cuando haya columna impuestos o shipping cost
		//$bodyContent .= '<h2>Costo total: $'.$theSale[0]["shipping_cost"].'</h2>';


		$mail->Subject = 'DETALLE COMPRA #'.$theSale[0]["sale_number"];
		$mail->Body    = $bodyContent;
		break;
}		

if(!$mail->send()) {
		    echo 'Message could not be sent.';
		    echo 'Mailer Error: ' . $mail->ErrorInfo;
		} else {
		    echo 'Message has been sent';
		}