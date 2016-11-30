<?php

/*
 * This file is part of the CMS Kernel library.
 *
 * Copyright (c) 2016 LIN3S <info@lin3s.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace LIN3S\CMSKernel\Domain\Model\Menu;

/**
 * @author Beñat Espiña <benatespina@gmail.com>
 */
class MenuName
{
    private $name;

    public function __construct($name)
    {
        if (null === $name || '' === $name) {
            throw new EmptyMenuNameException();
        }
        $this->name = $name;
    }

    public function name()
    {
        return $this->name;
    }

    public function __toString()
    {
        return (string) $this->name;
    }
}
