<?php

/*
 * This file is part of the CMS Kernel library.
 *
 * Copyright (c) 2016-2017 LIN3S <info@lin3s.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace LIN3S\CMSKernel\Application\DataTransformer\Translation;

use LIN3S\CMSKernel\Domain\Model\Translation\Locale;
use LIN3S\CMSKernel\Domain\Model\Translation\Translatable;

/**
 * @author Beñat Espiña <benatespina@gmail.com>
 */
interface TranslatableDataTransformer
{
    public function write(Translatable $translatable, Locale $locale = null);

    public function read();
}
