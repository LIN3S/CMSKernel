<?php

/*
 * This file is part of the CMS Kernel package.
 *
 * Copyright (c) 2016-present LIN3S <info@lin3s.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace LIN3S\CMSKernel\Infrastructure\Domain\Model\Template;

use LIN3S\CMSKernel\Domain\Model\Template\TemplateContent;
use LIN3S\CMSKernel\Domain\Model\Template\TemplateFactory;
use LIN3S\CMSKernel\Domain\Model\Template\TemplateNameDoesNotExistException;

/**
 * @author Beñat Espiña <benatespina@gmail.com>
 */
class ClassMapTemplateFactory implements TemplateFactory
{
    private $classMap;

    public function __construct(array $classMap)
    {
        $this->classMap = $classMap;
    }

    public function build($name, array $content)
    {
        if (!array_key_exists($name, $this->classMap)) {
            throw new TemplateNameDoesNotExistException($name);
        }

        return forward_static_call_array([$this->classMap[$name], 'fromContent'], [new TemplateContent($content)]);
    }
}
