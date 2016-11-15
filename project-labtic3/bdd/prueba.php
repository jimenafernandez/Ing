<?php
// Lab TIC 3 : Script de prueba
session_start();
require('./Conexion.php');

$db= new Conexion('ksdatabase');
$tableName='categoria';
$queryParam='(1,\'bebidas\')';
echo $queryParam;
// $query= 'INSERT INTO '.$tableName.' VALUES ('.$queryParam.');';
// $db->consultaSinRetorno($query);
$res=$db->consulta('SELECT * FROM categoria;');
$resultado = array();
$item=$db->getNextResultado($res);
while(!is_null($item)){
	array_push($resultado, $item);
	$item=$db->getNextResultado($res);
}
echo json_encode($resultado);
?>