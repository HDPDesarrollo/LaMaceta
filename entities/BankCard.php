<?php



use Doctrine\ORM\Mapping as ORM;

/**
 * BankCard
 *
 * @ORM\Table(name="bank_card", indexes={@ORM\Index(name="idx_bank", columns={"id_bank"}), @ORM\Index(name="idx_card", columns={"id_card"})})
 * @ORM\Entity
 */
class BankCard
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
     * @var \Bank
     *
     * @ORM\ManyToOne(targetEntity="Bank", fetch="EAGER")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="id_bank", referencedColumnName="id")
     * })
     */
    public $idBank;

    /**
     * @var \Card
     *
     * @ORM\ManyToOne(targetEntity="Card", fetch="EAGER")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="id_card", referencedColumnName="id")
     * })
     */
    public $idCard;



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
     * Set idBank
     *
     * @param \Bank $idBank
     * @return BankCard
     */
    public function setIdBank(\Bank $idBank = null)
    {
        $this->idBank = $idBank;

        return $this;
    }

    /**
     * Get idBank
     *
     * @return \Bank 
     */
    public function getIdBank()
    {
        return $this->idBank;
    }

    /**
     * Set idCard
     *
     * @param \Card $idCard
     * @return BankCard
     */
    public function setIdCard(\Card $idCard = null)
    {
        $this->idCard = $idCard;

        return $this;
    }

    /**
     * Get idCard
     *
     * @return \Card 
     */
    public function getIdCard()
    {
        return $this->idCard;
    }
}
