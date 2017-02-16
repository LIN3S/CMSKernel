<?php

/*
 * This file is part of the CMS Kernel package.
 *
 * Copyright (c) 2016-present LIN3S <info@lin3s.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace LIN3S\CMSKernel\Domain\Model\Translation;

/**
 * @author Beñat Espiña <benatespina@gmail.com>
 */
abstract class Translatable
{
    protected $translations;

    public function __construct(Translation $translation)
    {
        $this->translations = new TranslationCollection();
        $this->addTranslation($translation);
    }

    public function translations()
    {
        return new TranslationCollection($this->translations->getValues());
    }

    public function addTranslation(Translation $translation)
    {
        $translationReflection = new \ReflectionClass($translation);
        $origin = $translationReflection->getProperty('origin');
        $origin->setAccessible(true);
        $origin->setValue($translation, $this);

        $this->translations->add($translation);
    }

    public function removeTranslation(Locale $locale)
    {
        foreach ($this->translations as $translation) {
            if ($locale->equals($translation->locale())) {
                return $this->translations->removeElement($translation);
            }
        }
        throw new TranslationDoesNotExistException($locale->locale());
    }

    public function __call($locale, $args)
    {
        $resultTranslation = null;
        foreach ($this->translations() as $translation) {
            if ($translation->locale()->equals(new Locale($locale))) {
                $resultTranslation = $translation;
                break;
            }
        }

        if (!$resultTranslation instanceof Translation) {
            throw new TranslationDoesNotExistException($locale);
        }

        return $resultTranslation;
    }
}
