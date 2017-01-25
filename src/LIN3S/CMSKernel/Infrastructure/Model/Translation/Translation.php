<?php

/*
 * This file is part of the CMS Kernel library.
 *
 * Copyright (c) 2016 LIN3S <info@lin3s.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace LIN3S\CMSKernel\Infraestructure\Model\Translation;

use LIN3S\CMSKernel\Domain\Model\Translation\Translation as TranslationInterface;

/**
 * @author Beñat Espiña <benatespina@gmail.com>
 * @author Gorka Laucirica <gorka.lauzirika@gmail.com>
 */
abstract class Translation implements TranslationInterface
{
    protected $locale;
    protected $origin;

    public function __construct(Locale $locale)
    {
        $this->locale = $locale;
    }

    public function locale()
    {
        return $this->locale;
    }

    public function origin()
    {
        return $this->origin;
    }
}
