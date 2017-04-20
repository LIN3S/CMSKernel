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
class AddMenuCommand
{
    private $menuId;
    private $code;
    private $locale;
    private $name;

    public function __construct($locale, $code, $name, $menuId = null)
    {
        if (null === $locale) {
            throw new \InvalidArgumentException('The locale cannot be null');
        }
        if (null === $code) {
            throw new \InvalidArgumentException('The code cannot be null');
        }
        if (null === $name) {
            throw new \InvalidArgumentException('The name cannot be null');
        }
        $this->menuId = $menuId;
        $this->code = $code;
        $this->locale = $locale;
        $this->name = $name;
    }

    public function menuId()
    {
        return $this->menuId;
    }

    public function locale()
    {
        return $this->locale;
    }

    public function code()
    {
        return $this->code;
    }

    public function name()
    {
        return $this->name;
    }
}
