var app = angular.module("LaMaceta", ["ui.bootstrap", "ngAnimate", "ngSanitize", "ngTable", "checklist-model", "ngCookies", "ngFileUpload", "satellizer"]);

app.config(function($authProvider){


		// $authProvider.loginUrl='LaMaceta/PHP/clases/autentificador.php';
		$authProvider.loginUrl='LaMaceta/bd/LoginBd.php';
		// $authProvider.signupUrl='LaMaceta/PHP/clases/autentificador.php';
		$authProvider.tokenName='tokenMaceta'
		$authProvider.tokenPrefix= 'maceta';
		$authProvider.authHeader= 'Data';

	}); // fin config