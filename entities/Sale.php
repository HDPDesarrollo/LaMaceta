<?php



use Doctrine\ORM\Mapping as ORM;

/**
 * Sale
 *
 * @ORM\Table(name="sale", indexes={@ORM\Index(name="idx_sale_user", columns={"id_user"})})
 * @ORM\Entity
 */
class Sale
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
     * @ORM\Column(name="date", type="datetime", nullable=false)
     */
    public $date;

    /**
     * @var float
     *
     * @ORM\Column(name="price", type="float", precision=15, scale=4, nullable=false)
     */
    public $price;

    /**
     * @var integer
     *
     * @ORM\Column(name="discount", type="integer", nullable=true)
     */
    public $discount;

    /**
     * @var integer
     *
     * @ORM\Column(name="sale_number", type="integer", nullable=false)
     */
    public $saleNumber;

    /**
     * @var \User
     *
     * @ORM\ManyToOne(targetEntity="User")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="id_user", referencedColumnName="id")
     * })
     */
    public $idUser;

    /**
     * Set id
     *
     * @param integer $id
     * @return Sale
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
     * @return Sale
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
     * Set date
     *
     * @param \DateTime $date
     * @return Sale
     */
    public function setDate($date)
    {
        $this->date = $date;

        return $this;
    }

    /**
     * Get date
     *
     * @return \DateTime 
     */
    public function getDate()
    {
        return $this->date;
    }

    /**
     * Set price
     *
     * @param float $price
     * @return Sale
     */
    public function setPrice($price)
    {
        $this->price = $price;

        return $this;
    }

    /**
     * Get price
     *
     * @return float 
     */
    public function getPrice()
    {
        return $this->price;
    }

    /**
     * Set discount
     *
     * @param integer $discount
     * @return Sale
     */
    public function setDiscount($discount)
    {
        $this->discount = $discount;

        return $this;
    }

    /**
     * Get discount
     *
     * @return integer 
     */
    public function getDiscount()
    {
        return $this->discount;
    }

    /**
     * Set saleNumber
     *
     * @param integer $saleNumber
     * @return Sale
     */
    public function setSaleNumber($saleNumber)
    {
        $this->saleNumber = $saleNumber;

        return $this;
    }

    /**
     * Get saleNumber
     *
     * @return integer 
     */
    public function getSaleNumber()
    {
        return $this->saleNumber;
    }

    /**
     * Set idUser
     *
     * @param \User $idUser
     * @return Sale
     */
    public function setIdUser(\User $idUser = null)
    {
        $this->idUser = $idUser;

        return $this;
    }

    /**
     * Get idUser
     *
     * @return \User 
     */
    public function getIdUser()
    {
        return $this->idUser;
    }
}
