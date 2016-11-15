function crearItem(sPrecio,sNombre,sRutaFoto,IdCategoria){ // VE SI EXISTE ITEM A PARTIR DEL NOMBRE
$.ajax({
	url: "./bdd/queryInterface.php?table='item'&query=null&opt=1",
	async:false,
	success: function(input){ // check item
	$.ajaxSetup({async:false});
	var exists= false; // no existe -> lo que se devuelve
	var arr; // Array asociativo
	var obj=$.parseJSON(input);

	arr = $.map(obj, function(el) { return el }); // Mapaeo del JSON
	
	$.each(arr,function(index,elem){
		if(elem["nombre"]==sNombre){
			exists=true; // Se lo encontro en la bd
		}
	});
	$.ajax({
		async:false,
		url:"./bdd/queryInterface.php?table='categoria'&query=null&opt=1",
		success: function(input){
				var id=null;
				var obj=$.parseJSON(input);
				var arr = $.map(obj, function(el) { return el }); // Mapaeo del JSON
				$.each(arr,function(index,elem){
					if(elem["nombre"]==IdCategoria){
						id=elem["id"]; // Se lo encontro en la bd	
				}
				});
				insertItem(sPrecio,sNombre,sRutaFoto,id,exists);
		}
		});	
	}
});

}

function insertItem(sPrecio,sNombre,sRutaFoto,nIdCategoria,checkItem){
	if(!checkItem){
			$.post("./bdd/queryInterface.php?table='item'&query=(NULL,'"+sPrecio+"','"+sNombre+"','"+sRutaFoto+"',"+nIdCategoria+")&opt=0"); // insertar item
			location.reload();
		}else{
			alert("Ya existe el artículo "+sNombre+"\nSi desea,borrelo o actualice sus atributos");
		}
	}

function selectItem(nombreItem=undefined,ctrl/*valor por defecto selecciona todo*/){
	$.ajaxSetup({async:false});
	if(nombreItem==undefined){ // Por defecto que devuleva todo
		$.ajax({
		url:"./bdd/queryInterface.php?table='item'&query=2&opt=1",
		async:false,
		success: function(input){
		var obj=$.parseJSON(input);
		var arr = $.map(obj, function(el) { return el });
		return arr;
	}
});		
	}else{ // de lo contrario
			getIdItem(nombreItem,ctrl);
		
	}
}

function getIdItem(nombreItem,ctrl){
	$.ajax({
	url:"./bdd/queryInterface.php?table='item'&query=null&opt=1", 
	async: false,
	success: function(input){
	var id=null; // no existe -> lo que se devuelve
	var obj=$.parseJSON(input);
	var arr = $.map(obj, function(el) { return el }); // Mapaeo del JSON
	
	$.each(arr,function(index,elem){
		if(elem["nombre"]==nombreItem){
			id=elem["id"]; // Se lo encontro en la bd
		}
	});
	if(id == null){
			alert("No se a encontrado el item "+nombreItem);
			ctrl.out=true;
			return ctrl;
	}else{
	// Using ajax
	$.ajax({
		url:"./bdd/queryInterface.php?table='item'&query="+id+"&opt=2",
		async:false,
		success: function(input){
				var obj=$.parseJSON(input);
				ctrl.arr = $.map(obj, function(el) { return el });
				ctrl.out=true;
				return ctrl;
		}
	});
	}
	}
});
}



function borrarItem(nombreItem=undefined){
	$.ajaxSetup({async:false});
	if(nombreItem==undefined){ // Por defecto que devuleva todo
		alert("ERROR: Nombre no definido");		
	}else{ // de lo contrario
			borrarPorNombre(nombreItem);
		
	}
}

function borrarPorNombre(nombreItem){
$.ajax({
	url:"./bdd/queryInterface.php?table='item'&query=null&opt=1",
	async:false,
	success: function(input){
	var id=null; // no existe -> lo que se devuelve
	var obj=$.parseJSON(input);
	var arr = $.map(obj, function(el) { return el }); // Mapaeo del JSON
	$.each(arr,function(index,elem){
		if(elem["nombre"]==nombreItem){
			id=elem["id"]; // Se lo encontro en la bd
		}
	});
	if(id == null){
		alert("No se a encontrado el item "+nombreItem);
	}else{
		$.post("./bdd/queryInterface.php?table='item'&query="+id+"&opt=3");
		location.reload();
	}
}
});
}

function cambiarItemFoto(sNombre,sRutaFoto){
	if(sRutaFoto == null){
		alert("Error");
	}else{
		$.post("./bdd/queryInterface.php?table='"+sRutaFoto+"'&query="+sNombre+"&opt=4");
		location.reload();
	}
}
// Acceso a BDD para usuario

function crearUsuario(sNombre,sPass){
	$.ajax({
	url: "./bdd/queryInterface.php?table='usuario'&query=null&opt=1",
	async:false,
	success: function(input){ // check item
	$.ajaxSetup({async:false});
	var exists= false; // no existe -> lo que se devuelve
	var arr; // Array asociativo
	var obj=$.parseJSON(input);

	arr = $.map(obj, function(el) { return el }); // Mapaeo del JSON
	$.each(arr,function(index,elem){
		if(elem["usuario"]==sNombre){
			exists=true; // Se lo encontro en la bd
		}
	});
		if(!exists && sNombre!='admin'){
			$.post("./bdd/queryInterface.php?table='usuario'&query=(NULL,'"+sNombre+"','"+sPass+"')&opt=0"); // insertar item
			location.reload();
		}else{
			alert("Ya existe el usuario "+sNombre+"\nSi desea,borrelo o actualice sus atributos");
		}
	}
});
}

function borrarUsuario(sNombre){
$.ajax({
	url:"./bdd/queryInterface.php?table='usuario'&query=null&opt=1",
	async:false,
	success: function(input){
	var id=null; // no existe -> lo que se devuelve
	var obj=$.parseJSON(input);
	var arr = $.map(obj, function(el) { return el }); // Mapaeo del JSON
	$.each(arr,function(index,elem){
		if(elem["usuario"]==sNombre){
			id=elem["id"]; // Se lo encontro en la bd
		}
	});
	if(id == null){
		alert("No se a encontrado el usuario "+sNombre);
	}else{
		$.post("./bdd/queryInterface.php?table='usuario'&query="+id+"&opt=3");
		location.reload();
	}
}
});
}


function getIdAll(tabla,nombre){
$.ajax({
		async:false,
		url:"./bdd/queryInterface.php?table='"+tabla+"'&query=null&opt=1",
		success: function(input){
				var obj=$.parseJSON(input);
				var arr = $.map(obj, function(el) { return el }); // Mapaeo del JSON
				$.each(arr,function(index,elem){
					if(elem["nombre"]==nombre){
						var id=elem["id"]; // Se lo encontro en la bd
						return id;	
				}
				});
		}
		});	
}

function changeItem(sPrecio,sNombre,sNombreOld,IdCategoria){ // VE SI EXISTE ITEM A PARTIR DEL NOMBRE
$.ajax({
	url: "./bdd/queryInterface.php?table='item'&query=null&opt=1",
	async:false,
	success: function(input){ // check item
	var id_item= ""; // no existe -> lo que se devuelve
	var arr; // Array asociativo
	var obj=$.parseJSON(input);

	arr = $.map(obj, function(el) { return el }); // Mapaeo del JSON
	
	$.each(arr,function(index,elem){
		if(elem["nombre"]==sNombreOld){
			id_item=elem["id"];// Se lo encontro en la bd
		}
	});
	$.ajax({
		async:false,
		url:"./bdd/queryInterface.php?table='categoria'&query=null&opt=1",
		success: function(input){
				var id=null;
				var obj=$.parseJSON(input);
				var arr = $.map(obj, function(el) { return el }); // Mapaeo del JSON
				$.each(arr,function(index,elem){
					if(elem["nombre"]==IdCategoria){
						id=elem["id"]; // Se lo encontro en la bd	
				}
				});
				$.post("./bdd/queryInterface.php?table='"+id_item+"'&query=null&qPrecio='"+sPrecio+"'&qNombre='"+sNombre+"'&qCat="+id+"&opt=5"); // insertar item
				location.reload();
		}
		});	
	}
});

}