angular.module("LaMaceta")
.factory("factoryData", function() {
  return {
    data: {}
  };
});

angular.module("LaMaceta")
	.controller("SubCtrlAdmin_Product", function($scope, AdminService, $modal, factoryData, NgTableParams){

	$scope.products = [];
	$scope.colors = [];
	$scope.sizes = [];
	$scope.providers = [];
	$scope.seasons = [];

	$scope.productStatus = [{id: "1", title: "ACTIVO"},
							{id: "0", title: "INACTIVO"}];

	AdminService.getAllArticles()
		.then(function(res){
			$scope.buildArticles(res);
			$scope.productsConfigTableParams = new NgTableParams({}, { dataset: $scope.products});
		});


	AdminService.getAllColors()
		.then(function(res){
			$scope.colors = res;  
		});

	AdminService.getAllSizes()
		.then(function(res){
			$scope.sizes = res;
		});

	AdminService.getAllProviders()
		.then(function(res){
			$scope.providers = res;
		});

	AdminService.getAllSeasons()
		.then(function(res){
			$scope.seasons = res;
		});


	$scope.openArticleModal = function (product) {
	    var modalInstance = $modal.open({
	      animation: true,
		  templateUrl: '../theme/product-modal.html',
	      controller: 'ProductModalCtrl',
	      scope: $scope,
	      resolve: {
	        products: function () {	       	
        	}
	      }

	    });

		modalInstance.result.then(function(res) {	    	
			$scope.buildArticles(res);
			$scope.productsConfigTableParams = new NgTableParams({}, { dataset: $scope.products});
	    });
    }

	$scope.openEditArticleModal = function (product) {
	    var modalInstance = $modal.open({
	      animation: true,
	      size: 'lg',
	      templateUrl: '../theme/product-modal.html',
	      controller: 'EditProductModalCtrl',
	      scope: $scope,
	      resolve: {
	        products: function () {	 
	      		factoryData.data.product = product;  
	        }
	      }

	    });

		modalInstance.result.then(function(res) {	    	
			$scope.buildArticles(res);
			$scope.productsConfigTableParams = new NgTableParams({}, { dataset: $scope.products});
	    });
    }

	$scope.removeProduct = function (user) {
		// console.log(user);
		AdminService.removeProduct(user)
			.then(function(res){
			$scope.buildArticles(res);
			$scope.productsConfigTableParams = new NgTableParams({}, { dataset: $scope.products});
		});
    }

    $scope.buildArticles = function (res) {
		$scope.products = [];

		for (i = 0; i < res.length; i++) { 	
			if(i>0 && res[i].id == res[i-1].id){
				$obj = res[i];
				if($obj.idArt != null){
					$scope.products[$lastObj].articles.push(
					{id: $obj.idArt, idProd:$obj.id, sku: $obj.sku, active: {id: $obj.active}, color: {color: $obj.color, id: $obj.idColor}, 
					size: {size: $obj.size, id: $obj.idSize}, 
					stock: parseInt($obj.stock), minStock: parseInt($obj.minStock), price: parseFloat($obj.price)});
				}
			}else{				
				$obj = res[i];
				$lastObj = $scope.products.length;
				$scope.products[$lastObj] = {id:$obj.id, name: $obj.name, description: $obj.description, prodActive: $obj.prodActive,
				articles:[]};

				if($obj.idArt != null){
					$scope.products[$lastObj].articles.push({id: $obj.idArt, idProd:$obj.id, sku: $obj.sku, active: {id: $obj.active}, 
					color: {color: $obj.color, id: $obj.idColor}, 
					size: {size: $obj.size, id: $obj.idSize}, stock: parseInt($obj.stock), 
					minStock: parseInt($obj.minStock), price: parseFloat($obj.price)});	
				}	
			}
		}	
	};

	$scope.openDetailProductModal = function (detail, idProd) {
	    var modalInstance = $modal.open({
	      animation: true,
	      templateUrl: '../theme/detail-product.html',
	      controller: 'DetailProductModalCtrl',
	      scope: $scope,
	      size: 'lg',
	      resolve: {
	        detail: function () {	 
	        	factoryData.data.idProd = idProd;
	        	factoryData.data.detail = detail;  
	        }
	      }
		});

		modalInstance.result.then(function(res) {	
			$scope.buildArticles(res);   
			$scope.productsConfigTableParams = new NgTableParams({}, { dataset: $scope.products});
	    });
    }
});

angular.module('LaMaceta').controller('DetailProductModalCtrl', function ($scope, factoryData, $modalInstance, NgTableParams, AdminService) {

	$scope.detail = factoryData.data.detail;
	$scope.idProd = factoryData.data.idProd;

	$scope.detailConfigTableParams = new NgTableParams({}, { dataset: $scope.detail});

	$scope.addRow = function () {
	    $scope.detail.push({});
		$scope.detailConfigTableParams.reload();
  	};

	$scope.deleteRow = function () {
		for (i = 0; i < $scope.detail.length; i++) { 				
			$obj = $scope.detail[i];
			if($obj.color == null){
				$scope.detail.splice(i,10);
			}
		}	
		$scope.detailConfigTableParams.reload();	
  	};

  
  	$scope.save = function () {
		AdminService.saveArticles($scope.detail, $scope.idProd)
			.then(function(res){	
				$modalInstance.close(res);
			}, function(error){
				 $modalInstance.close();
			})		    
  	};

    $scope.cancel = function () {
    	AdminService.getAllArticles()
		.then(function(res){
			$modalInstance.close(res);
		});
  	};

});

angular.module('LaMaceta').controller('ProductModalCtrl', function ($scope, AdminService, $modalInstance) {

  	$scope.save = function (product) {
	AdminService.saveProduct(product)
		.then(function(res){	
			$modalInstance.close(res);
		}, function(error){
			 $modalInstance.close();
		})		    
  	};

	  $scope.cancel = function () {
	    $modalInstance.dismiss('cancel');
  	};

});

angular.module('LaMaceta').controller('EditProductModalCtrl', function ($scope, AdminService, $modalInstance, factoryData) {


	AdminService.getProductById(factoryData.data.product.id)
		.then(function(res){
			$scope.product = res;
			$scope.product.provider = res.idProvider;
			$scope.product.season = res.idSeason;
		}); 

  	$scope.save = function (product) {
	AdminService.saveProduct(product)
		.then(function(res){	
			$modalInstance.close(res);
		}, function(error){
			 $modalInstance.close();
		})		    
  	};

	  $scope.cancel = function () {
	    $modalInstance.dismiss('cancel');
  	};

});
