angular.module("LaMaceta")
	.controller("SubCtrlAdmin_Discount", function($window, $scope, AdminService, $modal, factoryData, NgTableParams, $cookies, Upload){

	AdminService.getAllProductDiscounts()
		.then(function(res){				
			$scope.discounts = res;

			for (var i = 0; i < $scope.discounts.length; i++) {
				$scope.discounts[i].active = {active: $scope.discounts[i].active};
			}
			console.log(res);
		}, function(error){
	});	

	$scope.openDiscountModal = function (user) {
	    var modalInstance = $modal.open({
	      animation: true,
	      templateUrl: '../theme/discount-modal.html',
	      controller: 'DiscountModalCtrl',
	      size: 'lg',
	      resolve: {
	      }

	    }).result.then(function() {

	    });
    }   

	$scope.discountStatus = [{active: true, title: "ACTIVO"},
							{active: false, title: "INACTIVO"}]; 




	$scope.changeStateDiscount = function (prodId, status) {
		AdminService.changeStatusProductDiscount(prodId, status.active)
			.then(function(res){
				$scope.products = res;  
				for (var i = 0; i < $scope.products.length; i++) {
					$scope.products[i].active = {active: $scope.products[i].active};
				}
					$scope.tableParams = new NgTableParams({        
				    }, {dataset: $scope.products});
			}, function(error){
		})		    

	};

});

angular.module('LaMaceta').controller('DiscountModalCtrl', function ($scope, NgTableParams, AdminService, $modalInstance) {

	$scope.discountStatus = [{active: true, title: "ACTIVO"},
							{active: false, title: "INACTIVO"}]; 

	$scope.discount = null;

	AdminService.getAllDiscounts()
		.then(function(res){	
			$scope.percentages = res;	
				for (var i = 0; i < $scope.percentages.length; i++) {
					$scope.percentages[i].active = {active: $scope.percentages[i].active};
				}		
		}, function(error){
	});	

	AdminService.getAllProductDiscounts()
		.then(function(res){
			//console.log(res);
			$scope.products = res;  
			for (var i = 0; i < $scope.products.length; i++) {
				$scope.products[i].active = {active: $scope.products[i].active};
			}
				$scope.tableParams = new NgTableParams({        
			    }, {dataset: $scope.products});

			    console.log($scope.products);	
	});





	$scope.cancel = function () {
	    $scope.discount = null;
	};

	$scope.changeStatusPercentage = function (percentage, status) {
		console.log(status);
	    var txt;
	    console.log(percentage);
	    if(percentage.percentage == 0){
	    	alert("No se puede eliminar el descuento por default!");
	    	return;
	    }
		var r = confirm("Esta operación modificara todos los descuentos configurados con este porcentage. ¿Desea continuar?");
		if (r == true) {
			AdminService.changeStatusPercentage(percentage, status.active)//actualizar los productos tambien asociados a los descuentos
				.then(function(res){
					//console.log(res);
					$scope.percentages = res;
						for (var i = 0; i < $scope.percentages.length; i++) {
							$scope.percentages[i].active = {active: $scope.percentages[i].active};
						}		
							
								AdminService.getAllProductDiscounts()
									.then(function(res){
										//console.log(res);
										$scope.products = res;  
										for (var i = 0; i < $scope.products.length; i++) {
											$scope.products[i].active = {active: $scope.products[i].active};
										}
											$scope.tableParams = new NgTableParams({        
										    }, {dataset: $scope.products});

										    //console.log($scope.products);	
								});
				}, function(error){
			})		    
		}
		console.log(txt);
	};

	$scope.changeStatusProductDiscount = function (prodId, status) {
		AdminService.changeStatusProductDiscount(prodId, status.active)
			.then(function(res){
				$scope.products = res;  
				for (var i = 0; i < $scope.products.length; i++) {
					$scope.products[i].active = {active: $scope.products[i].active};
				}
					$scope.tableParams = new NgTableParams({        
				    }, {dataset: $scope.products});
			}, function(error){
		})		    

	};

	$scope.changePercentageProductDiscount = function (prodId, percentage) {		
		console.log(3);
		if(prodId!=null && percentage !=null){

			AdminService.changePercentageProductDiscount(prodId, percentage)
				.then(function(res){
					$scope.products = res;  
					for (var i = 0; i < $scope.products.length; i++) {
						$scope.products[i].active = {active: $scope.products[i].active};
					}
						$scope.tableParams = new NgTableParams({        
					    }, {dataset: $scope.products});

		    		alert("Se actualizaron correctamente todos los articulos asociados al producto seleccionado");	

		    			AdminService.getAllDiscounts()
								.then(function(res){	
									$scope.percentages = res;	
										for (var i = 0; i < $scope.percentages.length; i++) {
											$scope.percentages[i].active = {active: $scope.percentages[i].active};
										}		
								}, function(error){
							});	
				}, function(error){
			})	
		};
	}	

	$scope.save = function () {
		console.log(2);
		if($scope.discount.percentage<1){
			alert("El porcentaje no puede ser menor a 1");
			$scope.discount = null;
			return;
		}
		for (var i = 0; i < $scope.percentages.length; i++) {
			if($scope.percentages[i].percentage == $scope.discount.percentage){
				alert("Ya existe un descuento con el porcentaje: "+$scope.discount.percentage);
				$scope.discount = null;
				return;
			}
		}
		AdminService.saveDiscount($scope.discount)
			.then(function(res){
				//$scope.percentages = res;
				$scope.discount = null;
			}, function(error){
			});		    
  	};


	$scope.exit = function () {
	    $modalInstance.dismiss('cancel');
	};



});