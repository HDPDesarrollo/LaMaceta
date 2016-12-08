angular.module("LaMaceta")
	.service("SearchService", function($http){

    
    this.search = function(word, sorting, color, priceFrom, priceTo, target, prodType){
      return $http.post('../bd/SearchBd.php', {data: {word: word, sorting: sorting, priceFrom: priceFrom, 
                                                          priceTo: priceTo, color:color, target: target, prodType: prodType, 
                                                            action:'search'}})
                    .then(function(response) {
                    //console.log(response); 
                    return response.data;          
                      },function errorCallback(response) {       
                          console.log( response);           
                      });
    };

    this.getMenu = function(){
      return $http.post('../bd/SearchBd.php', {data: {action:'getMenu'}})
                    .then(function(response) {
                    //console.log(response); 
                    return response.data;          
                      },function errorCallback(response) {       
                          console.log( response);           
                      });
    };

    this.getAllColorsByProdId = function(prodId){
      return $http.post('../bd/SearchBd.php', {data: {prodId: prodId, action:'getAllColorsByProdId'}})
                    .then(function(response) {
                    //console.log( response.data);   
                    return response.data;          
                      },function errorCallback(response) {        
                          console.log( response);           
                      });
    };


    this.getAllSizesByProdId = function(prodId){
      return $http.post('../bd/SearchBd.php', {data: {prodId: prodId, action:'getAllSizesByProdId'}})
                    .then(function(response) {
                    //console.log( response.data);   
                    return response.data;          
                      },function errorCallback(response) {        
                          console.log( response);           
                      });
    };


});		