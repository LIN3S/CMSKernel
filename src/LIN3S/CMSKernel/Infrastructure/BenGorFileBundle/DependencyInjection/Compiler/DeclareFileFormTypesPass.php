<?php

/*
 * This file is part of the CMS Kernel package.
 *
 * Copyright (c) 2016-present LIN3S <info@lin3s.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace LIN3S\CMSKernel\Infrastructure\BenGorFileBundle\DependencyInjection\Compiler;

use LIN3S\CMSKernel\Infrastructure\Symfony\Form\Type\FileType;
use Symfony\Component\DependencyInjection\Compiler\CompilerPassInterface;
use Symfony\Component\DependencyInjection\ContainerBuilder;
use Symfony\Component\DependencyInjection\Definition;

/**
 * @author Beñat Espiña <benatespina@gmail.com>
 */
class DeclareFileFormTypesPass implements CompilerPassInterface
{
    public function process(ContainerBuilder $container)
    {
        $config = $container->getParameter('cms_kernel_bengor_file_bridge.config');
        $benGorFileConfig = $container->getParameter('bengor_file.config');

        $queryHandlers = [];
        foreach ($config['file_types'] as $fileType => $fileTypeConfig) {
            $config['file_types'][$fileType]['class'] = $benGorFileConfig['file_class'][$fileType]['class'];
            $config['file_types'][$fileType]['name'] = $fileType;

            $queryHandlers[$fileType] = $container->getDefinition(
                'bengor.file.application.query.' . $fileType . '_of_id'
            );
        }

        $container->setDefinition(
            'cms_kernel_bengor_file_bridge.form.type.file',
            (new Definition(
                FileType::class, [
                    $container->getDefinition('router.default'),
                    $queryHandlers,
                    $config['file_types'],
                ]
            ))
        );
    }
}
