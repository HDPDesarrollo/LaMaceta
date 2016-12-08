<?php



use Doctrine\ORM\Mapping as ORM;

/**
 * ArticleDiscount
 *
 * @ORM\Table(name="article_discount", indexes={@ORM\Index(name="idx_article", columns={"id_article"}), @ORM\Index(name="idx_discount", columns={"id_discount"})})
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
    public $id;

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
     * @var \Discount
     *
     * @ORM\ManyToOne(targetEntity="Discount")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="id_discount", referencedColumnName="id")
     * })
     */
    public $idDiscount;



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
     * Set idArticle
     *
     * @param \Article $idArticle
     * @return ArticleDiscount
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
     * Set idDiscount
     *
     * @param \Discount $idDiscount
     * @return ArticleDiscount
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
