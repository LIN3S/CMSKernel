<?php

/*
 * This file is part of the CMS Kernel package.
 *
 * Copyright (c) 2016-present LIN3S <info@lin3s.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace LIN3S\CMSKernel\Application\Query\Menu;

/**
 * @author Beñat Espiña <benatespina@gmail.com>
 */
class MenuOfCodeQuery
{
    private $code;
    private $locale;

    public function __construct($code, $locale)
    {
        $this->code = $code;
        $this->locale = $locale;
    }

    public function code()
    {
        return $this->code;
    }

    public function locale()
    {
        return $this->locale;
    }
}
