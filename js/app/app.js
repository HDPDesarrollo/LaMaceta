var app = angular.module("LaMaceta", ["ui.bootstrap", "ngAnimate", "ngSanitize", "ngTable", "checklist-model", "ngCookies", "ngFileUpload", "satellizer","angular-md5"]);

app.config(function($authProvider){


		// $authProvider.loginUrl='LaMaceta/PHP/clases/autentificador.php';
		$authProvider.loginUrl='http://lamacetaweb.com.ar/lamaceta/bd/LoginBd.php';
		// $authProvider.signupUrl='LaMaceta/PHP/clases/autentificador.php';
		$authProvider.tokenName='tokenMaceta'
		$authProvider.tokenPrefix= 'maceta';
		$authProvider.authHeader= 'Data';

	}); // fin config