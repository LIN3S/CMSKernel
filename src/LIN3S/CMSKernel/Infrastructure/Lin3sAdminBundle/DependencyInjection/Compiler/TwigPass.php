<?php

/*
 * This file is part of the CMS Kernel package.
 *
 * Copyright (c) 2016-present LIN3S <info@lin3s.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace LIN3S\CMSKernel\Infrastructure\Lin3sAdminBundle\DependencyInjection\Compiler;

use Symfony\Component\DependencyInjection\Compiler\CompilerPassInterface;
use Symfony\Component\DependencyInjection\ContainerBuilder;

/**
 * @author Beñat Espiña <benatespina@gmail.com>
 */
class TwigPass implements CompilerPassInterface
{
    public function process(ContainerBuilder $container)
    {
        $config = $container->getParameter('cms_kernel_admin_bridge.config');

        $resultLocales = [];
        foreach ($config['locales'] as $localeType => $locales) {
            if ($localeType === 'default') {
                $resultLocales[] = $locales;
            } else {
                foreach ($locales as $locale) {
                    $resultLocales[] = $locale;
                }
            }
        }

        $container->getDefinition('twig')->addMethodCall('addGlobal', ['locales', $resultLocales]);
    }
}
