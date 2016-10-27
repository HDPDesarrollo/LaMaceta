<?php



use Doctrine\ORM\Mapping as ORM;

/**
 * SaleState
 *
 * @ORM\Table(name="sale_state", indexes={@ORM\Index(name="idx_state", columns={"id_state"}), @ORM\Index(name="idx_sale", columns={"id_sale"})})
 * @ORM\Entity
 */
class SaleState
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
     * @var \DateTime
     *
     * @ORM\Column(name="last_update", type="datetime", nullable=false)
     */
    public $lastUpdate;

    /**
     * @var string
     *
     * @ORM\Column(name="motive", type="string", length=100, nullable=false)
     */
    public $motive;

    /**
     * @var \Sale
     *
     * @ORM\ManyToOne(targetEntity="Sale")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="id_sale", referencedColumnName="id")
     * })
     */
    public $idSale;

    /**
     * @var \State
     *
     * @ORM\ManyToOne(targetEntity="State")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="id_state", referencedColumnName="id")
     * })
     */
    public $idState;

    /**
     * Set id
     *
     * @param integer $id
     * @return SaleState
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
     * @return SaleState
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
     * Set lastUpdate
     *
     * @param \DateTime $lastUpdate
     * @return SaleState
     */
    public function setLastUpdate($lastUpdate)
    {
        $this->lastUpdate = $lastUpdate;

        return $this;
    }

    /**
     * Get lastUpdate
     *
     * @return \DateTime 
     */
    public function getLastUpdate()
    {
        return $this->lastUpdate;
    }

    /**
     * Set motive
     *
     * @param string $motive
     * @return SaleState
     */
    public function setMotive($motive)
    {
        $this->motive = $motive;

        return $this;
    }

    /**
     * Get motive
     *
     * @return string 
     */
    public function getMotive()
    {
        return $this->motive;
    }

    /**
     * Set idSale
     *
     * @param \Sale $idSale
     * @return SaleState
     */
    public function setIdSale(\Sale $idSale = null)
    {
        $this->idSale = $idSale;

        return $this;
    }

    /**
     * Get idSale
     *
     * @return \Sale 
     */
    public function getIdSale()
    {
        return $this->idSale;
    }

    /**
     * Set idState
     *
     * @param \State $idState
     * @return SaleState
     */
    public function setIdState(\State $idState = null)
    {
        $this->idState = $idState;

        return $this;
    }

    /**
     * Get idState
     *
     * @return \State 
     */
    public function getIdState()
    {
        return $this->idState;
    }
}
