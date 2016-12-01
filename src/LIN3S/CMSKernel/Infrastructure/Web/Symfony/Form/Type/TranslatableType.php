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

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Form\FormInterface;
use Symfony\Component\Form\FormView;
use Symfony\Component\OptionsResolver\OptionsResolver;

/**
 * @author Beñat Espiña <benatespina@gmail.com>
 */
abstract class TranslatableType extends AbstractType
{
    protected $locale;

    abstract protected function buildTranslatableForm(FormBuilderInterface $builder, array $options);

    abstract protected function buildTranslationForm(FormBuilderInterface $builder, array $options);

    abstract protected function buildTranslatableView(FormInterface $form, array $options);

    abstract protected function buildTranslationView(FormInterface $form, array $options);

    abstract protected function configureTranslatableOptions(OptionsResolver $resolver);

    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $this->locale = isset($options['locale']) ? $options['locale'] : null;

        if (null !== $this->locale) {
            $this->buildTranslationForm($builder, $options);
        }
        $this->buildTranslatableForm($builder, $options);
    }

    public function buildView(FormView $view, FormInterface $form, array $options)
    {
        $typeView = $this->buildTranslatableView($form, $options);
        if (null !== $this->locale) {
            $typeView = array_merge($typeView, $this->buildTranslationView($form, $options));
        }
        $view->vars = array_merge($view->vars, ['groups' => $typeView]);
        parent::buildView($view, $form, $options);
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefined(['locale']);
        $this->configureTranslatableOptions($resolver);
    }
}
