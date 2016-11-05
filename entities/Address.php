<?php



use Doctrine\ORM\Mapping as ORM;

/**
 * Address
 *
 * @ORM\Table(name="address", indexes={@ORM\Index(name="idx_user_adress", columns={"id_user"}), @ORM\Index(name="idx_address_province", columns={"id_province"})})
 * @ORM\Entity
 */
class Address
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
     * @ORM\Column(name="street", type="string", length=100, nullable=false)
     */
    public $street;

    /**
     * @var integer
     *
     * @ORM\Column(name="number", type="integer", nullable=false)
     */
    public $number;

    /**
     * @var string
     *
     * @ORM\Column(name="city", type="string", length=100, nullable=false)
     */
    public $city;

    /**
     * @var string
     *
     * @ORM\Column(name="phone", type="string", length=100, nullable=true)
     */
    public $phone;

    /**
     * @var string
     *
     * @ORM\Column(name="mobile_phone", type="string", length=100, nullable=true)
     */
    public $mobilePhone;

    /**
     * @var integer
     *
     * @ORM\Column(name="zip_code", type="integer", nullable=true)
     */
    public $zipCode;

    /**
     * @var string
     *
     * @ORM\Column(name="apartment", type="string", length=100, nullable=true)
     */
    public $apartment;

    /**
     * @var \Province
     *
     * @ORM\ManyToOne(targetEntity="Province")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="id_province", referencedColumnName="id")
     * })
     */
    public $idProvince;

    /**
     * @var \User
     *
     * @ORM\ManyToOne(targetEntity="User")
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
     * @return Address
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
     * Set street
     *
     * @param string $street
     * @return Address
     */
    public function setStreet($street)
    {
        $this->street = $street;

        return $this;
    }

    /**
     * Get street
     *
     * @return string 
     */
    public function getStreet()
    {
        return $this->street;
    }

    /**
     * Set number
     *
     * @param integer $number
     * @return Address
     */
    public function setNumber($number)
    {
        $this->number = $number;

        return $this;
    }

    /**
     * Get number
     *
     * @return integer 
     */
    public function getNumber()
    {
        return $this->number;
    }

    /**
     * Set city
     *
     * @param string $city
     * @return Address
     */
    public function setCity($city)
    {
        $this->city = $city;

        return $this;
    }

    /**
     * Get city
     *
     * @return string 
     */
    public function getCity()
    {
        return $this->city;
    }

    /**
     * Set phone
     *
     * @param string $phone
     * @return Address
     */
    public function setPhone($phone)
    {
        $this->phone = $phone;

        return $this;
    }

    /**
     * Get phone
     *
     * @return string 
     */
    public function getPhone()
    {
        return $this->phone;
    }

    /**
     * Set mobilePhone
     *
     * @param string $mobilePhone
     * @return Address
     */
    public function setMobilePhone($mobilePhone)
    {
        $this->mobilePhone = $mobilePhone;

        return $this;
    }

    /**
     * Get mobilePhone
     *
     * @return string 
     */
    public function getMobilePhone()
    {
        return $this->mobilePhone;
    }

    /**
     * Set zipCode
     *
     * @param integer $zipCode
     * @return Address
     */
    public function setZipCode($zipCode)
    {
        $this->zipCode = $zipCode;

        return $this;
    }

    /**
     * Get zipCode
     *
     * @return integer 
     */
    public function getZipCode()
    {
        return $this->zipCode;
    }

    /**
     * Set apartment
     *
     * @param string $apartment
     * @return Address
     */
    public function setApartment($apartment)
    {
        $this->apartment = $apartment;

        return $this;
    }

    /**
     * Get apartment
     *
     * @return string 
     */
    public function getApartment()
    {
        return $this->apartment;
    }

    /**
     * Set idProvince
     *
     * @param \Province $idProvince
     * @return Address
     */
    public function setIdProvince(\Province $idProvince = null)
    {
        $this->idProvince = $idProvince;

        return $this;
    }

    /**
     * Get idProvince
     *
     * @return \Province 
     */
    public function getIdProvince()
    {
        return $this->idProvince;
    }

    /**
     * Set idUser
     *
     * @param \User $idUser
     * @return Address
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
