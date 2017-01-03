angular.module("LaMaceta", ["angular-loading-bar", "ngAnimate"])
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