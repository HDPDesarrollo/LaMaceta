<?php



use Doctrine\ORM\Mapping as ORM;

/**
 * DetailSale
 *
 * @ORM\Table(name="detail_sale", indexes={@ORM\Index(name="detail-sale", columns={"id_sale"}), @ORM\Index(name="detail-article", columns={"id_article"})})
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
    private $id;

    /**
     * @var boolean
     *
     * @ORM\Column(name="active", type="boolean", nullable=false)
     */
    private $active;

    /**
     * @var integer
     *
     * @ORM\Column(name="quantity", type="integer", nullable=false)
     */
    private $quantity;

    /**
     * @var float
     *
     * @ORM\Column(name="unit_price", type="float", precision=15, scale=4, nullable=false)
     */
    private $unitPrice;

    /**
     * @var \Article
     *
     * @ORM\ManyToOne(targetEntity="Article")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="id_article", referencedColumnName="id")
     * })
     */
    private $idArticle;

    /**
     * @var \Sale
     *
     * @ORM\ManyToOne(targetEntity="Sale")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="id_sale", referencedColumnName="id")
     * })
     */
    private $idSale;


}
