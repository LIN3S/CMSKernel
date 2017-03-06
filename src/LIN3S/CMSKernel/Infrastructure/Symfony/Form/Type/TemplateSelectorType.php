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

class TemplateSelectorType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('name', ChoiceType::class, [
                'choices'      => $this->getTemplates($options),
                'choice_value' => function ($type) use ($options) {
                    return $this->getTemplateName($type, $options);
                },
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

    private function getTemplateName($type, $options)
    {
        return strtolower(array_search($type, $this->getTemplates($options)));
    }

    private function getTemplates(array $options)
    {
        $names = [];
        foreach ($options['templates'] as $name => $template) {
            $names[ucfirst($name)] = $this->getType($template);
        }

        return $names;
    }

    private function getType($template)
    {
        if (!isset($template['type'])) {
            throw new \Exception('The template must have a "type" key');
        }

        return $template['type'];
    }

    public function getBlockPrefix()
    {
        return 'template_selector';
    }
}
