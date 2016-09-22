var ModuleCarro = angular.module('Lamaceta', []);

ModuleCarro.controller('CtrlCarrito',function($scope,ServiceCart){

	$scope.up = function(index){
		angular.forEach($scope.ContentCArt, function(value, key){
			if(key == index){
				value.quantity = value.quantity + 1;
			}
		});
	};

	$scope.down = function(index){
		angular.forEach($scope.ContentCArt, function(value, key){
			if(key == index){
				if(value.quantity != 0)
				{
					value.quantity = value.quantity - 1;
				}
			}
		});
	};

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

	$scope.del = function(index){

		angular.forEach($scope.ContentCArt, function(value, key){
			if(key == index)
			{
				if($scope.DeleteId(value.id))
				{
				$scope.ContentCArt.splice(key,1);
				}
			}
		});
		$scope.alerta("Error en la operacion! Intentelo mas tarde por favor.","danger");
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
			if(rst != true){
				$scope.alerta("Error en la operacion! Intentelo mas tarde por favor.","danger");
				return false;
			}else{
				return true;
			}
		})
		.catch(function(error){
			return error;
		})
		
	};

	$scope.EmptyCart = function(){
		ServiceCart.DeleteAll().then(function(rst){
			if(rst != true){
				$scope.alerta("Error en la operacion! Intentelo mas tarde por favor.","danger")
				return false;
			}else{
				return true;
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


