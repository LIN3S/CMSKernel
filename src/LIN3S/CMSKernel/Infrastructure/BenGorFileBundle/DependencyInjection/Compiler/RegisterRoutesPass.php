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

use LIN3S\CMSKernel\Infrastructure\BenGorFileBundle\DependencyInjection\Compiler\Routing\GalleryRoutesLoaderBuilder;
use LIN3S\CMSKernel\Infrastructure\BenGorFileBundle\DependencyInjection\Compiler\Routing\UploadRoutesLoaderBuilder;
use Symfony\Component\DependencyInjection\Compiler\CompilerPassInterface;
use Symfony\Component\DependencyInjection\ContainerBuilder;

/**
 * @author Beñat Espiña <benatespina@gmail.com>
 */
class RegisterRoutesPass implements CompilerPassInterface
{
    public function process(ContainerBuilder $container)
    {
        $config = $container->getParameter('cms_kernel_bengor_file_bridge.config');

        $galleryConfiguration = [];
        $uploadConfiguration = [];

        foreach ($config['file_types'] as $key => $file) {
            $galleryConfiguration[$key] = $file['gallery_endpoint'];
            $uploadConfiguration[$key] = $file['upload_endpoint'];
        }

        (new GalleryRoutesLoaderBuilder($container, $galleryConfiguration))->build();
        (new UploadRoutesLoaderBuilder($container, $uploadConfiguration))->build();
    }
}
