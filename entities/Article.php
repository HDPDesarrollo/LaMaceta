<?php



use Doctrine\ORM\Mapping as ORM;

/**
 * Article
 *
 * @ORM\Table(name="article", indexes={@ORM\Index(name="idx_article_color", columns={"id_color"}), @ORM\Index(name="idx_article_size", columns={"id_size"}), @ORM\Index(name="idx_article_prod", columns={"id_prod"})})
 * @ORM\Entity
 */
class Article
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
     * @ORM\Column(name="stock", type="integer", nullable=false)
     */
    public $stock;

    /**
     * @var integer
     *
     * @ORM\Column(name="min_stock", type="integer", nullable=false)
     */
    public $minStock;

    /**
     * @var string
     *
     * @ORM\Column(name="sku", type="string", length=100, nullable=true)
     */
    public $sku;

    /**
     * @var float
     *
     * @ORM\Column(name="price", type="float", precision=15, scale=4, nullable=false)
     */
    public $price;

    /**
     * @var float
     *
     * @ORM\Column(name="old_price", type="float", precision=15, scale=4, nullable=true)
     */
    public $oldPrice;

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
     * @var \Color
     *
     * @ORM\ManyToOne(targetEntity="Color")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="id_color", referencedColumnName="id")
     * })
     */
    public $idColor;

    /**
     * @var \Size
     *
     * @ORM\ManyToOne(targetEntity="Size")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="id_size", referencedColumnName="id")
     * })
     */
    public $idSize;



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
     * @return Article
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
     * Set stock
     *
     * @param integer $stock
     * @return Article
     */
    public function setStock($stock)
    {
        $this->stock = $stock;

        return $this;
    }

    /**
     * Get stock
     *
     * @return integer 
     */
    public function getStock()
    {
        return $this->stock;
    }

    /**
     * Set minStock
     *
     * @param integer $minStock
     * @return Article
     */
    public function setMinStock($minStock)
    {
        $this->minStock = $minStock;

        return $this;
    }

    /**
     * Get minStock
     *
     * @return integer 
     */
    public function getMinStock()
    {
        return $this->minStock;
    }

    /**
     * Set sku
     *
     * @param string $sku
     * @return Article
     */
    public function setSku($sku)
    {
        $this->sku = $sku;

        return $this;
    }

    /**
     * Get sku
     *
     * @return string 
     */
    public function getSku()
    {
        return $this->sku;
    }

    /**
     * Set price
     *
     * @param float $price
     * @return Article
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
     * Set oldPrice
     *
     * @param float $oldPrice
     * @return Article
     */
    public function setOldPrice($oldPrice)
    {
        $this->oldPrice = $oldPrice;

        return $this;
    }

    /**
     * Get oldPrice
     *
     * @return float 
     */
    public function getOldPrice()
    {
        return $this->oldPrice;
    }

    /**
     * Set idProd
     *
     * @param \Product $idProd
     * @return Article
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

    /**
     * Set idColor
     *
     * @param \Color $idColor
     * @return Article
     */
    public function setIdColor(\Color $idColor = null)
    {
        $this->idColor = $idColor;

        return $this;
    }

    /**
     * Get idColor
     *
     * @return \Color 
     */
    public function getIdColor()
    {
        return $this->idColor;
    }

    /**
     * Set idSize
     *
     * @param \Size $idSize
     * @return Article
     */
    public function setIdSize(\Size $idSize = null)
    {
        $this->idSize = $idSize;

        return $this;
    }

    /**
     * Get idSize
     *
     * @return \Size 
     */
    public function getIdSize()
    {
        return $this->idSize;
    }
}
