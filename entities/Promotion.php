<?php



use Doctrine\ORM\Mapping as ORM;

/**
 * Promotion
 *
 * @ORM\Table(name="promotion", indexes={@ORM\Index(name="idx_promotion_bankcard", columns={"id_bank_card"})})
 * @ORM\Entity
 */
class Promotion
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
     * @ORM\Column(name="percentage", type="integer", nullable=false)
     */
    public $percentage;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="date_from", type="date", nullable=false)
     */
    public $dateFrom;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="date_to", type="date", nullable=false)
     */
    public $dateTo;

    /**
     * @var boolean
     *
     * @ORM\Column(name="monday", type="boolean", nullable=false)
     */
    public $monday;

    /**
     * @var boolean
     *
     * @ORM\Column(name="tuesday", type="boolean", nullable=false)
     */
    public $tuesday;

    /**
     * @var boolean
     *
     * @ORM\Column(name="wednesday", type="boolean", nullable=false)
     */
    public $wednesday;

    /**
     * @var boolean
     *
     * @ORM\Column(name="thursday", type="boolean", nullable=false)
     */
    public $thursday;

    /**
     * @var boolean
     *
     * @ORM\Column(name="friday", type="boolean", nullable=false)
     */
    public $friday;

    /**
     * @var boolean
     *
     * @ORM\Column(name="saturday", type="boolean", nullable=false)
     */
    public $saturday;

    /**
     * @var boolean
     *
     * @ORM\Column(name="sunday", type="boolean", nullable=false)
     */
    public $sunday;

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
     * @return Promotion
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
     * Set percentage
     *
     * @param integer $percentage
     * @return Promotion
     */
    public function setPercentage($percentage)
    {
        $this->percentage = $percentage;

        return $this;
    }

    /**
     * Get percentage
     *
     * @return integer 
     */
    public function getPercentage()
    {
        return $this->percentage;
    }

    /**
     * Set dateFrom
     *
     * @param \DateTime $dateFrom
     * @return Promotion
     */
    public function setDateFrom(\DateTime $dateFrom = null)
    {
        $this->dateFrom = $dateFrom;

        return $this;
    }

    /**
     * Get dateFrom
     *
     * @return \DateTime 
     */
    public function getDateFrom()
    {
        return $this->dateFrom;
    }

    /**
     * Set dateTo
     *
     * @param \DateTime $dateTo
     * @return Promotion
     */
    public function setDateTo(\DateTime $dateTo = null)
    {
        $this->dateTo = $dateTo;

        return $this;
    }

    /**
     * Get dateTo
     *
     * @return \DateTime 
     */
    public function getDateTo()
    {
        return $this->dateTo;
    }

    /**
     * Set monday
     *
     * @param boolean $monday
     * @return Promotion
     */
    public function setMonday($monday)
    {
        $this->monday = $monday;

        return $this;
    }

    /**
     * Get monday
     *
     * @return boolean 
     */
    public function getMonday()
    {
        return $this->monday;
    }

    /**
     * Set tuesday
     *
     * @param boolean $tuesday
     * @return Promotion
     */
    public function setTuesday($tuesday)
    {
        $this->tuesday = $tuesday;

        return $this;
    }

    /**
     * Get tuesday
     *
     * @return boolean 
     */
    public function getTuesday()
    {
        return $this->tuesday;
    }

    /**
     * Set wednesday
     *
     * @param boolean $wednesday
     * @return Promotion
     */
    public function setWednesday($wednesday)
    {
        $this->wednesday = $wednesday;

        return $this;
    }

    /**
     * Get wednesday
     *
     * @return boolean 
     */
    public function getWednesday()
    {
        return $this->wednesday;
    }

    /**
     * Set thursday
     *
     * @param boolean $thursday
     * @return Promotion
     */
    public function setThursday($thursday)
    {
        $this->thursday = $thursday;

        return $this;
    }

    /**
     * Get thursday
     *
     * @return boolean 
     */
    public function getThursday()
    {
        return $this->thursday;
    }

    /**
     * Set friday
     *
     * @param boolean $friday
     * @return Promotion
     */
    public function setFriday($friday)
    {
        $this->friday = $friday;

        return $this;
    }

    /**
     * Get friday
     *
     * @return boolean 
     */
    public function getFriday()
    {
        return $this->friday;
    }

    /**
     * Set saturday
     *
     * @param boolean $saturday
     * @return Promotion
     */
    public function setSaturday($saturday)
    {
        $this->saturday = $saturday;

        return $this;
    }

    /**
     * Get saturday
     *
     * @return boolean 
     */
    public function getSaturday()
    {
        return $this->saturday;
    }

    /**
     * Set sunday
     *
     * @param boolean $sunday
     * @return Promotion
     */
    public function setSunday($sunday)
    {
        $this->sunday = $sunday;

        return $this;
    }

    /**
     * Get sunday
     *
     * @return boolean 
     */
    public function getSunday()
    {
        return $this->sunday;
    }

    /**
     * Set idBankCard
     *
     * @param \BankCard $idBankCard
     * @return Promotion
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
}
