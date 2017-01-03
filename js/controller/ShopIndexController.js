angular.module("LaMaceta", ["angular-loading-bar", "ngAnimate"])
      .config(['cfpLoadingBarProvider', function (cfpLoadingBarProvider) {
          cfpLoadingBarProvider.parentSelector = '#loading-bar-container';
          cfpLoadingBarProvider.spinnerTemplate = '<div class="text-center"><span class="fa fa-spinner">CARGANDO...</div>';
      }])
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