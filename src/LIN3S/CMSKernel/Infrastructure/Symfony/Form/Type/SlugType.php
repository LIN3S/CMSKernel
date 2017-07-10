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

use LIN3S\SharedKernel\Domain\Model\Slug\Slug;
use LIN3S\SharedKernel\Exception\InvalidArgumentException;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\DataMapperInterface;
use Symfony\Component\Form\Extension\Core\Type\HiddenType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Form\FormInterface;
use Symfony\Component\Form\FormView;
use Symfony\Component\OptionsResolver\OptionsResolver;

/**
 * @author Beñat Espiña <benatespina@gmail.com>
 */
class SlugType extends AbstractType implements DataMapperInterface
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('slug', HiddenType::class, [
                'label'              => 'lin3s_cms_kernel.form.type.slug.slug',
                'required'           => true,
                'translation_domain' => 'Lin3sCmsKernel',
            ])
            ->setDataMapper($this);
    }

    public function mapDataToForms($data, $forms)
    {
        if (null === $data) {
            return;
        }
        if (!$data instanceof Slug) {
            throw new InvalidArgumentException(
                sprintf(
                    'Given data must be %s instance, %s given',
                    Slug::class,
                    get_class($data)
                )
            );
        }

        $forms = iterator_to_array($forms);

        $forms['slug']->setData($data->slug());
    }

    public function mapFormsToData($forms, &$data)
    {
        $forms = iterator_to_array($forms);
        $data = [
            'slug' => $forms['slug']->getData(),
        ];
    }

    public function buildView(FormView $view, FormInterface $form, array $options)
    {
        $view->vars = array_merge(
            $view->vars, array_merge(
                $options, [
                    'from' => $options['from'],
                ]
            )
        );
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setRequired(['from']);
    }

    public function getBlockPrefix()
    {
        return 'lin3s_cms_slug';
    }
}
