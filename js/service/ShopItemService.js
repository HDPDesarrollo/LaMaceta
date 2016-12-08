angular.module("LaMaceta")
	.service("ShopItemService", function($http){

    this.getPicturesByProdId = function(id){
      return $http.post('../bd/ShopItemBd.php', {data: {id: id, action:'getPicturesByProdId'}})
                    .then(function(response) {
                   //console.log( response);   
                    return response.data;          
                      },function errorCallback(response) {        
                          console.log( response);           
                      });
    };

    this.getArticlesByProdId = function(id){
      return $http.post('../bd/ShopItemBd.php', {data: {id: id, action:'getArticlesByProdId'}})
                    .then(function(response) {
                   //console.log( response);   
                    return response.data;          
                      },function errorCallback(response) {        
                          console.log( response);           
                      });
    };

    this.validateStockByArticle = function(idProd, idSize, idColor, quantity){
      return $http.post('../bd/ShopItemBd.php', {data: {idProd: idProd, idSize: idSize, idColor: idColor, quantity: quantity, action:'validateStockByArticle'}})
                    .then(function(response) {
                   //console.log( response);   
                    return response.data;          
                      },function errorCallback(response) {        
                          console.log( response);           
                      });
    };

    this.getPromotions = function(idBankCard){
      return $http.post('../bd/ShopItemBd.php', {data: {idBankCard: idBankCard, action:'getPromotions'}})
                    .then(function(response) {
                   //console.log( response);   
                    return response.data;          
                      },function errorCallback(response) {        
                          console.log( response);           
                      });
    };

    this.validateStockByArticleCheckout = function(articles){

     /* return new Promise(function(resolve, reject) {       
        $errorList = [];
        for (var i = 0; i < articles.length; i++) {
          $article = articles[i];
          $idArticle = null;
                  $http.post('../bd/ShopItemBd.php', {data: {idProd: $article.idProd.id, idSize: $article.idSize.id, idColor: $article.idColor.id, 
                    quantity: $article.quantity, action:'validateStockByArticle'}})
                      .then(function(res) {
                        //console.log(res.data);
                             $idArticle = res.data[0].ID;//deberia ser solo uno

                            if($idArticle==null){
                              $errorList.push($article.idProd.name);
                            }
                        },function errorCallback(res) {        
                            console.log( res);           
                        }); 
        }
      });*/


              return new Promise(function(resolve, reject) {
                $("#output").append("start");

                setTimeout(function() {
                  resolve();
                }, 1000);
              }).then(function() {
                $("#output").append(" middle");
                return " end";
              });

  };

});		