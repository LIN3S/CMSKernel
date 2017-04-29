<?php

/*
 * This file is part of the CMS Kernel package.
 *
 * Copyright (c) 2016-present LIN3S <info@lin3s.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace LIN3S\CMSKernel\Infrastructure\BenGorFileBundle\Routing;

use BenGorFile\FileBundle\Routing\RoutesLoader;
use Symfony\Component\Routing\Route;

/**
 * @author Beñat Espiña <benatespina@gmail.com>
 */
class GalleryRouteLoader extends RoutesLoader
{
    public function supports($resource, $type = null)
    {
        return 'cms_kernel_bengor_file_bridge_gallery' === $type;
    }

    protected function register($file, array $config)
    {
        $this->routes->add(
            $config['name'],
            new Route(
                $config['path'],
                [
                    '_controller' => 'cms_kernel_bengor_file.http_action.' . $file . '_gallery:__invoke',
                    'fileType'    => $file,
                ],
                [],
                [],
                '',
                [],
                ['GET']
            )
        );
    }
}
