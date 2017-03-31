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

use LIN3S\CMSKernel\Application\Query\Menu\MenuOfIdHandler;
use LIN3S\CMSKernel\Application\Query\Menu\MenuOfIdQuery;
use LIN3S\CMSKernel\Domain\Model\Translation\TranslationDoesNotExistException;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\CallbackTransformer;
use Symfony\Component\Form\Extension\Core\Type\HiddenType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class MenuTreeType extends AbstractType
{
    private $menuOfIdHandler;

    public function __construct(MenuOfIdHandler $menuOfIdHandler)
    {
        $this->menuOfIdHandler = $menuOfIdHandler;
    }

    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $locale = $options['locale'];
        $menuId = isset($options['menu_id']) ? $options['menu_id'] : null;

        $builder
            ->add('tree', HiddenType::class)
            ->addModelTransformer(new CallbackTransformer(
                function ($value) use ($locale, $menuId) {
                    if (null === $menuId) {
                        return ['tree' => []];
                    }

                    try {
                        $items = $this->menuOfIdHandler->__invoke(
                            new MenuOfIdQuery(
                                $menuId,
                                $locale
                            )
                        );
                    } catch (TranslationDoesNotExistException $exception) {
                        return ['tree' => []];
                    }

                    return ['tree' => json_encode($items)];
                },
                function ($value) {
                    return $value['tree'] ? json_decode($value['tree'], true) : [];
                }
            ));
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver
            ->setRequired('locale')
            ->setDefined('menu_id');
    }
}
