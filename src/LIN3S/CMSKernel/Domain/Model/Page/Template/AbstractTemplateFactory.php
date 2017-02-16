<?php

/*
 * This file is part of the CMS Kernel package.
 *
 * Copyright (c) 2016-present LIN3S <info@lin3s.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace LIN3S\CMSKernel\Domain\Model\Page\Template;

/**
 * @author Beñat Espiña <benatespina@gmail.com>
 */
abstract class AbstractTemplateFactory implements TemplateFactory
{
    abstract public function templates();

    public function keyOf($aValue)
    {
        $templates = $this->templates();
        while ($value = current($templates)) {
            if ($value === get_class($aValue)) {
                return key($templates);
            }
            next($templates);
        }
    }

    public function build($name, array $content)
    {
        if (!array_key_exists($name, $this->templates())) {
            throw new TemplateNameDoesNotExistException($name);
        }

        return forward_static_call_array([$this->get($name), 'fromContent'], [new TemplateContent($content)]);
    }

    private function get($name)
    {
        if (array_key_exists($name, $this->templates())) {
            return $this->templates()[$name];
        }
    }
}
