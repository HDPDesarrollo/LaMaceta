<?php



use Doctrine\ORM\Mapping as ORM;

/**
 * Audit
 *
 * @ORM\Table(name="audit")
 * @ORM\Entity
 */
class Audit
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
     * @ORM\Column(name="entity_name", type="string", length=100, nullable=false)
     */
    public $entityName;

    /**
     * @var string
     *
     * @ORM\Column(name="action", type="string", length=11, nullable=false)
     */
    public $action;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="action_date", type="datetime", nullable=false)
     */
    public $actionDate;

    /**
     * @var integer
     *
     * @ORM\Column(name="id_obj", type="integer", nullable=false)
     */
    public $idObj;

    /**
     * @var integer
     *
     * @ORM\Column(name="id_user", type="integer", nullable=false)
     */
    public $idUser;

    /**
     * @var string
     *
     * @ORM\Column(name="col_name", type="string", length=100, nullable=false)
     */
    public $colName;

    /**
     * @var string
     *
     * @ORM\Column(name="old_value", type="string", length=100, nullable=true)
     */
    public $oldValue;

    /**
     * @var string
     *
     * @ORM\Column(name="new_value", type="string", length=100, nullable=true)
     */
    public $newValue;



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
     * @return Audit
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
     * Set entityName
     *
     * @param string $entityName
     * @return Audit
     */
    public function setEntityName($entityName)
    {
        $this->entityName = $entityName;

        return $this;
    }

    /**
     * Get entityName
     *
     * @return string 
     */
    public function getEntityName()
    {
        return $this->entityName;
    }

    /**
     * Set action
     *
     * @param string $action
     * @return Audit
     */
    public function setAction($action)
    {
        $this->action = $action;

        return $this;
    }

    /**
     * Get action
     *
     * @return string 
     */
    public function getAction()
    {
        return $this->action;
    }

    /**
     * Set actionDate
     *
     * @param \DateTime $actionDate
     * @return Audit
     */
    public function setActionDate($actionDate)
    {
        $this->actionDate = $actionDate;

        return $this;
    }

    /**
     * Get actionDate
     *
     * @return \DateTime 
     */
    public function getActionDate()
    {
        return $this->actionDate;
    }

    /**
     * Set idObj
     *
     * @param integer $idObj
     * @return Audit
     */
    public function setIdObj($idObj)
    {
        $this->idObj = $idObj;

        return $this;
    }

    /**
     * Get idObj
     *
     * @return integer 
     */
    public function getIdObj()
    {
        return $this->idObj;
    }

    /**
     * Set idUser
     *
     * @param integer $idUser
     * @return Audit
     */
    public function setIdUser($idUser)
    {
        $this->idUser = $idUser;

        return $this;
    }

    /**
     * Get idUser
     *
     * @return integer 
     */
    public function getIdUser()
    {
        return $this->idUser;
    }

    /**
     * Set colName
     *
     * @param string $colName
     * @return Audit
     */
    public function setColName($colName)
    {
        $this->colName = $colName;

        return $this;
    }

    /**
     * Get colName
     *
     * @return string 
     */
    public function getColName()
    {
        return $this->colName;
    }

    /**
     * Set oldValue
     *
     * @param string $oldValue
     * @return Audit
     */
    public function setOldValue($oldValue)
    {
        $this->oldValue = $oldValue;

        return $this;
    }

    /**
     * Get oldValue
     *
     * @return string 
     */
    public function getOldValue()
    {
        return $this->oldValue;
    }

    /**
     * Set newValue
     *
     * @param string $newValue
     * @return Audit
     */
    public function setNewValue($newValue)
    {
        $this->newValue = $newValue;

        return $this;
    }

    /**
     * Get newValue
     *
     * @return string 
     */
    public function getNewValue()
    {
        return $this->newValue;
    }
}
