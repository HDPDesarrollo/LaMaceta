angular.module("LaMaceta")
	.service("AccountService", function($http){

    //Address
    this.getAllAddresses = function(){
      return $http.post('../bd/AccountBd.php', {data: {action:'getAllAddresses'}})
                    .then(function(response) { 
                    return response.data;          
                      },function errorCallback(response) {        
                          console.log( response);           
                      });
    };

    this.getAllProvinces = function(){
      return $http.post('../bd/AccountBd.php', {data: {action:'getAllProvinces'}})
                    .then(function(response) { 
                    return response.data;          
                      },function errorCallback(response) {        
                          console.log( response);           
                      });
    };


     this.saveAddress = function(address){
      return address.id ? updateAddress(address) : createAddress(address);
    };

    var createAddress = function(address){  
      return $http.post('../bd/AccountBd.php', {data: {address: address, action:'saveAddress'}})
            .then(function(response) {      
                return response.data;    
            },function errorCallback(response) {        
                console.log(response);           
            });
    };

    var updateAddress = function(address){
      return $http.post('../bd/AccountBd.php', {data: {address: address, action:'updateAddress'}})
            .then(function(response) {    
                 return response.data;    
            },function errorCallback(response) {        
                console.log(response);           
            });
    };

    this.removeAddress = function(address){
      return $http.post('../bd/AccountBd.php', {data: {address: address, action:'deleteAddress'}})
                    .then(function(response) {  ;
                    return response.data;          
                      },function errorCallback(response) {        
                          console.log( response);           
                      });
    };

    //User

    this.getUser = function(){
      return $http.post('../bd/AccountBd.php', {data: {action:'getUser'}})
                    .then(function(response) {
                   //console.log(response); 
                    return response.data;          
                      },function errorCallback(response) {        
                          console.log( response);           
                      });
    };


    this.updateProfile = function(user){
      return $http.post('../bd/AccountBd.php', {data: {user: user, action:'updateProfile'}})
                    .then(function(response) {  
                      //console.log(response); 
                    return response.data;          
                      },function errorCallback(response) {        
                          console.log( response);           
                      });
    };

    //Purchase
    this.getAllPurchases = function(){//pasar el id del user
      return $http.post('../bd/AccountBd.php', {data: {action:'getAllPurchases'}})
                    .then(function(response) {  
                      //console.log(response); 
                    return response.data;          
                      },function errorCallback(response) {        
                          console.log( response);           
                      });
    };

    this.cancelPurchase = function(purchase){
      return $http.post('../bd/AccountBd.php', {data: {purchase: purchase, action:'cancelPurchase'}})
                    .then(function(response) {  
                      //console.log(response); 
                    return response.data;          
                      },function errorCallback(response) {        
                          console.log( response);           
                      });
    };
    


});		