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

/**
 * @author Beñat Espiña <benatespina@gmail.com>
 */
class UploadRoutesLoaderBuilder extends RoutesLoaderBuilder
{
    protected function definitionName()
    {
        return 'cms_kernel_bengor_file.routing.upload_route_loader';
    }

    protected function defaultRouteName($file)
    {
        return sprintf('cms_kernel_ben_gor_file_bridge_%s_upload', $file);
    }

    protected function defaultRoutePath($file)
    {
        return sprintf('/%s-upload', $file);
    }
}
