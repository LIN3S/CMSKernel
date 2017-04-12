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
class MenuItemOrder
{
    private $order;

    public function __construct($order)
    {
        if (null === $order || '' === $order) {
            throw new EmptyMenuNameException();
        }
        $this->order = (int)$order;

        if ($this->order < 1) {
            throw new InvalidMenuItemOrderException();
        }
    }

    public function order()
    {
        return $this->order;
    }

    public function __toString()
    {
        return (string) $this->order();
    }
}
