<?php



use Doctrine\ORM\Mapping as ORM;

/**
 * CreditCard
 *
 * @ORM\Table(name="credit_card", indexes={@ORM\Index(name="idx_creditcard_user", columns={"id_user"}), @ORM\Index(name="idx_creditcard_bankcard", columns={"id_bank_card"})})
 * @ORM\Entity
 */
class CreditCard
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
     * @var string
     *
     * @ORM\Column(name="name", type="string", length=100, nullable=false)
     */
    public $name;

    /**
     * @var string
     *
     * @ORM\Column(name="number", type="string", length=100, nullable=false)
     */
    public $number;

    /**
     * @var integer
     *
     * @ORM\Column(name="cvv", type="integer", nullable=false)
     */
    public $cvv;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="expiration_date", type="datetime", nullable=false)
     */
    public $expirationDate;

    /**
     * @var \BankCard
     *
     * @ORM\ManyToOne(targetEntity="BankCard", fetch="EAGER")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="id_bank_card", referencedColumnName="id")
     * })
     */
    public $idBankCard;

    /**
     * @var \User
     *
     * @ORM\ManyToOne(targetEntity="User", fetch="EAGER")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="id_user", referencedColumnName="id")
     * })
     */
    public $idUser;



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
     * @return CreditCard
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
     * Set name
     *
     * @param string $name
     * @return CreditCard
     */
    public function setName($name)
    {
        $this->name = $name;

        return $this;
    }

    /**
     * Get name
     *
     * @return string 
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * Set number
     *
     * @param string $number
     * @return CreditCard
     */
    public function setNumber($number)
    {
        $this->number = $number;

        return $this;
    }

    /**
     * Get number
     *
     * @return string 
     */
    public function getNumber()
    {
        return $this->number;
    }

    /**
     * Set cvv
     *
     * @param integer $cvv
     * @return CreditCard
     */
    public function setCvv($cvv)
    {
        $this->cvv = $cvv;

        return $this;
    }

    /**
     * Get cvv
     *
     * @return integer 
     */
    public function getCvv()
    {
        return $this->cvv;
    }

    /**
     * Set expirationDate
     *
     * @param \DateTime $expirationDate
     * @return CreditCard
     */
    public function setExpirationDate($expirationDate)
    {
        $this->expirationDate = $expirationDate;

        return $this;
    }

    /**
     * Get expirationDate
     *
     * @return \DateTime 
     */
    public function getExpirationDate()
    {
        return $this->expirationDate;
    }

    /**
     * Set idBankCard
     *
     * @param \BankCard $idBankCard
     * @return CreditCard
     */
    public function setIdBankCard(\BankCard $idBankCard = null)
    {
        $this->idBankCard = $idBankCard;

        return $this;
    }

    /**
     * Get idBankCard
     *
     * @return \BankCard 
     */
    public function getIdBankCard()
    {
        return $this->idBankCard;
    }

    /**
     * Set idUser
     *
     * @param \User $idUser
     * @return CreditCard
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
