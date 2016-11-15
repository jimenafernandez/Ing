<?php
// Lab TIC 3 : Script de prueba
// Se inicia la sesion
session_start();
// Se agarra el query de js (habria que revisar sql_injection)
$queryParam=$_REQUEST['query'];
$tableName = $_REQUEST['table']; // En el caso de insert tambien columnas
$opt=$_REQUEST['opt'];
// se agarra un conexion

require('./Conexion.php');
$nameSchema='ksdatabase';
$db = new Conexion($nameSchema);

if($opt==1){ // select_all
$query='SELECT * FROM '.$tableName.';';
$respuesta=$db->consulta($query); //dejarlo funcional en js

$resultado = array();

$res=$db->getNextResultado($respuesta);

while(!is_null($res)){
	array_push($resultado, $res);
	$res=$db->getNextResultado($respuesta);
}
// ver el resultado en js
echo json_encode($resultado);

}elseif($opt==0){ // insert
// echo $queryParam;
$query= 'INSERT INTO '.$tableName.' VALUES '.$queryParam.';';
$db->consultaSinRetorno($query);

}elseif($opt==2){ // select_where

$query='SELECT * FROM '.$tableName.'WHERE id = '.$queryParam.';';
$respuesta=$db->consulta($query); //dejarlo funcional en js

$resultado = array();

$res=$db->getNextResultado($respuesta);

while(!is_null($res)){
	array_push($resultado, $res);
	$res=$db->getNextResultado($respuesta);
}
// ver el resultado en js
echo json_encode($resultado);
}elseif($opt==3){
	$query='DELETE FROM '.$tableName.'WHERE id = '.$queryParam.';';
	$db->consultaSinRetorno($query);

}elseif($opt==4){ // Agregar foto a item
	$query='UPDATE item SET rutaFoto='.$tableName.' WHERE nombre='.$queryParam.';';
	$db->consultaSinRetorno($query);

}else if($opt==5){
	$qPrecio=$_REQUEST['qPrecio'];
	$qNombre=$_REQUEST['qNombre'];
	$qCat=$_REQUEST['qCat'];
	$query='UPDATE item SET nombre='.$qNombre.',precio='.$qPrecio.',id_cat='.$qCat.' WHERE id='.$tableName.';';
	$db->consultaSinRetorno($query);	
}
?>