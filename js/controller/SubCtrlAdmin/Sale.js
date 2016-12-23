angular.module("LaMaceta")
.factory("factoryData", function() {
  return {
    data: {}
  };
});

angular.module("LaMaceta")
	.controller("SubCtrlAdmin_Sale", function($scope, AdminService, $modal, factoryData, NgTableParams){

	AdminService.getAllSales()
		.then(function(res){
			$scope.sales = res;

			for (var i = 0; i < $scope.sales.length; i++) {
				$obj = res[i];
				$scope.sales[i].state = {description: $obj.state, id: $obj.idState};				
			}
			$scope.salesConfigTableParams = new NgTableParams({}, { dataset: $scope.sales});
		});    

	AdminService.getAllSaleStates()
		.then(function(res){
			$scope.states = res;
		});   


	$scope.openDetailSaleModal = function (saleNumber) {
	    var modalInstance = $modal.open({
	      animation: true,
		  templateUrl: '../theme/sale-detail-modal.html',
	      controller: 'SaleDetailModalCtrl',
	      scope: $scope,
	      resolve: {
	        sales: function () {	
	        	factoryData.data.saleNumber = saleNumber;
        	}
	      }

	    });
    }

	$scope.changeState = function (saleNumber, state) {	
		AdminService.changeState(saleNumber, state)
			.then(function(res){
				$scope.sales = res;

				for (var i = 0; i < res.length; i++) {
					$obj = res[i];
					$scope.sales[i].state = {description: $obj.state, id: $obj.idState};					
				}
				console.log($scope.sales);
				$scope.salesConfigTableParams = new NgTableParams({}, { dataset: $scope.sales});
		})
	};
});

angular.module('LaMaceta').controller('SaleDetailModalCtrl', function ($scope, AdminService, $modalInstance, factoryData) {

	$scope.saleNumber = factoryData.data.saleNumber;

	AdminService.getDetailSaleBySaleNumber($scope.saleNumber)
		.then(function(res){
		console.log(res);	
			$scope.details = res;
		}, function(error){
	});	

	  $scope.close = function () {
	    $modalInstance.dismiss('cancel');
  	};

});