<?php

/*
 * This file is part of the CMS Kernel package.
 *
 * Copyright (c) 2016-present LIN3S <info@lin3s.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace LIN3S\CMSKernel\Infrastructure\Symfony\Bundle\DependencyInjection\Compiler;

use LIN3S\CMSKernel\Infrastructure\Persistence\Doctrine\DBAL\Menu\Types\MenuIdType;
use LIN3S\CMSKernel\Infrastructure\Persistence\Doctrine\DBAL\Menu\Types\MenuItemIdType;
use LIN3S\CMSKernel\Infrastructure\Persistence\Doctrine\DBAL\Menu\Types\MenuTranslationIdType;
use LIN3S\CMSKernel\Infrastructure\Persistence\Doctrine\DBAL\Page\Template\Types\TemplateIdType;
use LIN3S\CMSKernel\Infrastructure\Persistence\Doctrine\DBAL\Page\Types\PageIdType;
use LIN3S\CMSKernel\Infrastructure\Persistence\Doctrine\DBAL\Page\Types\PageTranslationIdType;
use Symfony\Component\DependencyInjection\Compiler\CompilerPassInterface;
use Symfony\Component\DependencyInjection\ContainerBuilder;

/**
 * @author Beñat Espiña <benatespina@gmail.com>
 */
class DoctrineORMCustomTypesPass implements CompilerPassInterface
{
    /**
     * {@inheritdoc}
     */
    public function process(ContainerBuilder $container)
    {
        $customTypes = $container->getParameter('doctrine.dbal.connection_factory.types');
        $customTypes = array_merge($customTypes, [
            'menu_id'             => [
                'class'     => MenuIdType::class,
                'commented' => true,
            ],
            'menu_item_id'        => [
                'class'     => MenuItemIdType::class,
                'commented' => true,
            ],
            'menu_translation_id' => [
                'class'     => MenuTranslationIdType::class,
                'commented' => true,
            ],
            'page_id'             => [
                'class'     => PageIdType::class,
                'commented' => true,
            ],
            'page_translation_id' => [
                'class'     => PageTranslationIdType::class,
                'commented' => true,
            ],
            'template_id'             => [
                'class'     => TemplateIdType::class,
                'commented' => true,
            ],
        ]);

        $container->setParameter('doctrine.dbal.connection_factory.types', $customTypes);
        $container->findDefinition('doctrine.dbal.connection_factory')->replaceArgument(
            0, '%doctrine.dbal.connection_factory.types%'
        );
    }
}
