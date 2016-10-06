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
    private $id;

    /**
     * @var boolean
     *
     * @ORM\Column(name="active", type="boolean", nullable=false)
     */
    private $active;

    /**
     * @var string
     *
     * @ORM\Column(name="entity_name", type="string", length=32, nullable=false)
     */
    private $entityName;

    /**
     * @var string
     *
     * @ORM\Column(name="action", type="string", length=11, nullable=false)
     */
    private $action;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="action_date", type="datetime", nullable=false)
     */
    private $actionDate;

    /**
     * @var integer
     *
     * @ORM\Column(name="id_obj", type="integer", nullable=false)
     */
    private $idObj;

    /**
     * @var integer
     *
     * @ORM\Column(name="id_user", type="integer", nullable=false)
     */
    private $idUser;

    /**
     * @var string
     *
     * @ORM\Column(name="col_name", type="string", length=32, nullable=false)
     */
    private $colName;

    /**
     * @var string
     *
     * @ORM\Column(name="old_value", type="string", length=255, nullable=true)
     */
    private $oldValue;

    /**
     * @var string
     *
     * @ORM\Column(name="new_value", type="string", length=255, nullable=true)
     */
    private $newValue;


}
