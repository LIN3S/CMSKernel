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

use LIN3S\CMSKernel\Domain\Model\Translation\Translation;

/**
 * @author Beñat Espiña <benatespina@gmail.com>
 */
abstract class TranslationDTODataTransformer implements TranslationDataTransformer
{
    protected $translation;

    abstract protected function translationClass();

    abstract protected function serialize();

    public function write(Translation $translation)
    {
        $translationClass = $this->translationClass();
        if (!$translation instanceof $translationClass) {
            throw new \InvalidArgumentException(
                sprintf('Expected instance of %s, %s given', $translationClass, get_class($translation))
            );
        }
        $this->translation = $translation;
    }

    public function read()
    {
        if (null === $this->translation) {
            return [];
        }

        return $this->serialize();
    }
}
