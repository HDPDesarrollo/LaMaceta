<?php



use Doctrine\ORM\Mapping as ORM;

/**
 * BlacklistDetail
 *
 * @ORM\Table(name="blacklist_detail", indexes={@ORM\Index(name="idx_blacklist_user", columns={"id_user"}), @ORM\Index(name="idx_blacklist_sale", columns={"id_sale"})})
 * @ORM\Entity
 */
class BlacklistDetail
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
     * @var \User
     *
     * @ORM\ManyToOne(targetEntity="User")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="id_user", referencedColumnName="id")
     * })
     */
    public $idUser;

    /**
     * @var \Sale
     *
     * @ORM\ManyToOne(targetEntity="Sale", fetch="EAGER")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="id_sale", referencedColumnName="id")
     * })
     */
    public $idSale;

    /**
     * Set id
     *
     * @param integer $id
     * @return Sale
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
     * Set active
     *
     * @param boolean $active
     * @return Sale
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
     * Set idUser
     *
     * @param \User $idUser
     * @return BlacklistDetail
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
     * Set idSale
     *
     * @param \Sale $idSale
     * @return BlacklistDetail
     */
    public function setIdSale(\Sale $idSale = null)
    {
        $this->idSale = $idSale;

        return $this;
    }

    /**
     * Get idSale
     *
     * @return \Sale 
     */
    public function getIdSale()
    {
        return $this->idSale;
    }
}
