<?php
	$id = $_REQUEST["id_item"];
   // Edit upload location here
   $destination_path = getcwd()."/img/fotos/";

   $result = 0;
   
   $target_path = $destination_path . basename( $_FILES['myfile']['name']);
   $resultado="../img/ajaxupload/img/fotos/". basename( $_FILES['myfile']['name']);

   if(@move_uploaded_file($_FILES['myfile']['tmp_name'], $target_path)) {
      $result = $resultado;
   }
   sleep(1);
?>

<script language="javascript" type="text/javascript">window.top.window.stopUpload(<?php echo json_encode(array("success"=>$result,"nombreItem"=>$id)); ?>);</script>   
