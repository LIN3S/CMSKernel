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

use LIN3S\CMSKernel\Infrastructure\Symfony\Form\Type\MenuTreeType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

/**
 * @author Beñat Espiña <benatespina@gmail.com>
 */
class MenuTranslationType extends AbstractType
{
    private $locale;
    private $menuId;

    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $this->locale = $options['locale'];
        $this->menuId = isset($options['menu_id']) ? $options['menu_id'] : null;

        $builder
            ->add('name', TextType::class)
            ->add('items', MenuTreeType::class, [
                'required' => false,
                'locale'   => $this->locale,
                'menu_id'  => $this->menuId,
            ]);
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver
            ->setRequired('locale')
            ->setDefined('menu_id');
    }
}
