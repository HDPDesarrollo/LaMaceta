angular.module("LaMaceta")
	.controller("SubCtrlAdmin_Report", function($window, $scope, AdminService, $modal, factoryData, NgTableParams, $cookies, Upload){

	$scope.checkErr = function(startDate,endDate) {
        if(new Date(startDate) > new Date(endDate))
		    return true;
	    return false;
    };

    $scope.generateReport = function(report){
    	AdminService.generateReport(report)
			.then(function(res){
				console.log(res);
				$window.location.href = "../"+res;
		})
    }
});

