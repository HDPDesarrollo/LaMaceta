<?php



use Doctrine\ORM\Mapping as ORM;

/**
 * City
 *
 * @ORM\Table(name="city", indexes={@ORM\Index(name="idx_state", columns={"id_province"})})
 * @ORM\Entity
 */
class City
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
     * @var integer
     *
     * @ORM\Column(name="zip_code", type="integer", nullable=false)
     */
    public $zipCode;

    /**
     * @var \Province
     *
     * @ORM\ManyToOne(targetEntity="Province")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="id_province", referencedColumnName="id")
     * })
     */
    public $idProvince;



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
     * @return City
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
     * @return City
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
     * Set zipCode
     *
     * @param integer $zipCode
     * @return City
     */
    public function setZipCode($zipCode)
    {
        $this->zipCode = $zipCode;

        return $this;
    }

    /**
     * Get zipCode
     *
     * @return integer 
     */
    public function getZipCode()
    {
        return $this->zipCode;
    }

    /**
     * Set idProvince
     *
     * @param \Province $idProvince
     * @return City
     */
    public function setIdProvince(\Province $idProvince = null)
    {
        $this->idProvince = $idProvince;

        return $this;
    }

    /**
     * Get idProvince
     *
     * @return \Province 
     */
    public function getIdProvince()
    {
        return $this->idProvince;
    }
}
