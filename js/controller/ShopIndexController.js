angular.module("LaMaceta")
      //.config(['cfpLoadingBarProvider', function (cfpLoadingBarProvider) {
      //    cfpLoadingBarProvider.parentSelector = '#loading-bar-container';
      //    cfpLoadingBarProvider.spinnerTemplate = '<div class="text-center"><span class="fa fa-spinner">CARGANDO...</div>';
      //}])
	.controller("ShopIndexController", function ($scope, ShopIndexService, ngProgressFactory) {

	    $scope.progressbar = ngProgressFactory.createInstance();
	    $scope.progressbar.start();

    $scope.myInterval = 5000;
    $scope.noWrapSlides = false;
    $scope.active = 0;
    

    ShopIndexService.getAllSliders()
            .then(function(res){
                console.log(res);
                $scope.slides = res;
                
        })

    angular.element(document).ready(function () {
        $scope.progressbar.complete();
    });

});