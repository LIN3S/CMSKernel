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
class MenuCode
{
    protected $code;

    public function __construct($code)
    {
        if ($code !== null && '' === $code) {
            throw new EmptyMenuCodeException();
        }
        $this->code = $code;
    }

    public function code()
    {
        return $this->code;
    }

    public function equals(MenuCode $code)
    {
        return $this->code === $code->code();
    }

    public function __toString()
    {
        return (string) $this->code;
    }
}
