var servicio = angular.module('LaMaceta');

servicio.service('ServicioBuscar', function($http){
	this.EnviarCadena = function(cadena){
		return $http.post("http://localhost/lamaceta/bd/Search.php", {data:{cadena:cadena,action:"string"}})
				.then(function(respuesta) {
					console.log(respuesta);
                    return respuesta.data;          
                      },function errorCallback(response) {        
                          console.log( response);           
                      });
		}
	});


servicio.service('ServicioBuscarId',function($http){
		this.BuscarId = function(id){
			return $http.post("http://localhost/lamaceta/bd/Search.php", {data:{id:id,action:"id"}})
			.then(function(respuesta) { 
                    return respuesta.data;          
                      },function errorCallback(response) {        
                          console.log(response);           
                      });
			}
		
	});




