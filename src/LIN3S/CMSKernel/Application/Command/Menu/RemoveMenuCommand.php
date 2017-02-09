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
class RemoveMenuCommand
{
    private $menuId;

    public function __construct($menuId)
    {
        if (null === $menuId) {
            throw new \InvalidArgumentException('The menu id cannot be null');
        }
        $this->menuId = $menuId;
    }

    public function menuId()
    {
        return $this->menuId;
    }
}
