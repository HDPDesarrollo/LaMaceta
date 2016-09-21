var ModuloBusqueda = angular.module('Lamaceta',['ngRoute',"ui.bootstrap"]);

ModuloBusqueda.run(function($rootScope){
	$rootScope.datosTraidos = [];

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

			

ModuloBusqueda.config(function($locationProvider) {
	$locationProvider.html5Mode({
  						enabled: true,
  						requireBase: false
					});
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

ModuloBusqueda.controller('CtrlCarrito',function($rootScope,$scope,ServiceCart,$modal,compartirObj){
	$scope.del = function(){
		alert("holaa");
	};

	$scope.ContentCArt = [{
		nombre:"pantalos",
		cantidad: 4,
		precio: 154.6,
		id:12
	},
	{
		nombre:"pantalos",
		cantidad: 4,
		precio: 154.6,
		id:12
	}];

	$rootScope.alerts = [];

	$scope.alerta = function(){
		$rootScope.alerts.push({type:'success',msg:'El producto fue agregado correctamente'});
		console.log($scope.alerts);
		
	};

	$scope.closeAlert = function(index) {
    $scope.alerts.splice(index, 1);
  		};

	$scope.AddToCart = function(prenda,cantidad){
		
		if($scope.GetStockById(id) <= cantidad)
			{
				prenda.cantidad = cantidad;
				ServiceCart.Add(prenda).then(function(rst){
					return rst;
				})
				.catch(function(error){
					return error;
				})
				.finally(function(){
				});
			}else{
				return false;
			}
	};

	$scope.GetStockById = function(id){
		ServiceCart.GetStock(id).then(function(rst){
			return rst;
		})
		.catch(function(error){
			return error;
		})
		.finally();
	};

	$scope.DeleteId = function(id){
		
		var rstDel = ServiceCart.DeletePerId(id).then(function(rst){
			return rst;
		})
		.catch(function(error){
			return error;
		})
		.finally(function(){
			if(rstDel){
				return rstDel;
			}else{
				return false;
			}
		});
	};

	$scope.EmptyCart = function(){
		ServiceCart.DeleteAll().then(function(rst){
			return rst;
		})
	};

	$scope.abrir = function(id,cantidad)
	{
		if(this.AddToCart(id,cantidad)){
			this.ViewModal();
		}
	};

	$scope.GetCart = function()
	{
		ServiceCart.GetAll().then(function(rst){
			$scope.ContentCArt.push(rst);
		});
	}

	$scope.ViewModal = function () {
    var modalInstance = $modal.open({
     	 templateUrl: 'myModalContent.html',
     	 controller: 'ModalInstanceCtrl'
    	});

  	};

  	
});

