<?php



use Doctrine\ORM\Mapping as ORM;

/**
 * Size
 *
 * @ORM\Table(name="size")
 * @ORM\Entity
 */
class Size
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
     * @ORM\Column(name="size", type="string", length=100, nullable=false)
     */
    public $size;

    /**
     * @var float
     *
     * @ORM\Column(name="large", type="float", precision=15, scale=4, nullable=true)
     */
    public $large;

    /**
     * @var float
     *
     * @ORM\Column(name="width", type="float", precision=15, scale=4, nullable=true)
     */
    public $width;

    /**
     * @var float
     *
     * @ORM\Column(name="wedge", type="float", precision=15, scale=4, nullable=true)
     */
    public $wedge;

    /**
     * @var \Provider
     *
     * @ORM\ManyToOne(targetEntity="Provider", fetch="EAGER")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="id_provider", referencedColumnName="id")
     * })
     */
    public $idProvider;

    /**
     * Set id
     *
     * @param integer $id
     * @return Size
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
     * @return Size
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
     * Set size
     *
     * @param string $size
     * @return Size
     */
    public function setSize($size)
    {
        $this->size = $size;

        return $this;
    }

    /**
     * Get size
     *
     * @return string 
     */
    public function getSize()
    {
        return $this->size;
    }

    /**
     * Set large
     *
     * @param float $large
     * @return Size
     */
    public function setLarge($large)
    {
        $this->large = $large;

        return $this;
    }

    /**
     * Get large
     *
     * @return float 
     */
    public function getLarge()
    {
        return $this->large;
    }

    /**
     * Set width
     *
     * @param float $width
     * @return Size
     */
    public function setWidth($width)
    {
        $this->width = $width;

        return $this;
    }

    /**
     * Get width
     *
     * @return float 
     */
    public function getWidth()
    {
        return $this->width;
    }

    /**
     * Set waist
     *
     * @param float $waist
     * @return Size
     */
    public function setWedge($wedge)
    {
        $this->wedge = $wedge;

        return $this;
    }

    /**
     * Get wedge
     *
     * @return float 
     */
    public function getWedge()
    {
        return $this->wedge;
    }

        /**
     * Set idProvider
     *
     * @param \Provider $idProvider
     * @return Size
     */
    public function setIdProvider(\Provider $idProvider = null)
    {
        $this->idProvider = $idProvider;

        return $this;
    }

    /**
     * Get idProvider
     *
     * @return \Provider 
     */
    public function getIdProvider()
    {
        return $this->idProvider;
    }
}
