<?php //Ver mati
require '../PHPMailer/PHPMailerAutoload.php';

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
$mail->addAddress('guillesanchezz.-@live.com');   // Add a recipient
//$mail->addCC('cc@example.com');
//$mail->addBCC('bcc@example.com');

$mail->isHTML(true);  // Set email format to HTML

$bodyContent = '<h1>How to Send Email using PHP in Localhost by CodexWorld</h1>';
$bodyContent .= '<p>This is the HTML email sent from localhost using PHP script by <b>CodexWorld</b></p>';

$mail->Subject = 'Recuperar contraseña';
$mail->Body    = $bodyContent;

if(!$mail->send()) {
    echo 'Message could not be sent.';
    echo 'Mailer Error: ' . $mail->ErrorInfo;
} else {
    echo 'Message has been sent';
}

//http://www.codexworld.com/how-to-send-email-from-localhost-in-php/
//https://github.com/PHPMailer/PHPMailer
?>