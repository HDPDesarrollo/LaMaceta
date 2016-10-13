var servicio = angular.module('LaMaceta');

servicio.service('ServicioBuscar', function($http){
	this.EnviarCadena = function(cadena){
		return $http.post("http://localhost/lamaceta/modulos/busqueda/busqueda.post.php", cadena)
				.then(function(respuesta) {  
                    return respuesta.data;          
                      },function errorCallback(response) {        
                          console.log( response);           
                      });
		}
	});


servicio.service('ServicioBuscarId',function($http){
		this.BuscarId = function(id){
			return $http.post("http://localhost/lamaceta/modulos/busqueda/busquedaId.post.php", id)
			.then(function(respuesta) { 
                    return respuesta.data;          
                      },function errorCallback(response) {        
                          console.log(response);           
                      });
			}
		
	});




