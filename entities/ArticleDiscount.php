<?php



use Doctrine\ORM\Mapping as ORM;

/**
 * ArticleDiscount
 *
 * @ORM\Table(name="article_discount", indexes={@ORM\Index(name="fk_article_idx", columns={"id_article"}), @ORM\Index(name="fk_discount_idx", columns={"id_discount"})})
 * @ORM\Entity
 */
class ArticleDiscount
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
     * @var \Article
     *
     * @ORM\ManyToOne(targetEntity="Article")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="id_article", referencedColumnName="id")
     * })
     */
    private $idArticle;

    /**
     * @var \Discount
     *
     * @ORM\ManyToOne(targetEntity="Discount")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="id_discount", referencedColumnName="id")
     * })
     */
    private $idDiscount;


}
