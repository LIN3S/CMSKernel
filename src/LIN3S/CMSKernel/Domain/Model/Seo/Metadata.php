<?php

/*
 * This file is part of the CMS Kernel library.
 *
 * Copyright (c) 2016-2017 LIN3S <info@lin3s.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace LIN3S\CMSKernel\Domain\Model\Seo;

/**
 * @author Beñat Espiña <benatespina@gmail.com>
 */
class Metadata
{
    private $title;
    private $description;
    private $robots;

    public function __construct(MetaTitle $title, MetaDescription $description, MetaRobots $robots)
    {
        $this->title = $title;
        $this->description = $description;
        $this->robots = $robots;
    }

    public function title()
    {
        return $this->title;
    }

    public function description()
    {
        return $this->description;
    }

    public function robots()
    {
        return $this->robots;
    }
}
