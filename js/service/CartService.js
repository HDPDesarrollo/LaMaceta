var module = angular.module('LaMaceta');

module.service('CartService', ['$http','$cookies', function($http,$cookies){

	this.addToCart = function(id, quantity){
				var contentCart = $cookies.getObject("cookieCart");

				//console.log(quantity);
				if(contentCart !== undefined){
					if (!existsInContentCart(contentCart,id)) {
				        contentCart.push({id:id,quantity:quantity});
				    }
					$cookies.putObject("cookieCart",contentCart);
				}else{
					var auxCart = [];
					auxCart.push({id:id,quantity:quantity});
					$cookies.putObject("cookieCart",auxCart);
				}
	}
	
	var existsInContentCart = function(contentCart, artId){
		for (var i = 0; i < contentCart.length; i++) {
			if(contentCart[i].id==artId){
				alert("YA ESTA ESE ITEM EN EL CARRITO");
				return true;
			}
		}
		return false;
	}

	this.getOneArticle = function(id){
      return $http.post('../bd/CartBd.php', {data: {id:id, action:'getOneArticle'}})
                    .then(function(response) {
                    //console.log( response.data);   
                    return response.data;          
                      },function errorCallback(response) {        
                          console.log( response);           
                      });
    };

    this.searchIcon = function(idProd){
      return $http.post('../bd/CartBd.php', {data: {idProd: idProd, action:'searchIcon'}})
                    .then(function(response) {
                    //console.log( response.data);   
                    return response.data;          
                      },function errorCallback(response) {        
                          console.log( response);           
                      });
    };
	
}]);
