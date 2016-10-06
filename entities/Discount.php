<?php



use Doctrine\ORM\Mapping as ORM;

/**
 * Discount
 *
 * @ORM\Table(name="discount", uniqueConstraints={@ORM\UniqueConstraint(name="percentage_UNIQUE", columns={"percentage"})})
 * @ORM\Entity
 */
class Discount
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
     * @var integer
     *
     * @ORM\Column(name="percentage", type="integer", nullable=false)
     */
    private $percentage;


}
