
<h1>Consultas </h1>

<form id="FormIngreso" method="post" name="FormIngreso" style="display:block;margin-left:107px;">
<div>
<input  style="width:97%;border:1px solid #000;" type="text" name="nombre" placeholder="Nombre y Apellido..." required>
</div>

<div>
<input  style="width:97%;border:1px solid #000;" type="email" name="mail" placeholder="Dejanos tu mail..." required>
</div>

<div>
<input  style="width:97%;border:1px solid #000;" type="tel" name="telefono" placeholder="Teléfono...">
</div>

<div>
<textarea  style="min-height: 126px;width:97%;border:1px solid #000;" name="body" placeholder="Ingresa tu consulta..."></textarea>
</div>

<div>
<input type="submit" class="btn" >

</div>


</form>




<script language="javascript" type="text/javascript">
function confirma(){

alert("Muchas gracias por su consulta...");

}

 

function errorMail(){

alert("Ha ocurrido un error! Inténtelo nuevamente más tarde...");

}

</script>
<?php


function enviarMail($mailC,$body,$nom,$tele) {

require("phpmailer/phpmailer.php");


$mail = new phpMailer(); 
$mail->IsSMTP(); 
$mail->SMTPAuth = true;
$mail->SMTPSecure = "TLS";

//$mail->SMTPDebug = 1;
$mail->Host = "mail.vw000296.ferozo.com"; 
$mail->Port = 587;
$mail->SetFrom("consultas@mazinmobiliaria.com.ar","Contacto"); 
$mail->Username = "consultas@mazinmobiliaria.com.ar";
$mail->Password = "Papafritas45";
$mail->AddAddress("matydoto@gmail.com");

$mail->AddAddress("mazinmobiliaria@gmail.com");

$mail->Subject = "Contacto Clientes"; 
$mail->Body = "Nombre: $nom \n\nTelefono: $tele \n\nMail: $mailC \n\nConsulta: \n\n$body"; 
$mail->WordWrap = 50; 
if($mail->Send()){

?>

<script language="javascript" type="text/javascript">

confirma();


</script>

 

<?php

}else{ echo "Ha ocurrido un error. Refresque la página. Muchas gracias. " . $mail->ErrorInfo;

?>

<script language="javascript" type="text/javascript">

errorMail();


</script>

<?php

}

}


if (isset($_POST['mail'])) {
$mailCliente = trim($_POST['mail']);
$cuerpoDelMail = trim($_POST['body']);
$nombre = trim($_POST['nombre']);
$telefono = trim($_POST['telefono']);
enviarMail($mailCliente,$cuerpoDelMail,$nombre,$telefono); 
}


?>
