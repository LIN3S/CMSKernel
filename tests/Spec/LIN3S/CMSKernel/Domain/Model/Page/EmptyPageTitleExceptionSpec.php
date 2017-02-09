<?php

/*
 * This file is part of the CMS Kernel library.
 *
 * Copyright (c) 2016-2017 LIN3S <info@lin3s.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Spec\LIN3S\CMSKernel\Domain\Model\Page;

use LIN3S\CMSKernel\Domain\Model\Page\EmptyPageTitleException;
use PhpSpec\ObjectBehavior;

class EmptyPageTitleExceptionSpec extends ObjectBehavior
{
    function it_is_initializable()
    {
        $this->shouldHaveType(EmptyPageTitleException::class);
        $this->shouldHaveType(\Exception::class);

        $this->getMessage()->shouldReturn('Page title must not be empty');
    }
}
