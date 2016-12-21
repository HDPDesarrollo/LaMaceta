<?php
/*
use Doctrine\ORM\Tools\Setup;
use Doctrine\ORM\EntityManager;

require_once __DIR__.'/../vendor/autoload.php';
require_once __DIR__.'/../config/config.php';

$entitiesPath = array(__DIR__.'/entities');

$config = Setup::createAnnotationMetadataConfiguration($entitiesPath, $dev);
$entityManager = EntityManager::create($dbParams, $config);
*/


use Doctrine\ORM\Tools\Setup;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\Mapping\Driver\AnnotationDriver;
use Doctrine\Common\Annotations\AnnotationReader;
use Doctrine\Common\Annotations\AnnotationRegistry;

require_once __DIR__ . '/../bower_components/vendor/autoload.php';
require_once __DIR__.'/config.php';
//require_once __DIR__ . '/entities/Users.php';

$paths = array(__DIR__ . '../entities');

$config = Setup::createConfiguration($dev);
$driver = new AnnotationDriver(new AnnotationReader(), $paths);

// registering noop annotation autoloader - allow all annotations by default
AnnotationRegistry::registerLoader('class_exists');
$config->setMetadataDriverImpl($driver);

$entityManager = EntityManager::create($dbParams, $config);