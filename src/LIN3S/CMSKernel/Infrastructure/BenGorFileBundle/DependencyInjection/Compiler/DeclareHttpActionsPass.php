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

use LIN3S\CMSKernel\Infrastructure\BenGorFileBundle\HttpAction\AjaxFileGalleryAction;
use LIN3S\CMSKernel\Infrastructure\BenGorFileBundle\HttpAction\AjaxFileUploadAction;
use Symfony\Component\DependencyInjection\Compiler\CompilerPassInterface;
use Symfony\Component\DependencyInjection\ContainerBuilder;
use Symfony\Component\DependencyInjection\Definition;

/**
 * @author Beñat Espiña <benatespina@gmail.com>
 */
class DeclareHttpActionsPass implements CompilerPassInterface
{
    public function process(ContainerBuilder $container)
    {
        $config = $container->getParameter('cms_kernel_bengor_file_bridge.config');

        foreach ($config['file_types'] as $fileType => $fileTypeConfig) {
            $container->setDefinition(
                'cms_kernel_bengor_file.http_action.' . $fileType . '_upload',
                (new Definition(
                    AjaxFileUploadAction::class, [
                        $container->getDefinition('bengor_file.' . $fileType . '.command_bus'),
                        $fileType,
                    ]
                ))
            );
        }

        foreach ($config['file_types'] as $fileType => $fileTypeConfig) {
            $container->setDefinition(
                'cms_kernel_bengor_file.http_action.' . $fileType . '_gallery',
                (new Definition(
                    AjaxFileGalleryAction::class, [
                        $container->getDefinition('bengor.file.application.query.all_' . $fileType . 's'),
                    ]
                ))
            );
        }
    }
}
