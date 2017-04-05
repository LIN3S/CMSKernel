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

use LIN3S\SharedKernel\Infrastructure\Application\SimpleBus\SimpleBusQueryBus;
use Symfony\Component\DependencyInjection\Compiler\CompilerPassInterface;
use Symfony\Component\DependencyInjection\ContainerBuilder;
use Symfony\Component\DependencyInjection\Definition;

/**
 * @author Beñat Espiña <benatespina@gmail.com>
 */
class RegisterBusesPass implements CompilerPassInterface
{
    public function process(ContainerBuilder $container)
    {
        $this->registerQueryBus($container);
        $this->addCommandBusToServices($container);
    }

    private function registerQueryBus(ContainerBuilder $container)
    {
        if (!$container->hasDefinition('simple_bus.query_bus')) {
            return;
        }

        $container->setDefinition(
            'lin3s.cms_kernel.application.query_bus',
            new Definition(SimpleBusQueryBus::class)
        );
        $container->setDefinition(
            'lin3s.cms_kernel.application.query_bus',
            new Definition(
                SimpleBusQueryBus::class, [
                    $container->getDefinition('simple_bus.query_bus'),
                ]
            )
        );
    }

    private function addCommandBusToServices(ContainerBuilder $container)
    {
        if (!$container->hasDefinition('lin3s_admin_ddd_extension.action.type.handle_command')) {
            return;
        }

        $container
            ->findDefinition('lin3s_admin_ddd_extension.action.type.handle_command')
            ->replaceArgument(
                1,
                $container->getDefinition(
                    'lin3s.cms_kernel.application.command_bus'
                )
            );
    }
}
