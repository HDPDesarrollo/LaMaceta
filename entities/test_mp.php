<?php 
include("Payment.php");

$test = new mPay();
$result = $test->SearchCollection("2903798211");
echo(json_encode($result));


 ?>