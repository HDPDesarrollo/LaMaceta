angular.module("LaMaceta")
    .factory("factoryData", function () {
            return {  data: {}  };
});

angular.module("LaMaceta")
	.controller("SearchController", function($scope, SearchService, $uibModal, $cookies, $location, factoryData){


    $scope.totalProductsSearch =[];
    $scope.productsPage = [];
    $scope.filterColor = [];
    $scope.filterSeason = [];
	$scope.quantityPage = "10";
 	$scope.currentPage = 1;

 	$scope.sorting = "p.name ASC";
 	$scope.color = null;
 	$scope.minAmount = null;
 	$scope.maxAmount = null;
 	$scope.target = null;
 	$scope.prodType = null;
 	$scope.season = null;

	$scope.wordSearched = "";
	$scope.wordSearch = "";
	

	$scope.searchPrice = function (wordSearch, sorting, minAmount, maxAmount){		
		this.search(wordSearch, sorting, $scope.color, minAmount, maxAmount, $scope.target, $scope.prodType, $scope.season);
	}

	$scope.search = function (wordSearch, sorting, color, minAmount, maxAmount, target, prodType, season){	
		SearchService.search(wordSearch, sorting, color, minAmount, maxAmount, target, prodType, season)
				.then(function(res){
					
					$scope.buildProductsAndFilters(res);

					$scope.totalItems = $scope.totalProductsSearch.length;
					$scope.itemsPerPage = $scope.quantityPage;

					$scope.paginateSearch();
					if(wordSearch){
						$scope.wordSearched = wordSearch;
					}				
				});
	}

	$scope.paginateSearch = function () {
		$scope.productsPage = [];

		$prod = $scope.totalProductsSearch;
		$aux = (($scope.currentPage-1)*$scope.quantityPage);
		$max = ($aux+$scope.quantityPage);

		if($prod.length<$max){
			$max = $prod.length;
		}
		for (i = $aux; i < $max; i++) {
			$scope.productsPage.push($prod[i]); 
		}	
	};



	$scope.pageChanged = function() {

  	if($scope.target==false){
		this.search("", $scope.sorting, null, null, null, null, null, null);
	}else if($scope.target!=false && $scope.prodType=='Todos'){
		this.search("", $scope.sorting, null, null, null, $scope.target, null, null);
	}else if($scope.target!=false && $scope.prodType!='Todos'){
		this.search("", $scope.sorting, null, null, null, $scope.target, $scope.prodType, null);
	}
	};


	$scope.buildProductsAndFilters = function (res) {
		$scope.totalProductsSearch = [];
		$scope.filterColor = [];
		for (i = 0; i < res.length; i++) { 	
			if(i>0 && res[i].id == res[i-1].id){
				$obj = res[i];
				if($obj.id != null){

					$scope.exists = false;
					for (var j = 0; j < $scope.totalProductsSearch[$lastObj].color.length; j++) {
						if($scope.totalProductsSearch[$lastObj].color[j].color ==  $obj.color){														
							$scope.exists = true;
							break;
						}						
					}
					if(!$scope.exists){
						$scope.totalProductsSearch[$lastObj].color.push(
							{color: $obj.color, rgb: $obj.rgb});
					}

					/*$scope.totalProductsSearch[$lastObj].size.push(
					{size: $obj.SIZE});*/

					this.addColorFilter({color: $obj.color, rgb: $obj.rgb});
					this.addSeasonFilter($obj.season);
				}
			}else{				
				$obj = res[i];
				$lastObj = $scope.totalProductsSearch.length;
				$scope.totalProductsSearch[$lastObj] = {id:$obj.id, name: $obj.name, price: $obj.price,
				picture: $obj.picture, color:[], size:[]};

				if($obj.id != null){

					$scope.totalProductsSearch[$lastObj].color.push(
					{color: $obj.color, rgb: $obj.rgb});

					this.addColorFilter({color: $obj.color, rgb: $obj.rgb});
					this.addSeasonFilter($obj.season);
				}	
			}
		}	
	};

	$scope.addColorFilter = function(color){
		for (var i = 0; i < $scope.filterColor.length; i++) {
			if($scope.filterColor[i].color == color.color){			
				return;
			}						
		}
		$scope.filterColor.push(color);
	}

	$scope.addSeasonFilter = function(season){
		for (var i = 0; i < $scope.filterSeason.length; i++) {
			if($scope.filterSeason[i] == season){			
				return;
			}						
		}
		$scope.filterSeason.push(season);
	}

	$scope.removeFilters = function () {
	 	$scope.color = null;
	 	$scope.minAmount = null;
	 	$scope.maxAmount = null;
	 	$scope.target = null;
	 	$scope.prodType = null;
		$scope.search("", $scope.sorting, null, null, null, null, null, null);
	}
	
	function getQueryParam(param) {
	    var result =  window.location.search.match(
	        new RegExp("(\\?|&)" + param + "(\\[\\])?=([^&]*)")
	    );
	    return result ? result[3] : false;
	}


	$scope.target = getQueryParam("target"); 
	$scope.prodType = getQueryParam("prodType"); 
	$scope.wordS = getQueryParam("word");

	if($scope.target==false){
		$scope.target = null;
		$scope.prodType = null;
		$scope.search($scope.wordS, $scope.sorting, null, null, null, null, null, null);
	}else if($scope.target!=false && $scope.prodType=='Todos'){
		$scope.prodType = null;
		$scope.search("", $scope.sorting, null, null, null, $scope.target, null, null);
	}else if($scope.target!=false && $scope.prodType!='Todos'){
		$scope.search("", $scope.sorting, null, null, null, $scope.target, $scope.prodType, null);
	}


	$scope.openAddToCartModal = function (prodId) {
	    var modalInstance = $uibModal.open({
	      animation: true,
	      templateUrl: '../theme/add-cart-modal.html',
	      controller: 'AddCartModalCtrl',
	      scope: $scope,
	      resolve: {
	        cart: function () {	 

	        factoryData.data.prodId = prodId;

	        }
	      }
	    });
    }

});

angular.module('LaMaceta').controller('AddCartModalCtrl', function ($scope, $uibModalInstance, ShopItemService, SearchService, factoryData, CartService) {

	$scope.article = {prodId: factoryData.data.prodId, quantity: 1, color: null, size: null};
	$scope.colors = [];
	$scope.sizes = [];

	$scope.upQuantity = function(){
		$scope.article.quantity = $scope.article.quantity + 1; 
		console.log($scope.article.quantity);
	};

	$scope.downQuantity = function(){
		if($scope.article.quantity>1){
			$scope.article.quantity = $scope.article.quantity - 1; 
			console.log($scope.article.quantity);
		}
	};

	$scope.addToCart = function () {

		ShopItemService.validateStockByArticle($scope.article.prodId, 
			$scope.article.size.id, 
			$scope.article.color.id, $scope.article.quantity)
		.then(function(res){
			console.log(res);
			$scope.idArticle = res[0].ID;//deberia ser solo uno
			
			if($scope.idArticle!=null){
				CartService.addToCart($scope.idArticle, $scope.article.quantity);
				$uibModalInstance.close();
			}else{
				alert("No hay en stock un producto con esa combinacion de color y talle")
			}

			}, function(error){
				 $uibModalInstance.close();
			});	
	}

	SearchService.getAllColorsByProdId($scope.article.prodId)
		.then(function(res){
		$scope.colors = res;

		if($scope.colors.length>0){
			$scope.article.color = res[0];
		}
		});

	SearchService.getAllSizesByProdId($scope.article.prodId)
		.then(function(res){
		$scope.sizes = res;

		if($scope.sizes.length>0){
			$scope.article.size = res[0];
		}
		});

	$scope.cancel = function () {
	    $uibModalInstance.dismiss('cancel');
	};

});

angular.module('LaMaceta').filter('unique', function() {
    return function(input, key) {
        var unique = {};
        var uniqueList = [];
        for(var i = 0; i < input.length; i++){
            if(typeof unique[input[i][key]] == "undefined"){
                unique[input[i][key]] = "";
                uniqueList.push(input[i]);
            }
        }
        return uniqueList;
    };
});