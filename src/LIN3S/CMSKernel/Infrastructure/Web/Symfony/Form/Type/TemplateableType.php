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

use LIN3S\CMSKernel\Domain\Model\Page\Template\AbstractTemplateFactory;
use LIN3S\CMSKernel\Infrastructure\Web\Symfony\Form\TemplateFormRegistry;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Form\FormEvent;
use Symfony\Component\Form\FormEvents;
use Symfony\Component\Form\FormInterface;
use Symfony\Component\Form\FormView;

/**
 * @author Beñat Espiña <benatespina@gmail.com>
 */
abstract class TemplateableType extends AbstractType
{
    private $templateFormRegistry;
    private $templateFactory;
    private $templateType;

    public function __construct(TemplateFormRegistry $templateFormRegistry, AbstractTemplateFactory $templateFactory)
    {
        $this->templateFormRegistry = $templateFormRegistry;
        $this->templateFactory = $templateFactory;
    }

    abstract public function view($templateName);

    abstract protected function buildTemplateableForm(FormBuilderInterface $builder, array $options);

    final public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $this->buildTemplateableForm($builder, $options);

        if (!$builder->has('templateName')) {
            throw new \LogicException('templateable form needs to have "templateName" field');
        }

        $builder->addEventListener(FormEvents::PRE_SET_DATA, function (FormEvent $event) use ($options) {
            $data = $event->getData();

            $templates = $this->templateFactory->templates();
            reset($templates);

            $templateName = null !== $data
                ? $this->templateFactory->keyOf($data->template())
                : key($templates);

            $this->removeAddedTemplateForms($event->getForm());
            $this->templateType($templateName)->buildForm($event->getForm(), $options);
        });

        $builder->addEventListener(FormEvents::PRE_SUBMIT, function (FormEvent $event) use ($options) {
            $data = $event->getData();
            $templates = $this->templateFactory->templates();
            reset($templates);

            $templateName = isset($data['templateName'])
                ? $data['templateName']
                : key($templates);

            $this->removeAddedTemplateForms($event->getForm());
            $this->templateType($templateName)->buildForm($event->getForm(), $options);
        });
    }

    final public function templateType($templateName = null)
    {
        if (null !== $templateName) {
            $templateTypeClass = $this->templateFormRegistry->get($templateName);
            $this->templateType = new $templateTypeClass();
        }

        return $this->templateType;
    }

    public function buildView(FormView $view, FormInterface $form, array $options)
    {
        $view->vars = array_merge($view->vars, [
            'groups' => $this->view(
                $form->get('templateName')->getData()
            ),
        ]);
        parent::buildView($view, $form, $options);
    }

    protected function templateChoices()
    {
        $templates = [];
        foreach ($this->templateFactory->templates() as $name => $template) {
            $templates[ucfirst($name)] = $name;
        }

        return $templates;
    }

    private function removeAddedTemplateForms(FormInterface $form)
    {
        foreach ($this->templateFormRegistry->types() as $type) {
            $type = new $type();
            $type->removeForm($form);
        }
    }
}
