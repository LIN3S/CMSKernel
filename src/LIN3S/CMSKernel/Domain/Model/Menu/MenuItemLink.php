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
class MenuItemLink
{
    private $label;
    private $url;

    public function __construct($label, $url)
    {
        if (null === $label || '' === $label) {
            throw new EmptyMenuItemLabelException();
        }
        if (false === filter_var($url, FILTER_VALIDATE_URL)) {
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
