var ModuleCarro = angular.module('Lamaceta', []);

ModuleCarro.run(function($rootScope){
	$rootScope.acumulador = 0;
});

ModuleCarro.controller('CtrlCarrito',function($scope,ServiceCart,$rootScope){

	$scope.ContentCArt = [{
		name:"pantalon",
		quantity: 1,
		price: 102,
		id:754,
		img:"https://mcgroup.files.wordpress.com/2009/02/campera-roja.jpg",
		description: "soy una descripcion de la prenda",
		priceT: 123
	},
	{
		name:"Campera roja",
		quantity: 2,
		price: 154.6,
		id:12,
		img:"https://mcgroup.files.wordpress.com/2009/02/campera-roja.jpg",
		precioT: 309.2
	},
	{
		name:"Campera roja",
		quantity: 2,
		price: 345.12,
		id:789,
		img:"https://mcgroup.files.wordpress.com/2009/02/campera-roja.jpg",
		precioT: 309.2
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
				$scope.ContentCArt.splice(key,1);
				$rootScope.acumulador = $scope.getTotal();
				// if($scope.DeleteId(value.id))
				// {
				// $scope.ContentCArt.splice(key,1);
				// $rootScope.acumulador = $scope.getTotal();
				// return true;
				// }
			}
		});
		$scope.alerta("Intentelo mas tarde por favor.","danger");

	};

	$scope.alerts = [];

	$scope.alerta = function(msg,type){
		$scope.alerts.push({msg:msg,type:type});

	};

	$scope.closeAlert = function(index) {
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

	/*$scope.ViewModal = function () {
    var modalInstance = $modal.open({
     	 templateUrl: 'myModalContent.html',
     	 controller: 'ModalInstanceCtrl'
    	});

  	};*/

  	
});



/*angular.module('Lamaceta').controller('ModalInstanceCtrl', function ($scope, $modalInstance) {
 
  $scope.ok = function () {
    $modalInstance.close();
  };
});*/


