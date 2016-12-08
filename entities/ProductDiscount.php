<?php



use Doctrine\ORM\Mapping as ORM;

/**
 * ProductDiscount
 *
 * @ORM\Table(name="product_discount", indexes={@ORM\Index(name="idx_product", columns={"id_product"}), @ORM\Index(name="idx_discount", columns={"id_discount"})})
 * @ORM\Entity
 */
class ProductDiscount
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
     * @var \Product
     *
     * @ORM\ManyToOne(targetEntity="Product", fetch="EAGER")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="id_product", referencedColumnName="id")
     * })
     */
    public $idProduct;

    /**
     * @var \Discount
     *
     * @ORM\ManyToOne(targetEntity="Discount", fetch="EAGER")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="id_discount", referencedColumnName="id")
     * })
     */
    public $idDiscount;

    /**
     * Set id
     *
     * @param integer $id
     * @return ProductDiscount
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
     * Set idProduct
     *
     * @param \Product $idProduct
     * @return ProductDiscount
     */
    public function setIdProduct(\Product $idProduct = null)
    {
        $this->idProduct = $idProduct;

        return $this;
    }

    /**
     * Get idProduct
     *
     * @return \Product 
     */
    public function getIdProduct()
    {
        return $this->idProduct;
    }

    /**
     * Set idDiscount
     *
     * @param \Discount $idDiscount
     * @return ProductDiscount
     */
    public function setIdDiscount(\Discount $idDiscount = null)
    {
        $this->idDiscount = $idDiscount;

        return $this;
    }

    /**
     * Get idDiscount
     *
     * @return \Discount 
     */
    public function getIdDiscount()
    {
        return $this->idDiscount;
    }
}
