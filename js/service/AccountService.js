angular.module("LaMaceta")
	.service("AccountService", function($http){

    this.getAllAddresses = function(){
      return $http.post('../bd/AccountBd.php', {data: {action:'getAllAddresses'}})
                    .then(function(response) {
                    //console.log( response.data);   
                    return response.data;          
                      },function errorCallback(response) {        
                          console.log( response);           
                      });
    };


});		