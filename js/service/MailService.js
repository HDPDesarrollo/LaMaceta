var module = angular.module('LaMaceta');

module.service("MailService", function($http){

	this.mailMinStock = function(idArticulo){
      return $http.post('../bd/MailBD.php', {data: {idArticulo: idArticulo, action:'mailMinStock'}})
                    .then(function(response) { 
                    return response.data;          
                      },function errorCallback(response) {        
                          console.log( response);           
                      });
    };

    this.mailDetailCheckout = function(idSale){
      return $http.post('../bd/MailBD.php', {data: {idSale: idSale, action:'mailDetailCheckout'}})
                    .then(function(response) { 
                    return response.data;          
                      },function errorCallback(response) {        
                          console.log( response);           
                      });

    };

});
