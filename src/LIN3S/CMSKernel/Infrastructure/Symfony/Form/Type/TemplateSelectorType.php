<?php

/*
 * This file is part of the CMS Kernel package.
 *
 * Copyright (c) 2016-present LIN3S <info@lin3s.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace LIN3S\CMSKernel\Infrastructure\Symfony\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

/**
 * @author Beñat Espiña <benatespina@gmail.com>
 */
class TemplateSelectorType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('name', ChoiceType::class, [
                'choices' => $this->getChoices($options),
            ]);

        foreach ($options['templates'] as $name => $template) {
            $templateOptions = isset($template['options']) ? $template['options'] : [];

            $builder->add($name, $this->getType($template), $templateOptions);
        }
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setRequired('templates');
    }

    public function getBlockPrefix()
    {
        return 'template_selector';
    }

    private function getChoices(array $options)
    {
        $choices = [];
        foreach ($options['templates'] as $name => $template) {
            if (isset($template['options']) && isset($template['options']['label'])) {
                $choices[$template['options']['label']] = $name;
            } else {
                $choices[ucfirst($name)] = $name;
            }
        }

        return $choices;
    }

    private function getType($template)
    {
        if (!isset($template['type'])) {
            throw new \Exception('The template must have a "type" key');
        }

        return $template['type'];
    }
}
