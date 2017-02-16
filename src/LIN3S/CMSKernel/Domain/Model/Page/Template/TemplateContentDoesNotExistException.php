<?php

/*
 * This file is part of the CMS Kernel package.
 *
 * Copyright (c) 2016-present LIN3S <info@lin3s.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace LIN3S\CMSKernel\Domain\Model\Page\Template;

use LIN3S\SharedKernel\Exception\Exception;

/**
 * @author Beñat Espiña <benatespina@gmail.com>
 */
class TemplateContentDoesNotExistException extends Exception
{
    public function __construct($property)
    {
        parent::__construct(
            sprintf(
                'The required %s property is not defined inside given template content array',
                $property
            )
        );
    }
}
