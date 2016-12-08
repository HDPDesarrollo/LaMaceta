angular.module('LaMaceta')
	.controller('CartController',function($interval,$cookies,$scope,CartService,SearchService){

	$scope.contentCart = [];

	$scope.theCookie = $cookies.getObject("cookieCart");

	getAllArticlesFromCookie = function(){

		$scope.contentCart = [];

		angular.forEach($scope.theCookie, function(value, key){
			CartService.getOneArticle(value.id)
				.then(function(res){
					$scope.contentCart.push({article:res,quantity:value.quantity});
				});
		});
	}

	getAllArticlesFromCookie();

	$scope.$watch("theCookie", function(newVal, oldVal) {
		if(!checkIfEquals(newVal,oldVal)){
	   		modifyContentCart(newVal,oldVal);
		}
	});

	modifyContentCart = function(newVal,oldVal){
		//console.log(newVal);
		//console.log(oldVal);
		if(oldVal==null || newVal.length>oldVal.length){
			CartService.getOneArticle(newVal[newVal.length-1].id)
				.then(function(res){
					$scope.contentCart.push({article:res,quantity:newVal[newVal.length-1].quantity});
					//console.log($scope.contentCart);
				});
		}

		if(newVal==oldVal){
			for (var i = 0; i < $scope.contentCart.length; i++) {
				$scope.contentCart[i].quantity = newVal.quantity;
			}
		}

		if(newVal.length<oldVal.length){

		}
	}

	checkIfEquals = function(newVal,oldVal){
		if(newVal == null && oldVal == null){
			return true;
		}else{
			if(oldVal==null || newVal.length!=oldVal.length){
					return false;
				}else{
					for (var i = 0; i < newVal.length; i++) {
						if(newVal[i].quantity!=oldVal[i].quantity)
							return false;
					}
					return true;
				}
		}
	}

	$interval(function(){ $scope.theCookie = $cookies.getObject("cookieCart"); }, 1000);

	$scope.getTotalPrice = function(){
		var acu = 0;
		angular.forEach($scope.contentCart, function(value, key){
			acu += value.article.price*value.quantity;
		});
		return acu;
	};

	$scope.addToCart = function (artId, quantity) {
		CartService.addToCart(artId, quantity);
	}

	$scope.deleteFromCart = function(artId){

		var articlesCart = $cookies.getObject("cookieCart");

		articlesCart = articlesCart.filter(function(value){ return value.id != artId; });

		$scope.contentCart = $scope.contentCart.filter(function(value){ return value.article.id != artId; });

		$cookies.putObject("cookieCart", articlesCart);
	}

	$scope.upQuantity = function(artId){
		var laCookie = $cookies.getObject("cookieCart");

		angular.forEach(laCookie, function(value, key){
			if(value.id == artId){
				value.quantity = value.quantity + 1;
			}
		});

		$cookies.putObject("cookieCart",laCookie);

		angular.forEach($scope.contentCart, function(value, key){
			if(value.article.id == artId){
				value.quantity = value.quantity + 1;
			}
		});
	};

	$scope.downQuantity = function(artId){
		var laCookie = $cookies.getObject("cookieCart");

		angular.forEach(laCookie, function(value, key){
			if(value.id == artId){
				if(value.quantity != 0)
				{
					value.quantity = value.quantity - 1;
				}
			}
		});

		$cookies.putObject("cookieCart",laCookie);

		angular.forEach($scope.contentCart, function(value, key){
			if(value.article.id == artId){
				if(value.quantity != 0){
					value.quantity = value.quantity - 1;
				}
			}
		});

	};

	$scope.subTotalCalculation = function(){
			var subTotalVariable = 0;
			angular.forEach($scope.contentCart, function(value, key){
				subTotalVariable += value.article.price*value.quantity;
			});
			return subTotalVariable;
	}

	$scope.icons = [];

	angular.forEach($scope.contentCart, function(value, key) {
	  CartService.searchIcon(value.article.idProd.id)
				.then(function(res){
					$scope.icons.push({"ruta": res});
					console.log($scope.icons);
				});
	});

  	
	$scope.menu = [];

	SearchService.getMenu()
	.then(function(res){
		//console.log(res);
		$scope.buildMenu(res);
		//$scope.item = res;
	});

	$scope.buildMenu = function(res){
		$scope.menu = [];
		for (i = 0; i < res.length; i++) { 	
			if(i>0 && res[i].target == res[i-1].target){
				$obj = res[i];
				$scope.menu[$lastObj].prodType.push({type: $obj.prodType});
			}else{				
				$obj = res[i];
				$lastObj = $scope.menu.length;
				$scope.menu[$lastObj] = {target: $obj.target, prodType:[{type: $obj.prodType}]};
			}
		}	
		//console.log($scope.menu);
	}
});