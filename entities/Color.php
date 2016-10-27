<?php



use Doctrine\ORM\Mapping as ORM;

/**
 * Color
 *
 * @ORM\Table(name="color")
 * @ORM\Entity
 */
class Color
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
     * @ORM\Column(name="color", type="string", length=100, nullable=false)
     */
    public $color;

    /**
     * @var string
     *
     * @ORM\Column(name="rgb", type="string", length=12, nullable=false)
     */
    public $rgb;


    /**
     * Set id
     *
     * @param integer $id
     * @return Color
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
     * @return Color
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
     * Set color
     *
     * @param string $color
     * @return Color
     */
    public function setColor($color)
    {
        $this->color = $color;

        return $this;
    }

    /**
     * Get color
     *
     * @return string 
     */
    public function getColor()
    {
        return $this->color;
    }

    /**
     * Set rgb
     *
     * @param string $rgb
     * @return Color
     */
    public function setRgb($rgb)
    {
        $this->rgb = $rgb;

        return $this;
    }

    /**
     * Get rgb
     *
     * @return string 
     */
    public function getRgb()
    {
        return $this->rgb;
    }
}
