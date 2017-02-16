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
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

/**
 * @author Beñat Espiña <benatespina@gmail.com>
 */
class SeoType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('metaTitle', TextType::class, [
                'required' => false,
                'label'    => 'Meta title',
            ])
            ->add('metaDescription', TextType::class, [
                'required' => false,
                'label'    => 'Meta descripción',
            ])
            ->add('robotsIndex', ChoiceType::class, [
                'label'   => 'Indexación',
                'choices' => [
                    'Sí' => true,
                    'No' => false,
                ],
            ])
            ->add('robotsFollow', ChoiceType::class, [
                'label'   => 'Seguimiento',
                'choices' => [
                    'Sí' => true,
                    'No' => false,
                ],
            ]);
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'inherit_data' => true,
        ]);
    }
}
