<?php

/*
 * This file is part of the CMS Kernel package.
 *
 * Copyright (c) 2016-present LIN3S <info@lin3s.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace LIN3S\CMSKernel\Infrastructure\Symfony\Bundle;

use Doctrine\DBAL\Types\Type;
use LIN3S\CMSKernel\Infrastructure\Persistence\Doctrine\DBAL\Page\Types\PageIdType;
use LIN3S\CMSKernel\Infrastructure\Symfony\Bundle\DependencyInjection\Compiler\DoctrineORMCustomTypesPass;
use Symfony\Component\DependencyInjection\Compiler\PassConfig;
use Symfony\Component\DependencyInjection\ContainerBuilder;
use Symfony\Component\HttpKernel\Bundle\Bundle;

/**
 * @author Beñat Espiña <benatespina@gmail.com>
 */
class Lin3sCmsKernelBundle extends Bundle
{
    public function build(ContainerBuilder $container)
    {
        $container->addCompilerPass(new DoctrineORMCustomTypesPass(), PassConfig::TYPE_OPTIMIZE);

        $container->loadFromExtension('doctrine', [
            'orm' => [
                'mappings' => [
                    'Lin3sCmsKernelMenu'        => [
                        'type'      => 'xml',
                        'is_bundle' => false,
                        'dir'       => $this->basePath() . '/Menu/Mapping/',
                        'prefix'    => 'LIN3S\CMSKernel\Domain\Model\Menu',
                    ],
                    'Lin3sCmsKernelPage'        => [
                        'type'      => 'xml',
                        'is_bundle' => false,
                        'dir'       => $this->basePath() . '/Page/Mapping/',
                        'prefix'    => 'LIN3S\CMSKernel\Domain\Model\Page',
                    ],
                    'Lin3sCmsKernelSeo'         => [
                        'type'      => 'xml',
                        'is_bundle' => false,
                        'dir'       => $this->basePath() . '/Seo/Mapping/',
                        'prefix'    => 'LIN3S\CMSKernel\Domain\Model\Seo',
                    ],
                    'Lin3sCmsKernelTranslation' => [
                        'type'      => 'xml',
                        'is_bundle' => false,
                        'dir'       => $this->basePath() . '/Translation/Mapping/',
                        'prefix'    => 'LIN3S\CMSKernel\Domain\Model\Translation',
                    ],
                ],
            ],
        ]);
    }

    private function basePath()
    {
        $directory = dirname((new \ReflectionClass(self::class))->getFileName());

        return $directory . '/../../Persistence/Doctrine/ORM';
    }
}
