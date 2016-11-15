<?php
// Lab TIC 3 : Script de prueba
session_start();
require('./Conexion.php');
$nameSchema='ksdatabase';
$db= new Conexion($nameSchema); // Nombre del schema
// Primero: Eliminar las tablas
$db->consultaSinRetorno('DROP TABLE IF EXISTS categoria');
$db->consultaSinRetorno('DROP TABLE IF EXISTS item');
$db->consultaSinRetorno('DROP TABLE IF EXISTS usuario');
// Segundo: Crear tablas
$db->consultaSinRetorno('CREATE TABLE categoria (id INTEGER PRIMARY KEY AUTOINCREMENT, nombre VARCHAR(100));');
$db->consultaSinRetorno('CREATE TABLE item (id INTEGER PRIMARY KEY AUTOINCREMENT, precio VARCHAR(100),nombre VARCHAR(100), rutaFoto VARCHAR(100), id_cat INTEGER, FOREIGN KEY (id_cat) REFERENCES categoria(id));');
$db->consultaSinRetorno('CREATE TABLE usuario (id INTEGER PRIMARY KEY AUTOINCREMENT, usuario VARCHAR(100), pass VARCHAR(100));');

// CREAR TODAS LAS CATEGORIAS -> NO VA A EXISTIR AGREGAR CAT. EN PRINCIPIO
$db->consultaSinRetorno('INSERT INTO categoria VALUES (NULL,\'otros\');');
$db->consultaSinRetorno('INSERT INTO categoria VALUES (NULL,\'bebidas\');');
$db->consultaSinRetorno('INSERT INTO categoria VALUES (NULL,\'snacks\');');
$db->consultaSinRetorno('INSERT INTO categoria VALUES (NULL,\'almuerzo\');');

echo "DONE";

?>