angular.module("LaMaceta").factory("factoryData", function() {
  return {
    data: {}
  };
});

angular.module("LaMaceta")
	.controller("ShopItemController", function($scope, AdminService, ShopItemService, $cookies, CartService, $window, SearchService){

	$scope.itemBuy = [];
	$scope.quantityBuy = 1;
	$scope.pictures = [];
	$scope.colors = [];
	$scope.sizes = [];	
	$scope.price = [];
	$scope.description = [];
	$scope.name = [];
	$scope.stock = [];
	$scope.principalPicture = [];
	$scope.oldPrice = [];

	$scope.upQuantity = function(){
		$scope.quantityBuy = $scope.quantityBuy + 1; 
		console.log($scope.quantityBuy);
	};

	$scope.downQuantity = function(){
		if($scope.quantityBuy>1){
			$scope.quantityBuy = $scope.quantityBuy - 1; 
		}
		console.log($scope.quantityBuy);
	};

	//$scope.cart  = $cookies.remove("cookieCart");//sacar	

	$scope.validateAndAddToCart = function () {

		console.log($scope.quantityBuy);

		ShopItemService.validateStockByArticle($scope.itemBuy.idProd, 
			$scope.itemBuy.size.id, 
			$scope.itemBuy.color.id, $scope.quantityBuy)
		.then(function(res){
			//console.log(res);
			$scope.idArticle = res[0].ID;//deberia ser solo uno

			if($scope.idArticle!=null){
				CartService.addToCart($scope.idArticle, $scope.quantityBuy);
			}else{
				alert("No hay en stock un producto con esa combinacion de color y talle")
			}

		});
	}

	$scope.addSize = function(size){
		for (var i = 0; i < $scope.sizes.length; i++) {
			if($scope.sizes[i].id == size.id){
				return;
			}			
		}
		$scope.sizes.push(size);
	}

	$scope.addColor = function(color){
		for (var i = 0; i < $scope.colors.length; i++) {
			if($scope.colors[i].id == color.id){
				return;
			}			
		}
		$scope.colors.push(color);
		//console.log($scope.colors);
	}

	$scope.buildToShow = function (res) {
		//console.log(res);
		$scope.colors = [];
		$scope.sizes = [];	
		for (i = 0; i < res.length; i++) { 	
			$obj = res[i];
			this.addSize($obj.idSize);
			this.addColor($obj.idColor);
			$scope.price = $obj.price;
			$scope.description = $obj.idProd.description;
			$scope.name = $obj.idProd.name;
			$scope.stock = $obj.stock;
			$scope.oldPrice = $obj.oldPrice;

			$scope.itemBuy = {idProd: $obj.idProd.id, quantity: 1, color:$obj.idColor, size:$obj.idSize};
		}	
		//console.log($scope.itemBuy);
	};

	$scope.changePicture = function(id){
		for (var i = 0; i < $scope.pictures.length; i++) {
			if($scope.pictures[i].id == id){
				$scope.principalPicture = $scope.pictures[i];
				break;
			}			
		}
	}

	function getQueryParam(param) {
	    var result =  window.location.search.match(
	        new RegExp("(\\?|&)" + param + "(\\[\\])?=([^&]*)")
	    );

	    return result ? result[3] : false;
	}

	$scope.itemId = getQueryParam("id"); 

    var loc = window.location.href;
    var dir = loc.substring(0, loc.lastIndexOf('/'));

        

	ShopItemService.getArticlesByProdId($scope.itemId)
		.then(function(res){
			if(res.length==0){
				$window.location.href = dir+"/search-result.html";
			}
			
			$scope.buildToShow(res);
			$scope.item = res;
		});

	ShopItemService.getPicturesByProdId($scope.itemId)
		.then(function(res){			
			if(res.length==0){
				$window.location.href = dir+"/search-result.html";
			}

			$scope.pictures = res;
			for (var i = 0; i < 1; i++) {
				$scope.principalPicture = $scope.pictures[i];
				break;
			}					
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