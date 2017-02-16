<?php

/*
 * This file is part of the CMS Kernel package.
 *
 * Copyright (c) 2016-present LIN3S <info@lin3s.com>
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
abstract class TranslatableDTODataTransformer implements TranslatableDataTransformer
{
    private $locale;

    protected $translatable;
    protected $translationDTODataTransformer;

    abstract protected function translatableClass();

    abstract protected function serialize();

    public function __construct(TranslationDTODataTransformer $translationDTODataTransformer)
    {
        $this->translationDTODataTransformer = $translationDTODataTransformer;
    }

    public function write(Translatable $translatable, Locale $locale = null)
    {
        $translatableClass = $this->translatableClass();
        if (!$translatable instanceof $translatableClass) {
            throw new \InvalidArgumentException(
                sprintf('Expected instance of %s, %s given', $translatableClass, get_class($translatable))
            );
        }
        $this->translatable = $translatable;
        $this->locale = $locale;
    }

    public function read()
    {
        if (null === $this->translatable) {
            return [];
        }
        if ($this->locale instanceof Locale) {
            $translation = $this->translatable->{$this->locale->locale()}();

            $this->translationDTODataTransformer->write($translation);
            $translationResult = $this->translationDTODataTransformer->read();
        } else {
            $translationResult = [];
            foreach ($this->translatable->translations() as $translation) {
                $this->translationDTODataTransformer->write($translation);
                $translationResult[$translation->locale()->locale()] = $this->translationDTODataTransformer->read();
            }
        }

        return array_merge($this->serialize(), $translationResult);
    }
}
