<?php

use Doctrine\ORM\Tools\Setup;
use Doctrine\ORM\EntityManager;
//Configuracion de la aplicacion
//Acceso a la BD
$dbParams = [
	'driver' => 'pdo_mysql',
	'host' => '127.0.0.1',
	'dbname' => 'lamaceta',
	'user' =>'root',
	'password' => ''
];
//Estamos en modo desarrollo?
$dev = true;
$config = Setup::createAnnotationMetadataConfiguration(array(__DIR__."../entities"), $dev, null, null, false);
