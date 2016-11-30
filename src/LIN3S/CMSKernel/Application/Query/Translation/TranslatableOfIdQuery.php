<?php

/*
 * This file is part of the CMS Kernel library.
 *
 * Copyright (c) 2016 LIN3S <info@lin3s.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace LIN3S\CMSKernel\Application\Query\Translation;

/**
 * @author Beñat Espiña <benatespina@gmail.com>
 */
class TranslatableOfIdQuery
{
    private $translatableId;
    private $locale;

    public function __construct($translatableId, $locale)
    {
        if (null === $translatableId) {
            throw new \InvalidArgumentException('The translatableId cannot be null');
        }
        if (null === $locale) {
            throw new \InvalidArgumentException('The locale cannot be null');
        }
        $this->translatableId = $translatableId;
        $this->locale = $locale;
    }

    public function translatableId()
    {
        return $this->translatableId;
    }

    public function locale()
    {
        return $this->locale;
    }
}
