<?php

/*
 * This file is part of the CMS Kernel library.
 *
 * Copyright (c) 2016-2017 LIN3S <info@lin3s.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace LIN3S\CMSKernel\Domain\Model\Menu;

use LIN3S\CMSKernel\Domain\Model\Translation\Translatable;

/**
 * @author Beñat Espiña <benatespina@gmail.com>
 */
class Menu extends Translatable
{
    private $id;
    private $createdOn;
    private $updatedOn;

    public function __construct(MenuId $id, MenuTranslation $translation)
    {
        parent::__construct($translation);
        $this->id = $id;
        $this->createdOn = new \DateTimeImmutable();
        $this->updatedOn = new \DateTimeImmutable();
    }

    public function id()
    {
        return $this->id;
    }

    public function createdOn()
    {
        return $this->createdOn;
    }

    public function updatedOn()
    {
        return $this->updatedOn;
    }

    public function __toString()
    {
        return (string) $this->id->id();
    }
}
