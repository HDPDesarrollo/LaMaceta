<?php
require_once 'PHPMailer/PHPMailerAutoload.php';

	$Datos= file_get_contents("php://input"); 
	 $DatosMail = json_decode($Datos);
    // $datosdevuelta = json_encode($DatosMail);
   // echo $Datos;


// if (isset($DatosMail->data->name) && isset($DatosMail->data->email) && isset($DatosMail->data->asunto) && isset($DatosMail->data->mensaje)) {
if (isset($DatosMail->data->name) && isset($DatosMail->data->email) && isset($DatosMail->data->asunto) && isset($DatosMail->data->mensaje)) {
//     //check if any of the inputs are empty
    if (empty($DatosMail->data->name) || 
        empty($DatosMail->data->email) || 
        empty($DatosMail->data->asunto) || 
        empty($DatosMail->data->mensaje)) {
        $data = array(
                            'success' => false, 
                            'message' => 'Please fill out the form completely.'  );
        echo json_encode($data);
        exit;
    }

    //create an instance of PHPMailer
    $mail = new PHPMailer();

    //$mail->IsSMTP(); 
    $mail->Mailer = "smtp";
    $mail->SMTPAuth = true;
    //$mail->SMTPSecure = "TLS";
    //$mail->SMTPSecure = "SSL";
    //$mail->SMTPDebug = 1;
    $mail->Host = "tls://smtp.gmail.com:587"; 
    //$mail->Port = 465;
    //$mail->Port = 587;
    $mail->SetFrom("matydoto@gmail.com","Contacto"); 
    $mail->Username = "matydoto@gmail.com";
    $mail->Password = "Suresh427586";


    $mail->From = $DatosMail->data->email;
    $mail->FromName = $DatosMail->data->name;
    $mail->AddAddress("matydoto@hotmail.com"); //recipient 
    $mail->Subject = $DatosMail->data->asunto;
    $mail->Body = "Name: " . $DatosMail->data->name . "\r\n\r\nMessage: " . stripslashes($DatosMail->data->mensaje);

    // if (isset($_POST['ref'])) {
    //     $mail->Body .= "\r\n\r\nRef: " . $_POST['ref'];
    // }

    if(!$mail->send()) {
        $data = array('success' => false, 'message' => 'Message could not be sent. Mailer Error: ' . $mail->ErrorInfo);
        echo json_encode($data);
        exit;
    }

    $data = array('success' => true, 'message' => 'Thanks! We have received your message.');
    echo json_encode($data);

 } else {

    $data = array('success' => false, 'message' => 'Please fill out the form completely.');
    echo json_encode($data);

 }




?>