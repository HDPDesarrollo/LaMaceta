<?php



use Doctrine\ORM\Mapping as ORM;

/**
 * User
 *
 * @ORM\Table(name="user", indexes={@ORM\Index(name="idx_user_type", columns={"id_user_type"})})
 * @ORM\Entity
 */
class User
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
     * @ORM\Column(name="email", type="string", length=100, nullable=false)
     */
    public $email;

    /**
     * @var string
     *
     * @ORM\Column(name="password", type="string", length=100, nullable=false)
     */
    public $password;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="birth_date", type="date", nullable=false)
     */
    public $birthDate;

    /**
     * @var string
     *
     * @ORM\Column(name="gender", type="string", length=11, nullable=false)
     */
    public $gender;

    /**
     * @var integer
     *
     * @ORM\Column(name="id_token_card", type="integer", nullable=true)
     */
    public $idTokenCard;

    /**
     * @var string
     *
     * @ORM\Column(name="name", type="string", length=100, nullable=true)
     */
    public $name;

    /**
     * @var string
     *
     * @ORM\Column(name="surname", type="string", length=100, nullable=true)
     */
    public $surname;

    /**
     * @var \UserType
     *
     * @ORM\ManyToOne(targetEntity="UserType")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="id_user_type", referencedColumnName="id")
     * })
     */
    public $idUserType;



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
     * @return User
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
     * Set email
     *
     * @param string $email
     * @return User
     */
    public function setEmail($email)
    {
        $this->email = $email;

        return $this;
    }

    /**
     * Get email
     *
     * @return string 
     */
    public function getEmail()
    {
        return $this->email;
    }

    /**
     * Set password
     *
     * @param string $password
     * @return User
     */
    public function setPassword($password)
    {
        $this->password = $password;

        return $this;
    }

    /**
     * Get password
     *
     * @return string 
     */
    public function getPassword()
    {
        return $this->password;
    }

    /**
     * Set birthDate
     *
     * @param \DateTime $birthDate
     * @return User
     */
    public function setBirthDate($birthDate)
    {
        $this->birthDate = $birthDate;

        return $this;
    }

    /**
     * Get birthDate
     *
     * @return \DateTime 
     */
    public function getBirthDate()
    {
        return $this->birthDate;
    }

    /**
     * Set gender
     *
     * @param string $gender
     * @return User
     */
    public function setGender($gender)
    {
        $this->gender = $gender;

        return $this;
    }

    /**
     * Get gender
     *
     * @return string 
     */
    public function getGender()
    {
        return $this->gender;
    }

    /**
     * Set idTokenCard
     *
     * @param integer $idTokenCard
     * @return User
     */
    public function setIdTokenCard($idTokenCard)
    {
        $this->idTokenCard = $idTokenCard;

        return $this;
    }

    /**
     * Get idTokenCard
     *
     * @return integer 
     */
    public function getIdTokenCard()
    {
        return $this->idTokenCard;
    }

    /**
     * Set name
     *
     * @param string $name
     * @return User
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
     * Set surname
     *
     * @param string $surname
     * @return User
     */
    public function setSurname($surname)
    {
        $this->surname = $surname;

        return $this;
    }

    /**
     * Get surname
     *
     * @return string 
     */
    public function getSurname()
    {
        return $this->surname;
    }

    /**
     * Set idUserType
     *
     * @param \UserType $idUserType
     * @return User
     */
    public function setIdUserType(\UserType $idUserType = null)
    {
        $this->idUserType = $idUserType;

        return $this;
    }

    /**
     * Get idUserType
     *
     * @return \UserType 
     */
    public function getIdUserType()
    {
        return $this->idUserType;
    }
}
