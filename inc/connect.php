<?php

require __DIR__ . '/dbs-config.php';

// -------------------------------------------
// ### CONNECTING TO THE DATABASE ###
// -------------------------------------------

$dataSourceName = "mysql:host=$host;dbname=$database;charset=UTF8";

try{
    // => create a new pdo object
    $pdo = new PDO($dataSourceName, $user, $password, [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);
}
catch(PDOException $e){
    echo 'Sorry bro, Probleme mit der Datenbank...';
    echo $e->getMessage();
    die();
}