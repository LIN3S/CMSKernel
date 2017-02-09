<?php

/*
 * This file is part of the CMS Kernel library.
 *
 * Copyright (c) 2016-2017 LIN3S <info@lin3s.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace LIN3S\CMSKernel\Application\DataTransformer\Menu;

use LIN3S\CMSKernel\Domain\Model\Menu\MenuItem;

/**
 * @author Beñat Espiña <benatespina@gmail.com>
 */
class MenuItemDTODataTransformer implements MenuItemDataTransformer
{
    private $menuItem;

    public function write(MenuItem $menuItem)
    {
        $this->menuItem = $menuItem;
    }

    public function read()
    {
        return [
            'id'         => $this->menuItem->id()->id(),
            'label'      => $this->menuItem->link()->label(),
            'url'        => $this->menuItem->link()->url(),
            'parent_id'  => $this->menuItem->parentId()->id(),
            'created_on' => $this->menuItem->createdOn(),
            'updated_on' => $this->menuItem->updatedOn(),
        ];
    }
}
