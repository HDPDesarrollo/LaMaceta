var ModuloBusqueda = angular.module('LaMaceta',[]);

ModuloBusqueda.run(function($rootScope){
	$rootScope.datosTraidos = [];

});

ModuloBusqueda.config(function($locationProvider) {
	$locationProvider.html5Mode({
  						enabled: true,
  						requireBase: false
					});
});


ModuloBusqueda.factory('compartirObj', function(){
	var obj = {};
	var prendas='';
	var unaPrenda = '';

	obj.ingresarPrendas = function(NuevoElemento){
		prendas = NuevoElemento;
	}

	obj.ingresarUnaPrenda = function(NuevoElemento){
		unaPrenda = NuevoElemento;
	}

	obj.BorrarTodo = function(){
		prenda = '';
	}

	obj.obtenerPrendas = function(){
		return prendas;
	}

	obj.obtenerUnaPrenda = function(){
		return unaPrenda;
	}
	return obj;

});

ModuloBusqueda.controller('CBusqueda',["$rootScope","$scope","compartirObj","ServicioBuscar",function($rootScope,$scope,compartirObj,ServicioBuscar){
		$scope.AbrirTab = function(id){
			window.open("./ver.php?idObj="+id).focus()
		};

		

		var SearchComplete = function(data){
			$rootScope.datosTraidos = [];
			compartirObj.ingresarPrendas(data);

		 $rootScope.datosTraidos.push(compartirObj.obtenerPrendas());
		 
		 $scope.cadena = null;
		 console.log($rootScope.datosTraidos);
		};

		var error = function(err){
			console.log(err);
		};

		$scope.EnviarCadena = function(cadena){
			ServicioBuscar.EnviarCadena(cadena).then(SearchComplete,error)
		};


}]);

ModuloBusqueda.controller('RtaBusqueda',function($scope,compartirObj){
	$scope.datosTraidos = [];
	$scope.datosTraidos = compartirObj.obtenerPrendas();
});


ModuloBusqueda.controller('VerProducto',function($scope,$location,ServicioBuscarId,compartirObj){
	$scope.prenda;
	$scope.IdPrenda = $location.search().idObj;
	ServicioBuscarId.BuscarId($scope.IdPrenda).then(function(resp){
		if(resp != "false")
			{
				compartirObj.ingresarUnaPrenda(resp);
				$scope.prenda = compartirObj.obtenerUnaPrenda();
			}else{
				$scope.prenda = resp;
			}
	});
	
});

ModuloBusqueda.controller('SearchResult', function($scope,$location,ServicioBuscar,compartirObj){
	$scope.numPerPage = 6;
	$scope.numPages = function () {
    return Math.ceil($scope.prendas.length / $scope.numPerPage);
  	};

	$scope.StrSearch = $location.search().strbs;
	ServicioBuscar.EnviarCadena($scope.StrSearch).then(function(resp){
		console.log(resp);
		if(resp != "false")
			{
				compartirObj.ingresarPrendas(resp);
				$scope.prendas = compartirObj.obtenerUnaPrenda();
			}else{
				$scope.prendas = resp;
			}
	});
	$scope.$watch('currentPage + numPerPage', function() {
    var begin = (($scope.currentPage - 1) * $scope.numPerPage) , end = begin + $scope.numPerPage;
    
    //$scope.filteredTodos = $scope.prendas.slice(begin, end);
  	});
});