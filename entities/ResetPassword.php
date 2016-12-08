<?php



use Doctrine\ORM\Mapping as ORM;

/**
 * BankCard
 *
 * @ORM\Table(name="reset_password", indexes={@ORM\Index(name="idx_user", columns={"id_user"})})
 * @ORM\Entity
 */
class ResetPassword
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
     * @var \User
     *
     * @ORM\ManyToOne(targetEntity="User", fetch="EAGER")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="id_user", referencedColumnName="id")
     * })
     */
    public $idUser;

    /**
     * @var string
     *
     * @ORM\Column(name="token", type="string", length=100, nullable=true)
     */
    public $token;


    /**
     * Set id
     *
     * @param integer $id
     * @return ResetPassword
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
     * Set idUser
     *
     * @param \User $idUser
     * @return ResetPassword
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

    /**
     * Set token
     *
     * @param string $token
     * @return ResetPassword
     */
    public function setToken($token)
    {
        $this->token = $token;

        return $this;
    }

    /**
     * Get token
     *
     * @return string 
     */
    public function getToken()
    {
        return $this->token;
    }
}
