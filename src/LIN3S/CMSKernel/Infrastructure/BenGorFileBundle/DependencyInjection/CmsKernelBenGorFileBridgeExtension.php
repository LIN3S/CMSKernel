<?php

/*
 * This file is part of the CMS Kernel package.
 *
 * Copyright (c) 2016-present LIN3S <info@lin3s.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace LIN3S\CMSKernel\Infrastructure\BenGorFileBundle\DependencyInjection;

use LIN3S\CMSKernel\Infrastructure\Symfony\Form\Type\FileType;
use Symfony\Component\Config\FileLocator;
use Symfony\Component\DependencyInjection\ContainerBuilder;
use Symfony\Component\DependencyInjection\Definition;
use Symfony\Component\DependencyInjection\Loader\YamlFileLoader;
use Symfony\Component\HttpKernel\DependencyInjection\Extension;

/**
 * @author Beñat Espiña <benatespina@gmail.com>
 */
class CmsKernelBenGorFileBridgeExtension extends Extension
{
    public function load(array $configs, ContainerBuilder $container)
    {
        $configuration = new Configuration();
        $config = $this->processConfiguration($configuration, $configs);

        $container->setParameter('cms_kernel_bengor_file_bridge.config', $config);

        $loader = new YamlFileLoader($container, new FileLocator(__DIR__ . '/../Resources/config/services'));
        $loader->load('routing.yml');

        foreach ($config['file_types'] as $key => $user) {
            $this->loaFormTypes($container, $key);
        }
    }

    private function loaFormTypes(ContainerBuilder $container, $fileType)
    {
        $container->setDefinition(
            'cms_kernel_bengor_file_bridge.form.type.' . $fileType,
            (new Definition(FileType::class))->addTag('form.type')
        );
    }
}
