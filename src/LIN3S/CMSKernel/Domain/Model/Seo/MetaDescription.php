<?php

/*
 * This file is part of the CMS Kernel package.
 *
 * Copyright (c) 2016-present LIN3S <info@lin3s.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace LIN3S\CMSKernel\Domain\Model\Seo;

/**
 * @author Beñat Espiña <benatespina@gmail.com>
 */
class MetaDescription
{
    private $description;

    public function __construct($description)
    {
        $this->description = null === $description ? '' : $description;
    }

    public function description()
    {
        return $this->description;
    }

    public function __toString()
    {
        return (string) $this->description;
    }
}
