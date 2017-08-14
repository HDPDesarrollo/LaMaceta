<?php

require '../PHPMailer/PHPMailerAutoload.php';

include __DIR__ . '../../doctrine_config/doctrine-cfg.php';
include __DIR__ . '../../entities/User.php';
include __DIR__ . '../../entities/UserType.php';
include __DIR__ . '../../entities/ResetPassword.php';

// TOKEN ------
include('../PHP/Clases/JWT.php');
include('../PHP/Clases/ExpiredException.php');
include('../PHP/Clases/BeforeValidException.php');
include('../PHP/Clases/SignatureInvalidException.php');
// ------------

$dataPost = file_get_contents("php://input");
$request = json_decode($dataPost);


switch($request->data->action){

	case 'getAllUsers':
		$users =  $entityManager->getRepository("User")->findAll();
		//var_dump($addresses);

		echo(json_encode($users));
		break;

	case 'verifyToken':
		$reset = $entityManager->getRepository('ResetPassword')->findOneBy(array('token' => $request->data->token));
		if(isset($reset->token) && isset($reset->id_user)){
			echo json_encode("true");
		}else{
			echo json_encode("false");
		}
		break;

	case 'createUser':
		$newUser = new User();
		$newUser->setActive(true);
		$newUser->setBlacklist(false);
		$newUser->setEmail($request->data->user->email);
		$emailUser = $request->data->user->email;
		$newUser->setPassword(md5($request->data->user->password));
		$newUser->setBirthDate(new DateTime());//$request->data->user->birthDate
		$newUser->setGender($request->data->user->gender);
		$newUser->setName($request->data->user->name);
		$newUser->setSurname($request->data->user->surname);

		$userType= $entityManager->find('UserType', 1);
		$newUser->setIdUserType($userType);

		$entityManager->persist($newUser);
		$entityManager->flush();

		$users =  $entityManager->getRepository("User")->findAll();
		echo(json_encode($users));
		break;

	case 'resetPassword':
		try{
			$theUser = $entityManager->getRepository('user')->findOneBy(array('email' => $request->data->user));

			if(isset($theUser->email)){
				$cadena = $theUser->name.$theUser->email.rand(1,9999999).date('Y-m-d');
				$token = sha1($cadena);

				$mail = new PHPMailer;

				$mail->isSMTP();                            // Set mailer to use SMTP
				$mail->Host = 'smtp.gmail.com';             // Specify main and backup SMTP servers
				$mail->SMTPAuth = true;                     // Enable SMTP authentication
				$mail->Username = 'lamaceta1234@gmail.com';          // SMTP username
				$mail->Password = 'LA_MACETA'; // SMTP password
				$mail->SMTPSecure = 'tls';                  // Enable TLS encryption, `ssl` also accepted
				$mail->Port = 25;                          // TCP port to connect to

				$mail->setFrom('admin@lamaceta.com', 'LaMaceta');
				//$mail->addReplyTo('info@codexworld.com', 'CodexWorld');
				$mail->addAddress($theUser->email);   // Add a recipient
				//$mail->addCC('cc@example.com');
				//$mail->addBCC('bcc@example.com');

				$mail->isHTML(true);  // Set email format to HTML

				$enlace = $_SERVER["SERVER_NAME"].'/www/PPS2/LaMaceta/theme/reset-password.html?token='.$token;

				$bodyContent = '<h1>Ingrese a este link para cambiar su password:</h1>';
				$bodyContent .= $enlace;

				$mail->Subject = 'Recuperar password';
				$mail->Body    = $bodyContent;

				if(!$mail->send()) {
				    echo 'Message could not be sent.';
				    echo 'Mailer Error: ' . $mail->ErrorInfo;
				} else {
				    echo 'Message has been sent';
				}

				$newResetPassword = new ResetPassword();

				$oneUser= $entityManager->find('User', $theUser->id);
				$newResetPassword->setIdUser($oneUser);

				$newResetPassword->setToken($token);

				$entityManager->persist($newResetPassword);
				$entityManager->flush();
				echo json_encode("true");
			}else{
				echo json_encode("false");
			}
		}catch(Exception $e){
			echo $e;
		}

		break;
	
	case 'doTheReset':
		try{
			$reset = $entityManager->getRepository('ResetPassword')->findOneBy(array('token' => $request->data->token));
			if(isset($reset->token)){
				$user= $entityManager->find('User', $reset->idUser->id);

				$user->setPassword(md5($request->data->password));

				$entityManager->persist($user);
				$entityManager->remove($reset);

				$entityManager->flush();
				echo json_encode("true");
		}else{
			echo json_encode("false");
		}

		}catch(Exception $e){
			echo json_encode($e);
		}
		break;

	case 'verifyEmail':
		$user = $entityManager->getRepository('user')->findOneBy(array('email' => $request->data->email));
		if(isset($user)){
			echo true;
		}else{
			echo false;
		}
		break;

	case 'doLogin':
		$user = $entityManager->getRepository('user')->findOneBy(array('email' => $request->data->email,'password'=>md5($request->data->password)));
		// $request->data->password = md5($request->data->password);
		// echo json_encode($user);
		if(isset($user)){

				// echo(json_encode(true));

			$token=array(
			"id"=> $user->id,
			"name"=> $user->name,
			"mail"=> $user->email,
			"idUserType"=> $user->idUserType,
			"exp"=>time()+9600,
			"birthDate" => $user->birthDate
			);

			$token=Firebase\JWT\JWT::encode($token,'29jackkeylo92');
			//token ya terminado
			$array['tokenMaceta']=$token;

			echo json_encode($array);

			
		}else{
			echo(json_encode(false));
		}
		break;
}		