<?php

/*
 * This file is part of the CMS Kernel library.
 *
 * Copyright (c) 2016 LIN3S <info@lin3s.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace LIN3S\CMSKernel\Infrastructure\Web\Symfony\Form;

/**
 * @author Beñat Espiña <benatespina@gmail.com>
 */
abstract class TemplateFormRegistry
{
    abstract public function types();

    public function get($templateName)
    {
        foreach ($this->types() as $key => $type) {
            if ($key === $templateName) {
                return $this->types()[$key];
            }
        }

        throw new \LogicException(
            sprintf(
                'The given "%s" template name does not match with any form type',
                $templateName
            )
        );
    }
}
