<?php



use Doctrine\ORM\Mapping as ORM;

/**
 * DetailSale
 *
 * @ORM\Table(name="detail_sale", indexes={@ORM\Index(name="idx_detail_sale", columns={"id_sale"}), @ORM\Index(name="idx_detail_article", columns={"id_article"})})
 * @ORM\Entity
 */
class DetailSale
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
     * @var integer
     *
     * @ORM\Column(name="quantity", type="integer", nullable=false)
     */
    public $quantity;

    /**
     * @var float
     *
     * @ORM\Column(name="unit_price", type="float", precision=15, scale=4, nullable=false)
     */
    public $unitPrice;

    /**
     * @var \Article
     *
     * @ORM\ManyToOne(targetEntity="Article")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="id_article", referencedColumnName="id")
     * })
     */
    public $idArticle;

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
     * @return DetailSale
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
     * Set quantity
     *
     * @param integer $quantity
     * @return DetailSale
     */
    public function setQuantity($quantity)
    {
        $this->quantity = $quantity;

        return $this;
    }

    /**
     * Get quantity
     *
     * @return integer 
     */
    public function getQuantity()
    {
        return $this->quantity;
    }

    /**
     * Set unitPrice
     *
     * @param float $unitPrice
     * @return DetailSale
     */
    public function setUnitPrice($unitPrice)
    {
        $this->unitPrice = $unitPrice;

        return $this;
    }

    /**
     * Get unitPrice
     *
     * @return float 
     */
    public function getUnitPrice()
    {
        return $this->unitPrice;
    }

    /**
     * Set idArticle
     *
     * @param \Article $idArticle
     * @return DetailSale
     */
    public function setIdArticle(\Article $idArticle = null)
    {
        $this->idArticle = $idArticle;

        return $this;
    }

    /**
     * Get idArticle
     *
     * @return \Article 
     */
    public function getIdArticle()
    {
        return $this->idArticle;
    }

    /**
     * Set idSale
     *
     * @param \Sale $idSale
     * @return DetailSale
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
}
