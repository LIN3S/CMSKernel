<?php

/*
 * This file is part of the CMS Kernel library.
 *
 * Copyright (c) 2016-2017 LIN3S <info@lin3s.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace LIN3S\CMSKernel\Domain\Model\Page;

/**
 * @author Beñat Espiña <benatespina@gmail.com>
 */
class PageTitle
{
    private $title;

    public function __construct($title)
    {
        if (null === $title || '' === $title) {
            throw new EmptyPageTitleException();
        }
        $this->title = $title;
    }

    public function title()
    {
        return $this->title;
    }

    public function __toString()
    {
        return (string) $this->title;
    }
}
