<?php

$user = "";
$pass = "";

if($_SERVER["REQUEST_METHOD"] == "POST"){
  $user = $_POST["user"];
  $pass = $_POST["pass"];

  echo $user;
  echo $pass;
}

 ?>
