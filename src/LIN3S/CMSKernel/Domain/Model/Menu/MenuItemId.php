<?php

/*
 * This file is part of the CMS Kernel library.
 *
 * Copyright (c) 2016-2017 LIN3S <info@lin3s.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace LIN3S\CMSKernel\Domain\Model\Menu;

use LIN3S\SharedKernel\Domain\Model\Identity\Id;

/**
 * @author Beñat Espiña <benatespina@gmail.com>
 */
class MenuItemId extends Id
{
    public static function generate($id = null)
    {
        return new static($id);
    }
}
