var app = angular.module('LaMaceta');

app.service('ServiceCart', ['$http', function($http,producto){

	this.path = "../clases/Carro/";

	var SendHttp = function(url,dato){
		return $http.post(url, dato)
		.then(function(rst){
			return rst.data;
		});
	};

	//producto es el id y la cantidad pero en formato array
	this.Add = function(articulo){
	return SendHttp(this.path+"carrito.add.php", articulo);
	};

	this.GetStock = function(id){
		return SendHttp(this.path+"carrito.stock.php", {id:id});
	};

	this.DeletePerId = function(id){
		return SendHttp(this.path+"carrito.deleteId.php", {id:id});
	};

	this.DeleteAll = function(){
		return SendHttp(this.path+"carrito.GetDeleteAll.php",{data:"DeleteAll"})
	};

	this.GetAll = function(){
		return SendHttp("../clases/Carro/carrito.GetAll.php",{data:"getAll"});
	};

	this.ConfOrden = function(Carrito,CostoEnvio){
		return SendHttp("../entities/Payment.php",{art:Carrito,ShipInf:CostoEnvio});
	}
	
}]);
