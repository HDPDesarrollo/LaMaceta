angular.module("LaMaceta")
  .service("ShopIndexService", function($http){

    this.getAllSliders = function(){
      return $http.post('../bd/ShopIndexBD.php', {data: {action:'getAllSliders'}})
                    .then(function(response) {  
                      //console.log(response.data); 
                      return response.data;          
                      },function errorCallback(response) {        
                          console.log( response);           
                      });
    };
  
});		