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
class ManageMenuCommand
{
    private $menuId;
    private $locale;
    private $items;
    private $name;

    public function __construct($locale, $name, array $items = [], $menuId = null)
    {
        if (null === $locale) {
            throw new \InvalidArgumentException('The locale cannot be null');
        }
        if (null === $name) {
            throw new \InvalidArgumentException('The name cannot be null');
        }
        $this->menuId = $menuId;
        $this->locale = $locale;
        $this->name = $name;
        $this->items = $items;
    }

    public function id()
    {
        return $this->menuId;
    }

    public function locale()
    {
        return $this->locale;
    }

    public function name()
    {
        return $this->name;
    }

    public function items()
    {
        return $this->items;
    }
}
