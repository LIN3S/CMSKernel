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

use LIN3S\CMSKernel\Domain\Model\Translation\Locale;
use LIN3S\CMSKernel\Domain\Model\Translation\Translation;
use LIN3S\CMSKernel\Domain\Model\Translation\Translatable as TranslatableInterface;
use LIN3S\CMSKernel\Domain\Model\Translation\TranslationCollection;

/**
 * @author Beñat Espiña <benatespina@gmail.com>
 * @author Gorka Laucirica <gorka.lauzirika@gmail.com>
 */
abstract class Translatable implements TranslatableInterface
{
    protected $translations;

    public function __construct(Translation $translation)
    {
        $this->translations = new TranslationCollection();
        $this->addTranslation($translation);
    }

    public function translations()
    {
        return $this->translations;
    }

    public function addTranslation(Translation $translation)
    {
        $this->translations->addTranslation($translation, $this);
    }

    public function removeTranslation(Locale $locale)
    {
        $this->translations->removeTranslation($locale);
    }

    public function __call($locale, $args)
    {
        $this->translations->getTranslation($locale);
    }
}
