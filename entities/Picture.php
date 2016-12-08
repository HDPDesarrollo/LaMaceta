<?php



use Doctrine\ORM\Mapping as ORM;

/**
 * Picture
 *
 * @ORM\Table(name="picture", indexes={@ORM\Index(name="idx_pic_prod", columns={"id_prod"})})
 * @ORM\Entity
 */
class Picture
{
    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    public $id;

    /**
     * @var boolean
     *
     * @ORM\Column(name="active", type="boolean", nullable=false)
     */
    public $active;

    /**
     * @var string
     *
     * @ORM\Column(name="path", type="string", length=100, nullable=false)
     */
    public $path;

    /**
     * @var string
     *
     * @ORM\Column(name="ruta_img", type="string", length=100, nullable=false)
     */
    public $rutaImg;

    /**
     * @var string
     *
     * @ORM\Column(name="link", type="string", length=100, nullable=false)
     */
    public $link;

    /**
     * @var \Product
     *
     * @ORM\ManyToOne(targetEntity="Product")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="id_prod", referencedColumnName="id")
     * })
     */
    public $idProd;

    /**
     * Set id
     *
     * @param integer $id
     * @return Picture
     */
    public function setId($id)
    {
        $this->id = $id;

        return $this;
    }

    /**
     * Get id
     *
     * @return integer 
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set active
     *
     * @param boolean $active
     * @return Picture
     */
    public function setActive($active)
    {
        $this->active = $active;

        return $this;
    }

    /**
     * Get active
     *
     * @return boolean 
     */
    public function getActive()
    {
        return $this->active;
    }

    /**
     * Set path
     *
     * @param string $path
     * @return Picture
     */
    public function setPath($path)
    {
        $this->path = $path;

        return $this;
    }

    /**
     * Get path
     *
     * @return string 
     */
    public function getPath()
    {
        return $this->path;
    }

    /**
     * Set rutaImg
     *
     * @param string $rutaImg
     * @return Picture
     */
    public function setRutaImg($rutaImg)
    {
        $this->rutaImg = $rutaImg;

        return $this;
    }

    /**
     * Get rutaImg
     *
     * @return string 
     */
    public function getRutaImg()
    {
        return $this->rutaImg;
    }

    /**
     * Set link
     *
     * @param string $link
     * @return Picture
     */
    public function setLink($link)
    {
        $this->link = $link;

        return $this;
    }

    /**
     * Get link
     *
     * @return string 
     */
    public function getLink()
    {
        return $this->link;
    }

    /**
     * Set idProd
     *
     * @param \Product $idProd
     * @return Picture
     */
    public function setIdProd(\Product $idProd = null)
    {
        $this->idProd = $idProd;

        return $this;
    }

    /**
     * Get idProd
     *
     * @return \Product 
     */
    public function getIdProd()
    {
        return $this->idProd;
    }
}
