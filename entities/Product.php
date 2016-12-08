<?php



use Doctrine\ORM\Mapping as ORM;

/**
 * Product
 *
 * @ORM\Table(name="product", indexes={@ORM\Index(name="idx_season", columns={"id_season"})})
 * @ORM\Entity
 */
class Product
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
     * @ORM\Column(name="name", type="string", length=100, nullable=false)
     */
    public $name;

    /**
     * @var string
     *
     * @ORM\Column(name="description", type="string", length=100, nullable=false)
     */
    public $description;

    /**
     * @var string
     *
     * @ORM\Column(name="target", type="string", length=100, nullable=false)
     */
    public $target;

    /**
     * @var string
     *
     * @ORM\Column(name="prod_type", type="string", length=100, nullable=false)
     */
    public $prodType;

    /**
     * @var \Season
     *
     * @ORM\ManyToOne(targetEntity="Season", fetch="EAGER")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="id_season", referencedColumnName="id")
     * })
     */
    public $idSeason;

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
     * @return Product
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
     * @return Product
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
     * Set name
     *
     * @param string $name
     * @return Product
     */
    public function setName($name)
    {
        $this->name = $name;

        return $this;
    }

    /**
     * Get name
     *
     * @return string 
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * Set description
     *
     * @param string $description
     * @return Product
     */
    public function setDescription($description)
    {
        $this->description = $description;

        return $this;
    }

    /**
     * Get description
     *
     * @return string 
     */
    public function getDescription()
    {
        return $this->description;
    }

    /**
     * Set target
     *
     * @param string $target
     * @return Product
     */
    public function setTarget($target)
    {
        $this->target = $target;

        return $this;
    }

    /**
     * Get target
     *
     * @return string 
     */
    public function getTarget()
    {
        return $this->target;
    }

    /**
     * Set prodType
     *
     * @param string $prodType
     * @return Product
     */
    public function setProdType($prodType)
    {
        $this->prodType = $prodType;

        return $this;
    }

    /**
     * Get prodType
     *
     * @return string 
     */
    public function getProdType()
    {
        return $this->prodType;
    }

    /**
     * Set idSeason
     *
     * @param \Season $idSeason
     * @return Product
     */
    public function setIdSeason(\Season $idSeason = null)
    {
        $this->idSeason = $idSeason;

        return $this;
    }

    /**
     * Get idSeason
     *
     * @return \Season 
     */
    public function getIdSeason()
    {
        return $this->idSeason;
    }

    /**
     * Set idProvider
     *
     * @param \Provider $idProvider
     * @return Product
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
