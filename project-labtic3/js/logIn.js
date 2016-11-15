function logIn(i=0){
	if (i==1){
		document.getElementById("list").innerHTML='<object type="text/html" data="register.html" ></object>';
	}else{
		document.getElementById("list").innerHTML='<object type="text/html" data="../register.html" ></object>';
	}
}

function loginWindow(abrir){
	if(abrir){
		document.getElementById('login-form').style.display = 'block';
	}else{
		document.getElementById('login-form').style.display = 'none';
	}
}

function newItemWindow(abrir){
	if(abrir){
		document.getElementById('newUser-form').style.display = 'none';
		document.getElementById('deleteUser-form').style.display = 'none';
		document.getElementById('newItem-form').style.display = 'block';
	}else{
		document.getElementById('newItem-form').style.display = 'none';
	}
}


function newUserWindow(abrir){
	if(abrir){
		document.getElementById('deleteUser-form').style.display = 'none';
		document.getElementById('newItem-form').style.display = 'none';
		document.getElementById('newUser-form').style.display = 'block';
	}else{
		document.getElementById('newUser-form').style.display = 'none';
	}
}

function deleteUserWindow(abrir){
	if(abrir){
		document.getElementById('newUser-form').style.display = 'none';
		document.getElementById('newItem-form').style.display = 'none';
		document.getElementById('deleteUser-form').style.display = 'block';
	}else{
		document.getElementById('deleteUser-form').style.display = 'none';
	}
}

function confirmChange(abrir,nombre){
	if(abrir){
		/*Se muestra imagen de cambio*/
		var div = document.createElement('div');
		div.id="changeItem-form&"+nombre;
		div.innerHTML="<div class=\"container pull-center\" style=\"position:absolute;width: 400px;height: auto;background-color:white\" >"
		+"<fieldset>"
            +"<span id=\"cerrar\" title=\"Cerrar\" onclick=\"confirmChange(false,\'"+nombre+"\');\">&times;</span>"
		    +"<form action=\"javascript:confirmChangeItem(\'"+nombre+"\');\">"
        		+"<legend>Cambiar Articulo</legend>"
				+"<label>Nombre</label>"
				+"<input id=\"itemNameChange&"+nombre+"\" class=\"campo\" type=\"text\" value=\'"+nombre+"\'>"
				+"<br>"
				+"<br>"
				+"<label>Precio</label>"
				+"<input id=\"itemPriceChange&"+nombre+"\" class=\"campo\" type=\"text\" value=0>" 
				+"$"+"<br>"
				+"<br>"
				+"<label>Categoria</label>"
  				+"<select id=\"itemCatChange&"+nombre+"\" class=\"selectpicker\">"
    				+"<option value=\"snacks\">Snacks</option>"
    				+"<option value=\"almuerzo\">Almuerzo</option>"
    				+"<option value=\"bebidas\">Bebidas</option>"
    				+"<option value=\"otros\">Otros</option>"
    			+"</select>"
				+"<br>"
				+"<br>"
				+"<input class=\"boton\" type=\"submit\" value=\"Ingresar\">"
            +"</form>"
		+"</fieldset>";		
		document.getElementById('cuerpo').appendChild(div);
		document.getElementById('newUser-form').style.display = 'none';
		document.getElementById('newItem-form').style.display = 'none';
		document.getElementById('deleteUser-form').style.display = 'none';
		document.getElementById('changeItem-form&'+nombre).style.display = 'block';
	}else{
		document.getElementById('changeItem-form&'+nombre).style.display = 'none';
	}
}

function confirmLogin(){
	var user=document.getElementById('user');
	var pass=document.getElementById('pass');
	$.ajax({
		url:"./bdd/queryInterface.php?table='usuario'&query=2&opt=1",
		async:false,
		success: function(input){
		var obj=$.parseJSON(input);
		var arr = $.map(obj, function(el) { return el });
		var ctrl = false;
		$.each(arr,function(index,elem){
			if((user.value =="admin" && pass.value =="admin")||(user.value == elem["usuario"] && pass.value == elem["pass"])){
				ctrl = true;
			}
		});
		if(ctrl){
			location.href = "vista-empleado_con-tablas.html"
		}else{
			alert("ACCESO DENEGADO: usuario y/o contrasena invalida")
		}
		}
	});	
}

function confirmCreate(){
	var nombreItem= document.getElementById("itemName").value;
	var precioItem= document.getElementById("itemPrice").value;
	var categoriaItem =document.getElementById("itemCat").value;
	if(nombreItem!=null&&nombreItem!=undefined&&nombreItem!=""&&precioItem!=null&&precioItem!=""&&precioItem!=undefined){
		crearItem(precioItem,nombreItem,"NULL"/*rutaFoto*/,categoriaItem);
	}else{
		alert("Por favor complete todos los campos");
	}
}
function confirmDelete(nombreItem){
	var borrar=confirm("Desea borrar "+nombreItem);
	if(borrar){
		borrarItem(nombreItem);
	}
}

function confirmChangeItem(nombreItemOld){
	var nombreItem= document.getElementById("itemNameChange&"+nombreItemOld).value;
	var precioItem= document.getElementById("itemPriceChange&"+nombreItemOld).value;
	var categoriaItem =document.getElementById("itemCatChange&"+nombreItemOld).value;
	if(nombreItem!=null&&nombreItem!=undefined&&nombreItem!=""&&precioItem!=null&&precioItem!=""&&precioItem!=undefined){
		changeItem(precioItem,nombreItem,nombreItemOld,categoriaItem);
	}else{
		alert("Por favor complete todos los campos");
	}}

function confirmCreateUser(){
	var nombreUser= document.getElementById("userName").value;
	var passUser= document.getElementById("userPass").value;
	var passConf =document.getElementById("userPassConf").value;
	if(nombreUser!=null&&nombreUser!=undefined&&nombreUser!=""&&passUser!=null&&passUser!=""&&passUser!=undefined&&passUser==passConf){
		crearUsuario(nombreUser,passUser);
	}else if(passUser!=passConf){
		alert("Verifique que las contrasenas coincidan");
	}else{
		alert("Por favor complete todos los campos");
	}
}

function confirmDeleteUser(){
	var nombreUser= document.getElementById("userNameDelete").value;
	var borrar=confirm("Desea borrar al usuario "+nombreUser);
	if(borrar){
		borrarUsuario(nombreUser);
	}
}

// Para cargar Imagen
function startUpload(){
      document.getElementById('f1_upload_process').style.visibility = 'visible';
      document.getElementById('f1_upload_form').style.visibility = 'hidden';
      return true;
}

function stopUpload(data){
      var result = '';
      if (data != null){
		var arr = $.map(data, function(el) { return el });
		// alert(arr[0]);
        cambiarItemFoto(arr[1],arr[0]); // Nombre, Ruta
        result = '<span class="msg">La imagen se ha subido correctamente!<\/span><br/><br/>';
      }
      else {
         result = '<span class="emsg">Ha ocurrido un error!<\/span><br/><br/>';
      }
      document.getElementById('f1_upload_process').style.visibility = 'hidden';
      document.getElementById('f1_upload_form').innerHTML = result + '<label>Archivo: <input name="myfile" type="file" size="30" /><\/label><label><input type="submit" name="submitBtn" class="sbtn" value="Subir" /><\/label>';
      document.getElementById('f1_upload_form').style.visibility = 'visible';      
      return true;   
}

function confirmImage(nombreItem,data){
	if(!data.ctrl){
			var div = document.createElement("div");
			div.id="subirFoto";
			div.className="container";
			div.innerHTML="<fieldset>"+
            "<div id=\"header\"><div id=\"header_left\"></div>"+
            "<div id=\"header_main\">Max's AJAX File Uploader</div><div id=\"header_right\"></div></div>"+
            "<div id=\"content\">"+
                "<form action=\"./img/ajaxupload/upload.php?id_item='"+nombreItem+"'\" method=\"post\" enctype=\"multipart/form-data\" target=\"upload_target\" onsubmit=\"startUpload();\" >"+
                     "<p id=\"f1_upload_process\">Loading...<br/><img src=\"./img/ajaxupload/loader.gif\" /><br/></p>"+
                     "<p id=\"f1_upload_form\" align=\"center\"><br/>"+
                         "<label>Archivo:"+  
                              "<input name=\"myfile\" type=\"file\" size=\"30\" />"+
                         "</label>"+
                         "<label>"+
                             "<input type=\"submit\" name=\"submitBtn\" class=\"sbtn\" value=\"Subir\" />"+
                         "</label>"+
                     "</p>"+
                     
                     "<iframe id=\"upload_target\" name=\"upload_target\" src=\"#\" style=\"width:0;height:0;border:0px solid #fff;\"></iframe>"+
                 "</form>"+
             "</div>"+
             "<div id=\"footer\"><a href=\"http://www.ajaxf1.com\" target=\"_blank\">Powered by AJAX F1</a></div>"+
         "</fieldset>";
         document.getElementById("cuerpo").appendChild(div);
         document.getElementById('subirFoto').style.display = 'block';
         data.ctrl=true;
         }
}