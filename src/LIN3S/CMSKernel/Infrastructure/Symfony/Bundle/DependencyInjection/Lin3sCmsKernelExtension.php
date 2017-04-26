<?php

/*
 * This file is part of the CMS Kernel package.
 *
 * Copyright (c) 2016-present LIN3S <info@lin3s.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace LIN3S\CMSKernel\Infrastructure\Symfony\Bundle\DependencyInjection;

use Symfony\Component\Config\FileLocator;
use Symfony\Component\DependencyInjection\ContainerBuilder;
use Symfony\Component\DependencyInjection\Loader\YamlFileLoader;
use Symfony\Component\HttpKernel\DependencyInjection\Extension;

/**
 * @author Beñat Espiña <benatespina@gmail.com>
 */
class Lin3sCmsKernelExtension extends Extension
{
    public function load(array $configs, ContainerBuilder $container)
    {
        $configuration = new Configuration();
        $config = $this->processConfiguration($configuration, $configs);

        $container->setParameter('lin3s_cms_kernel.config', $config);

        $loader = new YamlFileLoader($container, new FileLocator(__DIR__ . '/../Resources/config/services'));
        $loader->load('command_bus.yml');
        $loader->load('commands.yml');
        $loader->load('data_transformers.yml');
        $loader->load('form_types.yml');
        $loader->load('queries.yml');
        $loader->load('repositories.yml');
        $loader->load('twig.yml');
    }
}
