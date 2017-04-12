<?php

/*
 * This file is part of the CMS Kernel package.
 *
 * Copyright (c) 2016-present LIN3S <info@lin3s.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace LIN3S\CMSKernel\Application\Command\Menu;

/**
 * @author Beñat Espiña <benatespina@gmail.com>
 */
class AddMenuItemCommand
{
    private $menuId;
    private $locale;
    private $menuItemLabel;
    private $menuItemUrl;
    private $menuItemOrder;
    private $menuItemParentId;

    public function __construct(
        $menuId,
        $locale,
        $menuItemLabel,
        $menuItemUrl,
        $menuItemOrder = 0,
        $menuItemParentId = null
    ) {
        if (null === $menuId) {
            throw new \InvalidArgumentException('The menu id cannot be null');
        }
        if (null === $locale) {
            throw new \InvalidArgumentException('The locale cannot be null');
        }
        if (null === $menuItemLabel) {
            throw new \InvalidArgumentException('The menu item label cannot be null');
        }
        if (null === $menuItemUrl) {
            throw new \InvalidArgumentException('The menu item url cannot be null');
        }
        $this->menuId = $menuId;
        $this->locale = $locale;
        $this->menuItemLabel = $menuItemLabel;
        $this->menuItemUrl = $menuItemUrl;
        $this->menuItemOrder = $menuItemOrder;
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

    public function menuItemLabel()
    {
        return $this->menuItemLabel;
    }

    public function menuItemUrl()
    {
        return $this->menuItemUrl;
    }

    public function menuItemOrder()
    {
        return $this->menuItemOrder;
    }

    public function menuItemParentId()
    {
        return $this->menuItemParentId;
    }
}
