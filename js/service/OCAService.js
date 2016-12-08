angular.module("LaMaceta")
  .service("OCAService", function($http){

    this.getAllSales = function(){
      return $http.post('../bd/OCAInterfaceBD.php', {data: {action:'getAllSales'}})
                    .then(function(response) {
                    //console.log( response.data);   
                    return response.data;          
                      },function errorCallback(response) {        
                          console.log( response);           
                      });
    };

    this.editSale = function(sale, newState, motive){
      return $http.post('../bd/OCAInterfaceBD.php', {data: {sale: sale, newState: newState, motive: motive, action:'editSale'}})
                    .then(function(response) {
                    console.log( response.data);   
                    return response.data;          
                      },function errorCallback(response) {        
                          console.log( response);           
                      });
    };
});		