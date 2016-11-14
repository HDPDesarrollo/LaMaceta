var ModuleCarro = angular.module('LaMaceta',[]);

ModuleCarro.run(function($rootScope){
	$rootScope.acumulador = 0;
});

ModuleCarro.factory('compartirObj', function(){
	var obj = {};
	var prendas;
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

ModuleCarro.controller('SearchResult', function($rootScope,$scope,$location,ServicioBuscar,compartirObj){

	$scope.StrSearch = $location.search().strbs;
	
	ServicioBuscar.EnviarCadena($scope.StrSearch).then(function(resp){
		if(resp != "false")
			{
				compartirObj.ingresarPrendas(resp);
				$scope.prendas = compartirObj.obtenerPrendas();
				
			}else{
				$scope.prendas = resp;
			}
	});

	$scope.currentPage = 0;
    $scope.pageSize = 3;
    $scope.numberOfPages=function(){
        return Math.ceil($scope.prendas.length/$scope.pageSize);                
    }
});

ModuleCarro.controller('CtrlCarrito',function($scope,ServiceCart,$rootScope,$location){
	$scope.quantity = 1;
	/*$scope.ContentCArt = [{
		name:"pantalon",
		quantity: 1,
		price: 102,
		id:754,
		img:"https://mcgroup.files.wordpress.com/2009/02/campera-roja.jpg",
		description: "soy una descripcion de la prenda",
		priceT: 123 },{
		name:"Campera roja",
		quantity: 2,
		price: 154.6,
		id:12,
		img:"https://mcgroup.files.wordpress.com/2009/02/campera-roja.jpg",
		description: "soy otra descripcion de la prenda",
		precioT: 309.2
	}];*/

	$scope.Shipping = [{
		name:"Pepito",
		surname:"Perez",
		email:"pepitoPerez@lala.com",
		dni:"35761754",
		address:{
			street:"calle falsa",
			number:"123",
			zipCode:"1452"}
	}];

	$scope.getTotal = function(){
		$scope.acu = 0;
		angular.forEach($scope.ContentCArt, function(value, key){
			$scope.acu = $scope.acu + (value.price * value.quantity);
		});
		return $scope.acu;
	};

	$rootScope.acumulador = $scope.getTotal();

	$scope.up = function(index){
		angular.forEach($scope.ContentCArt, function(value, key){
			if(key == index){
				value.quantity = value.quantity + 1;
				$rootScope.acumulador = $scope.getTotal();
				console.log($rootScope.acumulador);
			}
		});
	};

	$scope.down = function(index){
		angular.forEach($scope.ContentCArt, function(value, key){
			if(key == index){
				if(value.quantity != 0)
				{
					value.quantity = value.quantity - 1;
					$rootScope.acumulador = $scope.getTotal();
				}
			}
		});
	};

	$scope.del = function(index){

		angular.forEach($scope.ContentCArt, function(value, key){
			if(key == index)
			{
				if($scope.DeleteId(value.id))
				{
				$scope.ContentCArt.splice(key,1);
				$rootScope.acumulador = $scope.getTotal();
				return true;
				}
			}
		});
		$scope.alerta("Intentelo mas tarde por favor.","danger");
	};

	$scope.alerts = [];

	$scope.alerta = function(msg,type){
		$scope.alerts.push({msg:msg,type:type});
	};

	$scope.closeAlert = function(index){
    $scope.alerts.splice(index, 1);
  		};

	$scope.GetStockById = function(id){
		ServiceCart.GetStock(id).then(function(rst){
			return rst;
		})
		.catch(function(error){
			return error;
		})	
	};

	$scope.DeleteId = function(id){		
		var rstDel = ServiceCart.DeletePerId(id).then(function(rst){
			if(rst){
				return true;
			}else{
				return false;
			}
		})
		.catch(function(error){
			return error;
		})	
	};

	$scope.EmptyCart = function(){
		ServiceCart.DeleteAll().then(function(rst){
			if(rst){
				return true;
			}else{
				return false;
			}
		})
	};

	$scope.abrir = function(id,cantidad){
		if(this.AddToCart(id,cantidad)){
			this.ViewModal();
		}
	};

	$scope.GetCart = function(){
		ServiceCart.GetAll().then(function(rst){
			return rst;
		});
	}

	$scope.ConfimOrder = function(){
		ServiceCart.ConfOrden($scope.ContentCArt,$scope.Shipping).then(function(rst){
			$rootScope.urlPay = rst;
			return rst;
		})
	};

	$rootScope.urlPay = $scope.ConfimOrder();

	$scope.openUrl = function(url){
		window.open(url);
	}

	$scope.saveInCart = function(prenda,quantity){
		if(prenda.quantity < quantity)
		{
			//Lanzar ERROR!
			$scope.alerta("No se pudo agregar el producto al carro","danger");
		}else{
			prenda.quantity = quantity;
			ServiceCart.Add(prenda);
			$scope.alerta("Producto agregado al carro","success");
		}
	}

	$scope.ContentCArt = $scope.GetCart();

	/*$scope.ViewModal = function () {
    var modalInstance = $modal.open({
     	 templateUrl: 'myModalContent.html',
     	 controller: 'ModalInstanceCtrl'
    	});

  	};*/ 	
});

ModuleCarro.config(function($locationProvider) {
	$locationProvider.html5Mode({
  						enabled: true,
  						requireBase: false
					});
});

ModuleCarro.filter('startFrom', function() {
    return function(input, start) {
        start = +start; //parse to int
        return input.slice(start);
    }
});

/*angular.module('Lamaceta').controller('ModalInstanceCtrl', function ($scope, $modalInstance) {
 
  $scope.ok = function () {
    $modalInstance.close();
  };
});*/


