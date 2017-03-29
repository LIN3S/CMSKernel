<?php

/*
 * This file is part of the CMS Kernel package.
 *
 * Copyright (c) 2016-present LIN3S <info@lin3s.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace LIN3S\CMSKernel\Infrastructure\BenGorFileBundle\DependencyInjection\Compiler\Routing;

use Symfony\Component\DependencyInjection\ContainerBuilder;

/**
 * @author Beñat Espiña <benatespina@gmail.com>
 */
abstract class RoutesLoaderBuilder
{
    protected $configuration;
    protected $container;

    public function __construct(ContainerBuilder $container, array $configuration = [])
    {
        $this->configuration = $this->sanitize($configuration);
        $this->container = $container;
    }

    public function build()
    {
        if ($this->container->hasDefinition($this->definitionName())) {
            $this->container->getDefinition(
                $this->definitionName()
            )->replaceArgument(0, array_unique($this->configuration, SORT_REGULAR));
        }

        return $this->container;
    }

    public function configuration()
    {
        return $this->configuration;
    }

    protected function sanitize(array $configuration)
    {
        foreach ($configuration as $key => $config) {
            if (null === $config['name']) {
                $configuration[$key]['name'] = $this->defaultRouteName($key);
            }
            if (null === $config['path']) {
                $configuration[$key]['path'] = $this->defaultRoutePath($key);
            }
        }

        return $configuration;
    }

    abstract protected function defaultRouteName($file);

    abstract protected function defaultRoutePath($file);

    abstract protected function definitionName();
}
