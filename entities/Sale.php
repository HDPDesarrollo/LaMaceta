<?php



use Doctrine\ORM\Mapping as ORM;

/**
 * Sale
 *
 * @ORM\Table(name="sale", indexes={@ORM\Index(name="idx_sale_user", columns={"id_user"}), @ORM\Index(name="idx_sale_address", columns={"id_address"})})
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
     * @var float
     *
     * @ORM\Column(name="shipping_cost", type="float", precision=15, scale=4, nullable=true)
     */
    public $shippingCost;

    /**
     * @var float
     *
     * @ORM\Column(name="promotion", type="float", precision=15, scale=4, nullable=true)
     */
    public $promotion;

    /**
     * @var \Address
     *
     * @ORM\ManyToOne(targetEntity="Address")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="id_address", referencedColumnName="id")
     * })
     */
    public $idAddress;

    /**
     * @var string
     *
     * @ORM\Column(name="payment_method", type="string", length=100, nullable=false)
     */
    public $paymentMethod;

    /**
     * @var integer
     *
     * @ORM\Column(name="quota", type="integer", nullable=true)
     */
    public $quota;

    /**
    *@var integer
    * @ORM\Column(name="id_collection",type="integer",nullable=true)
    */
    public $id_collection;

    /**
    *@var string
    *@ORM\Column(name="link_pago", type="string", length=64, nullable=true)
    */
    public $link_pago;


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


    /**
     * Set shippingCost
     *
     * @param float $shippingCost
     * @return Sale
     */
    public function setShippingCost($shippingCost)
    {
        $this->shippingCost = $shippingCost;

        return $this;
    }

    /**
     * Get shippingCost
     *
     * @return float 
     */
    public function getShippingCost()
    {
        return $this->shippingCost;
    }

    /**
     * Set promotion
     *
     * @param float $promotion
     * @return Sale
     */
    public function setPromotion($promotion)
    {
        $this->promotion = $promotion;

        return $this;
    }

    /**
     * Get promotion
     *
     * @return float 
     */
    public function getPromotion()
    {
        return $this->promotion;
    }

    /**
     * Set idAddress
     *
     * @param \Address $idAddress
     * @return Sale
     */
    public function setIdAddress(\Address $idAddress = null)
    {
        $this->idAddress = $idAddress;

        return $this;
    }

    /**
     * Get idAddress
     *
     * @return \Address 
     */
    public function getIdAddress()
    {
        return $this->idAddress;
    }

    /**
     * Set paymentMethod
     *
     * @param string $paymentMethod
     * @return Sale
     */
    public function setPaymentMethod($paymentMethod)
    {
        $this->paymentMethod = $paymentMethod;

        return $this;
    }

    /**
     * Get paymentMethod
     *
     * @return string 
     */
    public function getPaymentMethod()
    {
        return $this->paymentMethod;
    }

    /**
     * Set quota
     *
     * @param integer $quota
     * @return Sale
     */
    public function setQuota($quota)
    {
        $this->quota = $quota;

        return $this;
    }

    /**
     * Get quota
     *
     * @return integer 
     */
    public function getQuota()
    {
        return $this->quota;
    }

    /**
     * Get id_collection
     *
     * @return integer 
     */
    public function getId_collection(){
        return $this->id_collection;
    }

    /**
     * Set id_collection
     *
     * @param integer $id_collection
     * @return Sale
     */
    public function setId_collection($id_collection){
        $this->id_collection = $id_collection;
        return $this;
    }

    /**
    * get link_pago
    * 
    * @return string
    */
    public function getLink_pago(){
        return $this->link_pago;
    }

    /**
    * set link_pago
    * @param string $link_pago 
    *
    * @return Sale
    */
    public function setLink_pago($linkPago){
        $this->link_pago = $linkPago;
        return $this;
    }


}
