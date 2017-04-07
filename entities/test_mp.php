<?php 
include("Payment.php");

$test = new mPay();
$result = $test->SearchCollection("2668300515");
echo(json_encode($result));


 ?>