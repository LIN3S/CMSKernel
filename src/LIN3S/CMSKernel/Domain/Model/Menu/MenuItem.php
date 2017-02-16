<?php

/*
 * This file is part of the CMS Kernel package.
 *
 * Copyright (c) 2016-present LIN3S <info@lin3s.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace LIN3S\CMSKernel\Domain\Model\Menu;

/**
 * @author Beñat Espiña <benatespina@gmail.com>
 */
class MenuItem
{
    private $id;
    private $link;
    private $createdOn;
    private $updatedOn;
    private $parentId;

    /**
     * This is a hack to make more readable database schema.
     * This property is populated by reflection from MenuTranslation.
     */
    private $menuTranslation;

    public function __construct(MenuItemId $id, MenuItemLink $link, MenuItemId $parentId = null)
    {
        $this->id = $id;
        $this->link = $link;
        $this->parentId = $parentId;
        $this->createdOn = new \DateTimeImmutable();
        $this->updatedOn = new \DateTimeImmutable();
    }

    public function changeParent(MenuItemId $parentId = null)
    {
        $this->parentId = $parentId;
        $this->updatedOn = new \DateTimeImmutable();
    }

    public function id()
    {
        return $this->id;
    }

    public function link()
    {
        return $this->link;
    }

    public function parentId()
    {
        return $this->parentId;
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
