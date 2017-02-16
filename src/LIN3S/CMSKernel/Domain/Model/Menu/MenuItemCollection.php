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

use LIN3S\SharedKernel\Domain\Model\Collection\Collection;
use LIN3S\SharedKernel\Domain\Model\Collection\CollectionElementAlreadyRemovedException;

/**
 * @author Beñat Espiña <benatespina@gmail.com>
 */
class MenuItemCollection extends Collection
{
    protected function type()
    {
        return MenuItem::class;
    }

    public function removeById(MenuItemId $menuItemId)
    {
        $menuItems = $this->toArray();
        foreach ($menuItems as $item) {
            if ($menuItemId->equals($item->id())) {
                $this->remove($item);

                return;
            }
        }
        throw new CollectionElementAlreadyRemovedException();
    }
}
