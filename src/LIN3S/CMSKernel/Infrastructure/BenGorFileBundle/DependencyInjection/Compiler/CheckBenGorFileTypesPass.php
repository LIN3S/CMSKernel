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

use LIN3S\SharedKernel\Exception\InvalidArgumentException;
use LIN3S\SharedKernel\Exception\LogicException;
use Symfony\Component\DependencyInjection\Compiler\CompilerPassInterface;
use Symfony\Component\DependencyInjection\ContainerBuilder;

/**
 * @author Beñat Espiña <benatespina@gmail.com>
 */
class CheckBenGorFileTypesPass implements CompilerPassInterface
{
    public function process(ContainerBuilder $container)
    {
        $config = $container->getParameter('cms_kernel_bengor_file_bridge.config');
        $benGorFileConfig = $container->getParameter('bengor_file.config');

        $benGorFileTypes = [];
        foreach ($benGorFileConfig['file_class'] as $fileType => $fileConfig) {
            $benGorFileTypes[] = $fileType;
        }

        foreach ($config['file_types'] as $fileType => $fileTypeConfig) {
            if (!in_array($fileType, $benGorFileTypes, true)) {
                throw new InvalidArgumentException(
                    sprintf(
                        'There is no %s file class declared inside ben_gor_file configuration tree',
                        $fileType
                    )
                );
            }
            if ($benGorFileConfig['file_class'][$fileType]['upload_strategy'] !== 'suffix_number') {
                throw new LogicException(
                    sprintf(
                        'Configure "upload_strategy" as a "suffix_number" if you want to use "%s" as a CMS kernel type',
                        $fileType
                    )
                );
            }
        }
    }
}
