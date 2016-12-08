<?php

require '../PHPMailer/PHPMailerAutoload.php';

include __DIR__ ."..\..\doctrine_config/doctrine-cfg.php";
include __DIR__ . '..\..\entities\SaleState.php';
include __DIR__ . '..\..\entities\Sale.php';
include __DIR__ . '..\..\entities\State.php';
include __DIR__ . '..\..\entities\User.php';
include __DIR__ . '..\..\entities\UserType.php';
include __DIR__ . '..\..\entities\BlacklistDetail.php';
include __DIR__ . '..\..\entities\Address.php';
include __DIR__ . '..\..\entities\CreditCard.php';
include __DIR__ . '..\..\entities\Province.php';
include __DIR__ . '..\..\entities\BankCard.php';
include __DIR__ . '..\..\entities\Bank.php';
include __DIR__ . '..\..\entities\Card.php';

$dataPost = file_get_contents("php://input");
$request = json_decode($dataPost);


switch($request->data->action){

	case 'getAllSales':
		$connection = $entityManager->getConnection();
		$statement = $connection->prepare('	SELECT
				S.ID as id,	
				S.SALE_NUMBER as saleNumber, 
				S.DATE as saleDate, 
				STATE.DESCRIPTION as state, 
				S.PRICE as price, 
				USER.ID as userId
				FROM SALE S INNER JOIN USER ON S.ID_USER = USER.ID
				INNER JOIN SALE_STATE ST ON ST.ID_SALE = S.ID 
									AND ST.LAST_UPDATE = (SELECT MAX(LAST_UPDATE) FROM SALE_STATE ST WHERE ST.ID_SALE = S.ID)
				INNER JOIN STATE ON ST.ID_STATE = STATE.ID');
		$statement->execute();

		$sales = $statement->fetchAll();

		echo(json_encode($sales));
		break;

	case 'editSale'://se llama edit sale pero en realidad crea un SaleState nuevo en la bd

		$sale = $request->data->sale;
		$state = $request->data->newState;

		if($request->data->newState == 3){
			$motive = $request->data->motive;
		}else{
			$motive = "FINALIZADO";
		}

		$dia = new DateTime();
		$dia = $dia->format('Y-m-d H:i:s');

		$connection = $entityManager->getConnection();
		$statement = $connection->prepare("INSERT INTO sale_state (active, id_sale, id_state, last_update, motive) VALUES (1,".$sale->id.",".$state.",'".$dia."','".$motive."')");
		$statement->execute();

		//si es rechazado
		if($request->data->newState == 3){

			$theSale = $entityManager->find('Sale', $sale->id);
			$theUser = $entityManager->find('User', $theSale->idUser->id);

			//agrego un blacklist detail
			$newBlacklistDetail = new BlacklistDetail();
			$newBlacklistDetail->setActive(true);
			$newBlacklistDetail->setIdUser($theUser);
			$newBlacklistDetail->setIdSale($theSale);
			$entityManager->persist($newBlacklistDetail);

			//reviso si ese user ya tiene un envio rechazado. si tiene significa que el que estoy por agregar ahora es el segundo
			//entonces lista negra
			$userBlacklistDetail = $entityManager->getRepository('BlacklistDetail')->findBy(array('idUser' => $theUser->id, 'active' => true));
			
			if(count($userBlacklistDetail)>=1){
				$theUser->setBlacklist(true);
				$entityManager->persist($theUser);
			}

			$entityManager->flush();


			//mando el mail independientemente si esta en lista negra o no, de ahi a que pueda cambiarlo
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

			$mail->addAddress($theUser->email);

			$bodyContent = "<br><br> Debe dirigirse a: http://localhost/www/LaMaceta/theme/my-account.html para solicitar un nuevo envio. ";
			$bodyContent .= "Eso solamente es posible si no ha sido puesto en nuestra lista negra (se entra a ella teniendo dos envíos rechazados)";

			$mail->Subject = 'Usted no ha recibido el pedido #'.$theSale->id;
			$mail->Body    = $bodyContent;

			if(!$mail->send()) {
			    echo 'Message could not be sent.';
			    echo 'Mailer Error: ' . $mail->ErrorInfo;
			} else {
			    echo 'Message has been sent';
			}
		}
		

		break;
}
