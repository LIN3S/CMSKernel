<?php

/*
 * This file is part of the CMS Kernel library.
 *
 * Copyright (c) 2016-2017 LIN3S <info@lin3s.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace LIN3S\CMSKernel\Application\DataTransformer\Menu;

use LIN3S\CMSKernel\Domain\Model\Menu\MenuItem;

/**
 * @author Beñat Espiña <benatespina@gmail.com>
 */
interface MenuItemDataTransformer
{
    public function write(MenuItem $menuItem);

    public function read();
}
