<?php

/*
 * This file is part of the CMS Kernel package.
 *
 * Copyright (c) 2016-present LIN3S <info@lin3s.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace LIN3S\CMSKernel\Infrastructure\BenGorFileBundle;

use LIN3S\CMSKernel\Infrastructure\BenGorFileBundle\DependencyInjection\Compiler\CheckBenGorFileTypesPass;
use LIN3S\CMSKernel\Infrastructure\BenGorFileBundle\DependencyInjection\Compiler\DeclareFileFormTypesPass;
use LIN3S\CMSKernel\Infrastructure\BenGorFileBundle\DependencyInjection\Compiler\DeclareHttpActionsPass;
use Symfony\Component\DependencyInjection\Compiler\PassConfig;
use Symfony\Component\DependencyInjection\ContainerBuilder;
use Symfony\Component\HttpKernel\Bundle\Bundle;

/**
 * @author Beñat Espiña <benatespina@gmail.com>
 */
class CmsKernelBenGorFileBridgeBundle extends Bundle
{
    public function build(ContainerBuilder $container)
    {
        $container->addCompilerPass(new CheckBenGorFileTypesPass(), PassConfig::TYPE_OPTIMIZE);
        $container->addCompilerPass(new DeclareFileFormTypesPass(), PassConfig::TYPE_OPTIMIZE);
        $container->addCompilerPass(new DeclareHttpActionsPass(), PassConfig::TYPE_OPTIMIZE);
    }
}
