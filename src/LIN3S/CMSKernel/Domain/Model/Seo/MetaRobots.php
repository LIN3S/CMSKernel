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
class MetaRobots
{
    private $index;
    private $follow;

    public function __construct($index, $follow)
    {
        if (null === $index) {
            $index = true;
        }
        if (null === $follow) {
            $follow = true;
        }
        if (!is_bool($index)) {
            throw new InvalidRobotsIndexException();
        }
        if (!is_bool($follow)) {
            throw new InvalidRobotsFollowException();
        }
        $this->index = $index;
        $this->follow = $follow;
    }

    public function index()
    {
        return $this->index;
    }

    public function follow()
    {
        return $this->follow;
    }

    public function __toString()
    {
        $index = $this->index() ? 'index' : 'noindex';
        $follow = $this->follow() ? 'follow' : 'nofollow';

        return $index . '/' . $follow;
    }
}
