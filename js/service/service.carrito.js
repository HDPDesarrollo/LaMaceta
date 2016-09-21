var app = angular.module('Lamaceta');

app.service('ServiceCart', ['$http', function($http,producto){
	
	var SendHttp = function(url,dato){
		return $http.post(url, dato)
		.then(function(rst){
			return rst.data;
		});
	};

	//producto es el id y la cantidad pero en formato array
	this.Add = function(articulo){
	return SendHttp("./modulos/carrito/carrito.add.php", articulo);
	};

	this.GetStock = function(id){
		return SendHttp("./modulos/carrito/carrito.stock.php", {id:id});
	};

	this.DeletePerId = function(id){
		return SendHttp("./modulos/carrito/carrito.deleteId.php", {id:id});
	};

	this.DeleteAll = function(){
		return SendHttp("./modulos/carrito/carrito.GetDeleteAll.php",{data:DeleteAll})
	};

	this.GetAll = function(){
		return SendHttp("./modulos/carrito/carrito.GetDeleteAll.php",{data:getAll});
	};



}]);
