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

use LIN3S\CMSKernel\Infrastructure\Domain\Model\Template\ClassMapTemplateFactory;
use Symfony\Component\DependencyInjection\Compiler\CompilerPassInterface;
use Symfony\Component\DependencyInjection\ContainerBuilder;
use Symfony\Component\DependencyInjection\Definition;

/**
 * @author Beñat Espiña <benatespina@gmail.com>
 */
class ClassMapTemplateFactoryPass implements CompilerPassInterface
{
    /**
     * {@inheritdoc}
     */
    public function process(ContainerBuilder $container)
    {
        $config = $container->getParameter('lin3s_cms_kernel.config');

        if (!isset($config['templates']) || !isset($config['templates']['class_map'])) {
            return;
        }

        foreach ($config['templates']['class_map'] as $entity => $templates) {
            $container->setDefinition(
                'lin3s_cms_kernel.' . $entity . '.template_factory',
                (new Definition(ClassMapTemplateFactory::class))
            )->addArgument($templates);
        }
    }
}
