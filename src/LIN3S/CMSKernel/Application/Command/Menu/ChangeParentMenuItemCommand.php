<?php

/*
 * This file is part of the CMS Kernel library.
 *
 * Copyright (c) 2016-2017 LIN3S <info@lin3s.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace LIN3S\CMSKernel\Application\Command\Menu;

/**
 * @author Beñat Espiña <benatespina@gmail.com>
 */
class ChangeParentMenuItemCommand
{
    private $menuId;
    private $locale;
    private $menuItemId;
    private $menuItemParentId;

    public function __construct($menuId, $locale, $menuItemId, $menuItemParentId = null)
    {
        if (null === $menuId) {
            throw new \InvalidArgumentException('The menu id cannot be null');
        }
        if (null === $locale) {
            throw new \InvalidArgumentException('The locale cannot be null');
        }
        if (null === $menuItemId) {
            throw new \InvalidArgumentException('The menu item id cannot be null');
        }
        $this->menuId = $menuId;
        $this->locale = $locale;
        $this->menuItemId = $menuItemId;
        $this->menuItemParentId = $menuItemParentId;
    }

    public function menuId()
    {
        return $this->menuId;
    }

    public function locale()
    {
        return $this->locale;
    }

    public function menuItemId()
    {
        return $this->menuItemId;
    }

    public function menuItemParentId()
    {
        return $this->menuItemParentId;
    }
}
