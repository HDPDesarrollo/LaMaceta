angular.module("LaMaceta")
	.controller("ShopIndexController", function($scope, ShopIndexService){

    $scope.myInterval = 5000;
    $scope.noWrapSlides = false;
    $scope.active = 0;
    

    ShopIndexService.getAllSliders()
            .then(function(res){
                console.log(res);
                $scope.slides = res;  
        })

});