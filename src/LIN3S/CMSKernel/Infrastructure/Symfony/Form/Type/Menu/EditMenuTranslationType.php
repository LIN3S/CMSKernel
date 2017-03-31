<?php

/*
 * This file is part of the Php DDD Standard project.
 *
 * Copyright (c) 2017 LIN3S <info@lin3s.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace LIN3S\CMSKernel\Infrastructure\Symfony\Form\Type\Menu;

use LIN3S\CMSKernel\Application\Command\Menu\ManageMenuTranslationCommand;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\DataMapperInterface;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Form\FormInterface;
use Symfony\Component\Form\FormView;
use Symfony\Component\OptionsResolver\OptionsResolver;

/**
 * @author Beñat Espiña <benatespina@gmail.com>
 */
class EditMenuTranslationType extends AbstractType implements DataMapperInterface
{
    private $locale;
    private $menuId;

    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $this->locale = $options['locale'];
        $this->menuId = $options['translatable_id'];

        $builder
            ->add('translation', MenuTranslationType::class, [
                'locale'  => $this->locale,
                'menu_id' => $this->menuId,
            ])
            ->setDataMapper($this);
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver
            ->setRequired(['locale', 'translatable_id'])
            ->setDefaults([
                'empty_data' => null,
            ]);
    }

    public function buildView(FormView $view, FormInterface $form, array $options)
    {
        $view->vars = array_merge($view->vars, [
            'groups' => [
                [
                    'name'   => 'Menu',
                    'fields' => [
                        'translation.name',
                        'translation.items',
                    ],
                ],
            ],
        ]);
    }

    public function mapDataToForms($data, $forms)
    {
        if (null === $data) {
            return;
        }
        $forms = iterator_to_array($forms);

        $forms['translation']->setData([
            'name'  => $data->name()->name(),
            'items' => $data->tree()->toArray(),
        ]);
    }

    public function mapFormsToData($forms, &$data)
    {
        $forms = iterator_to_array($forms);
        $translation = $forms['translation']->getData();

        if (empty($data) || null !== $this->menuId) {
            $data = new ManageMenuTranslationCommand(
                $this->menuId,
                $this->locale,
                $translation['name'],
                $translation['items']
            );
        }
    }
}
