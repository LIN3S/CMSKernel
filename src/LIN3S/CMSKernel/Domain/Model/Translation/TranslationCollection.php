<?php

/*
 * This file is part of the CMS Kernel library.
 *
 * Copyright (c) 2016 LIN3S <info@lin3s.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace LIN3S\CMSKernel\Domain\Model\Translation;

use LIN3S\SharedKernel\Domain\Model\Collection;
use LIN3S\SharedKernel\Domain\Model\CollectionElementAlreadyAddedException;

/**
 * @author Beñat Espiña <benatespina@gmail.com>
 */
class TranslationCollection extends Collection
{
    protected function type()
    {
        return Translation::class;
    }

    public function add($translation)
    {
        $translations = $this->toArray();
        foreach ($translations as $trans) {
            if ($translation->locale()->equals($trans->locale())) {
                throw new CollectionElementAlreadyAddedException();
            }
        }
        parent::add($translation);
    }

    public function addTranslation($translation, Translatable $translatable)
    {
        $translationReflection = new \ReflectionClass($translation);
        $origin = $translationReflection->getProperty('origin');
        $origin->setAccessible(true);
        $origin->setValue($translation, $this);

        $this->add($translation);
    }

    public function removeTranslation(Locale $locale)
    {
        foreach ($this->toArray() as $translation) {
            if ($locale->equals($translation->locale())) {
                return $this->removeElement($translation);
            }
        }
        throw new TranslationDoesNotExistException($locale->locale());
    }

    public function getTranslation(Locale $locale)
    {
        $resultTranslation = null;
        foreach ($this->toArray() as $translation) {
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
