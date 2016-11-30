<?php

/*
 * This file is part of the CMS Kernel library.
 *
 * Copyright (c) 2016 LIN3S <info@lin3s.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Spec\LIN3S\CMSKernel\Domain\Model\Page;

use LIN3S\CMSKernel\Domain\Model\Page\EmptyPageTitleException;
use LIN3S\CMSKernel\Domain\Model\Page\PageTitle;
use PhpSpec\ObjectBehavior;

class PageTitleSpec extends ObjectBehavior
{
    function let()
    {
        $this->beConstructedWith('Page title');
    }

    function it_can_be_created()
    {
        $this->shouldHaveType(PageTitle::class);
        $this->title()->shouldreturn('Page title');
    }

    function it_cannot_have_empty_title()
    {
        $this->beConstructedWith('');
        $this->shouldThrow(EmptyPageTitleException::class)->duringInstantiation();
    }
}
