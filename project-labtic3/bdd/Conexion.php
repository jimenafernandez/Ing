<?php
// Lab TIC 3 : Script de conexión a la base de datos
class conexion extends SQLite3{
    function __construct($name/*archivo de extención .db*/){
        $this->open($name); // $nombre = nombreSchema.db
    }

    function consultaSinRetorno($query){ 
    	$this->exec($query); // exec no devuleve ningun resultado
    }

    function consulta($query){
    	$resultado = $this->query($query);
    	return $resultado; // para ver resultado hacer getNextResultado
    }

    function getNextResultado($resultado){
    	if ($row = $resultado->fetchArray()){
    		return $row;
		}else{
			return null; // devuleve nulo -> OJO
		}
    }
}

?>