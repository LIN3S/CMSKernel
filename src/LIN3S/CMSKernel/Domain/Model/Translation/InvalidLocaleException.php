<?php

/*
 * This file is part of the CMS Kernel library.
 *
 * Copyright (c) 2016-2017 LIN3S <info@lin3s.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace LIN3S\CMSKernel\Domain\Model\Translation;

use LIN3S\SharedKernel\Exception\InvalidArgumentException;

/**
 * @author Beñat Espiña <benatespina@gmail.com>
 */
class InvalidLocaleException extends InvalidArgumentException
{
    public function __construct($locale)
    {
        parent::__construct(
            sprintf(
                'The given %s locale is not valid',
                $locale
            )
        );
    }
}
