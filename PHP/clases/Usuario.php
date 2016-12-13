<?php
require_once"accesoDatos.php";

class usuario
{
//--------------------------------------------------------------------------------//
//--ATRIBUTOS
	public $id;
	public $nombre;
 	public $mail;

//--------------------------------------------------------------------------------//


//--------------------------------------------------------------------------------//
//--CONSTRUCTOR
	public function __construct($id=NULL)
	{
		if($id != NULL){
			$obj = usuario::TraerUnausuario($id);

			$this->nombre = $obj->nombre;
			$this->id = $id;
			$this->mail = $obj->mail;

		}
	}

//--------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------//
//--METODO DE CLASE
	public static function TraerUnausuario($idParametro)
	{


		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();

		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT nombre, mail FROM usuario WHERE id = :id");
		$consulta->bindValue(':id', $idParametro, PDO::PARAM_INT);
		$consulta->execute();
		$usuarioBuscada= $consulta->fetchObject('usuario');
		return $usuarioBuscada;

	}

	public static function TraerTodasLasusuarios()
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT id, nombre, mail from usuario");
		$consulta->execute();
		$arrusuarios= $consulta->fetchAll(PDO::FETCH_CLASS, "usuario");
		return $arrusuarios;
	}

	public static function Borrarusuario($idParametro)
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
		$consulta =$objetoAccesoDato->RetornarConsulta("DELETE FROM usuario	WHERE id=:id");
		$consulta->bindValue(':id',$idParametro, PDO::PARAM_INT);
		$consulta->execute();
		return $consulta->rowCount();

	}

	public static function Modificarusuario($usuario)
	{
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();

			$consulta =$objetoAccesoDato->RetornarConsulta("UPDATE usuario SET nombre=:nombre,mail=:mail WHERE id=:id");
			$consulta->bindValue(':id',$usuario->id, PDO::PARAM_INT);
			$consulta->bindValue(':nombre',$usuario->nombre, PDO::PARAM_STR);
			$consulta->bindValue(':mail',$usuario->mail, PDO::PARAM_STR);
			return $consulta->execute();
	}

//--------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------//

	public static function Insertarusuario($usuario)
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
		$consulta =$objetoAccesoDato->RetornarConsulta("INSERT INTO usuario (nombre,mail) VALUES(:nombre,:mail)");
			$consulta->bindValue(':nombre',$usuario->nombre, PDO::PARAM_STR);
			$consulta->bindValue(':mail',$usuario->mail, PDO::PARAM_STR);
		$consulta->execute();
		return $objetoAccesoDato->RetornarUltimoIdInsertado();


	}

	public static function fijateSiEstaElUser($nom,$mail)
	{
		try {
				$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
				$consulta = $objetoAccesoDato->RetornarConsulta("SELECT id,nombre,mail FROM usuario WHERE nombre = ? and mail = ?");
				$consulta->bindValue(1,$nom,PDO::PARAM_STR);
				$consulta->bindValue(2,$mail,PDO::PARAM_STR);
				$consulta->execute();
                $resultado=$consulta->fetchObject('usuario');
               // $resultado= $consulta->fetchAll(PDO::FETCH_CLASS, "usuario");
				//$resultado = $consulta->fetchAll();
				return $resultado;

		} catch (PDOException $e) {

			$e->getMessage();

		}
	}

}




?>