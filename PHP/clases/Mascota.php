<?php
require_once"accesoDatos.php";
class Mascota
{
//--------------------------------------------------------------------------------//
//--ATRIBUTOS
	public $id;
	public $nombre;
 	public $edad;
  	public $nac;
  	public $tipo;
  	public $sexo;
  	public $foto;

//--------------------------------------------------------------------------------//


//--------------------------------------------------------------------------------//
//--CONSTRUCTOR
	public function __construct($id=NULL)
	{
		if($id != NULL){
			$obj = Mascota::TraerUnaMascota($id);
			
			$this->id = $id;			
			$this->nombre = $obj->nombre;
			$this->edad = $obj->edad;
			$this->nac = $obj->nac;
			$this->tipo = $obj->tipo;
			$this->sexo = $obj->sexo;
			$this->foto = $obj->foto;
		}
	}

//--------------------------------------------------------------------------------//
//--TOSTRING	
  	public function ToString()
	{
	  	return $this->nombre."-".$this->edad."-".$this->tipo."-".$this->foto;
	}
//--------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------//
//--METODO DE CLASE
	public static function TraerUnaMascota($idParametro) 
	{	


		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 

		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT nombre, edad, nac, tipo, sexo, foto FROM mascota WHERE id = :id");
		$consulta->bindValue(':id', $idParametro, PDO::PARAM_INT);
		$consulta->execute();
		$mascotaBuscada= $consulta->fetchObject('mascota');
		return $mascotaBuscada;	
					
	}
	
	public static function TraerTodasLasMascotas()
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT id, nombre, edad, nac, tipo, sexo, foto from mascota");		
		$consulta->execute();			
		$arrMascotas= $consulta->fetchAll(PDO::FETCH_CLASS, "mascota");	
		return $arrMascotas;
	}
	
	public static function BorrarMascota($idParametro)
	{	
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("DELETE FROM mascota	WHERE id=:id");
		$consulta->bindValue(':id',$idParametro, PDO::PARAM_INT);		
		$consulta->execute();
		return $consulta->rowCount();
		
	}
	
	public static function ModificarMascota($mascota)
	{
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 

			$consulta =$objetoAccesoDato->RetornarConsulta("UPDATE mascota SET nombre=:nombre,edad=:edad,nac=:nac,tipo=:tipo,sexo=:sexo,foto=:foto WHERE id=:id");
			$consulta->bindValue(':id',$mascota->id, PDO::PARAM_INT);
			$consulta->bindValue(':nombre',$mascota->nombre, PDO::PARAM_STR);
			$consulta->bindValue(':edad',$mascota->edad, PDO::PARAM_INT);
			$consulta->bindValue(':nac', $mascota->nac, PDO::PARAM_STR);
			$consulta->bindValue(':tipo', $mascota->tipo, PDO::PARAM_STR);
			$consulta->bindValue(':sexo', $mascota->sexo, PDO::PARAM_STR);
			$consulta->bindValue(':foto', $mascota->foto, PDO::PARAM_STR);
			return $consulta->execute();
	}

//--------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------//

	public static function InsertarMascota($mascota)
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("INSERT INTO mascota (nombre,edad,nac,tipo,sexo,foto) VALUES(:nombre,:edad,:nac,:tipo,:sexo,:foto)");
			$consulta->bindValue(':nombre',$mascota->nombre, PDO::PARAM_STR);
			$consulta->bindValue(':edad',$mascota->edad, PDO::PARAM_INT);
			$consulta->bindValue(':nac', $mascota->nac, PDO::PARAM_STR);
			$consulta->bindValue(':tipo', $mascota->tipo, PDO::PARAM_STR);
			$consulta->bindValue(':sexo', $mascota->sexo, PDO::PARAM_STR);
			$consulta->bindValue(':foto', $mascota->foto, PDO::PARAM_STR);
		$consulta->execute();		
		return $objetoAccesoDato->RetornarUltimoIdInsertado();
	
				
	}	



}


?>