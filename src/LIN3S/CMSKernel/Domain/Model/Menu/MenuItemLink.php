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
class MenuItemLink
{
    private $label;
    private $url;

    public function __construct($label, $url)
    {
        if (null === $label || '' === $label) {
            throw new EmptyMenuItemLabelException();
        }
        if (null === $url || '' === $url) {
            throw new InvalidMenuItemUrlException();
        }
        $this->label = $label;
        $this->url = $url;
    }

    public function label()
    {
        return $this->label;
    }

    public function url()
    {
        return $this->url;
    }

    public function __toString()
    {
        return (string) $this->label;
    }
}
