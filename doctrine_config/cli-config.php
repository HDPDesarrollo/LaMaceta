<?php
//Configuracion del CLI de Doctrine
//Dependencia del objeto ConsoleRunner
use Doctrine\ORM\Tools\Console\ConsoleRunner;

//Incluimos el bootstrap para obtener el 'Entity Manager'
require_once __DIR__.'/doctrine-cfg.php';

//Devolvemos el objeto HelperSet de la consola
return ConsoleRunner::createHelperSet($entityManager);
