<?php



use Doctrine\ORM\Mapping as ORM;

/**
 * Article
 *
 * @ORM\Table(name="article", indexes={@ORM\Index(name="art-color", columns={"id_color"}), @ORM\Index(name="art-size", columns={"id_size"}), @ORM\Index(name="art-prod", columns={"id_prod"})})
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
    private $id;

    /**
     * @var integer
     *
     * @ORM\Column(name="stock", type="integer", nullable=false)
     */
    private $stock;

    /**
     * @var integer
     *
     * @ORM\Column(name="min_stock", type="integer", nullable=false)
     */
    private $minStock;

    /**
     * @var boolean
     *
     * @ORM\Column(name="active", type="boolean", nullable=false)
     */
    private $active;

    /**
     * @var string
     *
     * @ORM\Column(name="sku", type="string", length=32, nullable=true)
     */
    private $sku;

    /**
     * @var \Color
     *
     * @ORM\ManyToOne(targetEntity="Color")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="id_color", referencedColumnName="id")
     * })
     */
    private $idColor;

    /**
     * @var \Product
     *
     * @ORM\ManyToOne(targetEntity="Product")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="id_prod", referencedColumnName="id")
     * })
     */
    private $idProd;

    /**
     * @var \Size
     *
     * @ORM\ManyToOne(targetEntity="Size")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="id_size", referencedColumnName="id")
     * })
     */
    private $idSize;


}
