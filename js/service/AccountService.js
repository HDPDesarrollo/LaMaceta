angular.module("LaMaceta")
	.service("AccountService", function($http){

    this.getRejectedSales = function(user){
      return $http.post('../bd/AccountBd.php', {data: {user: user, action:'getRejectedSales'}})
                    .then(function(response) { 
                    return response.data;          
                      },function errorCallback(response) {        
                          console.log( response);           
                      });
    };

    this.pagarBlacklist = function(user){
      return $http.post('../bd/AccountBd.php', {data: {user: user, action:'pagarBlacklist'}})
                    .then(function(response) { 
                    return response.data;          
                      },function errorCallback(response) {        
                          console.log( response);           
                      });
    };
    //Address
    this.getAllAddresses = function(user){
      return $http.post('../bd/AccountBd.php', {data: {user: user, action:'getAllAddresses'}})
                    .then(function(response) { 
                    return response.data;          
                      },function errorCallback(response) {        
                          console.log( response);           
                      });
    };

    this.getAllActiveAddresses = function(user){
      return $http.post('../bd/AccountBd.php', {data: {user: user, action:'getAllActiveAddresses'}})
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
    
    
    this.saveAddress = function(address, user){
      return address.id ? updateAddress(address, user) : createAddress(address, user);
    };

    var createAddress = function(address, user){  
      return $http.post('../bd/AccountBd.php', {data: {address: address, user: user, action:'saveAddress'}})
            .then(function(response) {      
                return response.data;    
            },function errorCallback(response) {        
                console.log(response);           
            });
    };

    var updateAddress = function(address, user){
      return $http.post('../bd/AccountBd.php', {data: {address: address, user: user, action:'updateAddress'}})
            .then(function(response) {    
                 return response.data;    
            },function errorCallback(response) {        
                console.log(response);           
            });
    };

    this.removeAddress = function(address, user){
      return $http.post('../bd/AccountBd.php', {data: {address: address, user: user, action:'deleteAddress'}})
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
    this.getAllPurchases = function(user){//pasar el id del user
      return $http.post('../bd/AccountBd.php', {data: {user: user, action:'getAllPurchases'}})
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
    this.sendAgain = function(purchase){
      return $http.post('../bd/AccountBd.php', {data: {purchase: purchase, action:'sendAgain'}})
                    .then(function(response) {  
                      //console.log(response); 
                    return response.data;          
                      },function errorCallback(response) {        
                          console.log( response);           
                      });
    };
    

    this.confirmCheckout = function(checkout){  
      return $http.post('../bd/AccountBd.php', {data: {checkout: checkout, action:'confirmCheckout'}})
            .then(function(response) {   
            //console.log(response.data);   
                return response.data;    
            },function errorCallback(response) {        
                console.log(response);           
            });
    };

    this.checkMinStock = function(artId){  
      return $http.post('../bd/AccountBd.php', {data: {artId: artId, action:'checkMinStock'}})
            .then(function(response) {   
           //console.log(response.data);   
                return response.data;    
            },function errorCallback(response) {        
                console.log(response);           
            });
    };

    this.GetCostShipping = function(datos){
     this.BASE_URL = "https://api.mercadolibre.com";
      this.body_url = "/sites/MLA/shipping_options?zip_code_from="+datos.cp_from+"&zip_code_to="+datos.cp_to+"&dimensions="+datos.dimensions;
      return $http.get(this.BASE_URL+this.body_url)
      .then(function(response){
        return response.data;
      });
    }

    
});		