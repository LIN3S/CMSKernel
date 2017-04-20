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

use LIN3S\CMSKernel\Domain\Model\Menu\EmptyMenuCodeException;
use LIN3S\CMSKernel\Domain\Model\Menu\EmptyMenuNameException;
use LIN3S\SharedKernel\Exception\InvalidArgumentException;

/**
 * @author Beñat Espiña <benatespina@gmail.com>
 */
class ManageMenuCommand
{
    private $menuId;
    private $code;
    private $locale;
    private $items;
    private $name;

    public function __construct($locale, $name, $code, array $items = [], $menuId = null)
    {
        if (null === $locale) {
            throw new InvalidArgumentException('The locale cannot be null');
        }
        if (empty($name)) {
            throw new EmptyMenuNameException();
        }
        if (empty($code)) {
            throw new EmptyMenuCodeException();
        }
        $this->menuId = $menuId;
        $this->locale = $locale;
        $this->code = $code;
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

    public function code()
    {
        return $this->code;
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
