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
			// console.log(res);
			$scope.buildArticles(res);
			$scope.productsConfigTableParams = new NgTableParams({}, { dataset: $scope.products});
		});


	AdminService.getAllColors()
		.then(function(res){
			$scope.colors = res;  
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
	      size: 'lg',
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

	$scope.eraseProduct = function (user) {
		// console.log(user);
		AdminService.eraseProduct(user)
			.then(function(res){
				$scope.buildArticles(res);
				$scope.productsConfigTableParams = new NgTableParams({}, { dataset: $scope.products});
		});
	}

    $scope.buildArticles = function (res) {
		// console.log("estoy cargando los productos de la grilla");
		// console.log($scope.products);
		// console.log(res);
		$scope.products = [];
		// console.log($scope.products);

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
				$scope.products[$lastObj] = {id:$obj.id, name: $obj.name, description: $obj.description, prodActive: $obj.prodActive, idProvider: $obj.idProvider,
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

	$scope.openDetailProductModal = function (detail, idProd, idProvider) {
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
	        	factoryData.data.idProvider = idProvider;  
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
	$scope.idProvider = factoryData.data.idProvider;

	$scope.detailConfigTableParams = new NgTableParams({}, { dataset: $scope.detail});

	AdminService.getSizesByProvider($scope.idProvider)//Only actives
		.then(function(res){
			//console.log(res);
			$scope.sizes = res;
		});

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

angular.module('LaMaceta').controller('ProductModalCtrl', function ($scope, AdminService, $modalInstance, Upload) {

	$scope.imagesVerification = function(images,invalidImages){
		$scope.badFiles = invalidImages;
	}

  	$scope.save = function (product) {
  		//console.log(product);
		AdminService.saveProduct(product)
			.then(function(res){
				//console.log(res);		
		  		if(product.imagesToUpload!=null){
		  			//console.log(product.imagesToUpload);
		  			Upload.upload({
				        url: '../bd/uploadFiles.php',
				        data: {files: product.imagesToUpload,
				        		type: "producto",
				        		product: res}
				      }).then(function(response){
				      	console.log(response);
				      	/*if (response.status == 200){
				      		$scope.errorMsg = response.data;
				      	}else{
				      		$scope.errorMsg = response.status + ': ' + response.data;
				      	}*/
				      	$scope.badFiles = [];
				      	$scope.product.images = [];

						AdminService.getAllArticles()
								.then(function(res){
							  		$modalInstance.close(res);	
								});
				      });		
		  		}else{		  			
					AdminService.getAllArticles()
							.then(function(res){
						  		$modalInstance.close(res);	
							});
		  		}
	
			}, function(error){
				 $modalInstance.close();
			})	
  	};

	  $scope.cancel = function () {
	    $modalInstance.dismiss('cancel');
  	};

});

angular.module('LaMaceta').controller('EditProductModalCtrl', function ($scope, AdminService, $modalInstance, factoryData, Upload) {
	$scope.checklistToDelete = [];

	AdminService.getProductById(factoryData.data.product.id)
		.then(function(res){	
			$scope.product = res;
			$scope.product.provider = res.idProvider;
			$scope.product.season = res.idSeason;

			AdminService.getProductImages(factoryData.data.product)
				.then(function(res){					
					$scope.product.images = res;
				}); 

			//console.log($scope.product);
		}); 

	$scope.imagesVerification = function(images,invalidImages){
		$scope.badFiles = invalidImages;
	}

  	$scope.save = function (product) {
  		if(product.imagesToUpload!=null){
  			product.images.upload = Upload.upload({
		        url: '../bd/uploadFiles.php',
		        data: {files: product.imagesToUpload,
		        		type: "producto",
		        		product: product}
		      }).then(function(response){
		      	if (response.status == 200){
		      		$scope.errorMsg = response.data;
		      	}else{
		      		$scope.errorMsg = response.status + ': ' + response.data;
		      	}
		      	$scope.badFiles = [];
		      	$scope.product.images = [];
		      });		
  		}

		AdminService.saveProduct(product)
			.then(function(res){	
				$modalInstance.close(res);
			}, function(error){
				 $modalInstance.close();
			})		    
  	};

	$scope.actionImages = function (images, idProd) {
		//console.log(images);
	    AdminService.deleteImagesForProducts(images, idProd)
			.then(function(res){				
				$scope.product.images = res;
				$scope.checklistToDelete = [];
				//console.log($scope.product);
			});
	};

	  $scope.cancel = function () {
	    $modalInstance.dismiss('cancel');
  	};

});
