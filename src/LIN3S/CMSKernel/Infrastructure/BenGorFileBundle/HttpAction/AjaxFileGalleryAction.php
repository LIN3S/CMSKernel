<?php

/*
 * This file is part of the CMS Kernel package.
 *
 * Copyright (c) 2016-present LIN3S <info@lin3s.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace LIN3S\CMSKernel\Infrastructure\BenGorFileBundle\HttpAction;

use BenGorFile\File\Application\Query\AllFilesHandler;
use BenGorFile\File\Application\Query\AllFilesQuery;
use Symfony\Component\HttpFoundation\JsonResponse;

/**
 * @author Beñat Espiña <benatespina@gmail.com>
 */
class AjaxFileGalleryAction
{
    private $allFilesHandler;

    public function __construct(AllFilesHandler $allFilesHandler)
    {
        $this->allFilesHandler = $allFilesHandler;
    }

    public function __invoke()
    {
        $files = $this->allFilesHandler->__invoke(
            new AllFilesQuery()
        );

        return new JsonResponse($files);
    }
}
