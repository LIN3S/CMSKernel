<?php

/*
 * This file is part of the CMS Kernel library.
 *
 * Copyright (c) 2016 LIN3S <info@lin3s.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace LIN3S\CMSKernel\Infrastructure\Web\Symfony\Form\Type;

use LIN3S\CMSKernel\Domain\Model\Page\Template\Template;
use Symfony\Component\Form\FormInterface;

/**
 * @author Beñat Espiña <benatespina@gmail.com>
 */
abstract class TemplateType
{
    protected $templateName;

    abstract public function view();

    abstract public function dataFromForms(array $forms);

    abstract public function emptyData(FormInterface $form);

    abstract protected function buildTemplateForm(FormInterface $form, array $options);

    abstract protected function formsFromData($data, $forms);

    public function buildForm(FormInterface $form, array $options = [])
    {
        if ($form->has('templateName')) {
            $form->get('templateName')->setData($this->templateName);
        }
        $this->buildTemplateForm($form, $options);

        return $form;
    }

    public function mapDataToForms($data, $forms)
    {
        if (!$data instanceof Template) {
            throw new \LogicException(
                sprintf(
                    'The given data must be an instance of %s, %s given',
                    Template::class,
                    get_class($data)
                )
            );
        }

        return $this->formsFromData($data, $forms);
    }
}
