<?php

/*
 * This file is part of the CMS Kernel package.
 *
 * Copyright (c) 2016-present LIN3S <info@lin3s.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace LIN3S\CMSKernel\Domain\Model\Template;

/**
 * @author Beñat Espiña <benatespina@gmail.com>
 */
class TemplateContent
{
    private $content;

    public function __construct(array $content)
    {
        $this->content = $content;
    }

    public function content()
    {
        return $this->content;
    }

    public function get($key)
    {
        if (!array_key_exists($key, $this->content)) {
            throw new TemplateContentDoesNotExistException($key);
        }

        return $this->content[$key];
    }
}
