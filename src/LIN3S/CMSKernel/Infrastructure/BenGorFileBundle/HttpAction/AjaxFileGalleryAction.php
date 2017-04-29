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

use BenGorFile\File\Application\Query\CountFilesHandler;
use BenGorFile\File\Application\Query\CountFilesQuery;
use BenGorFile\File\Application\Query\FilterFilesHandler;
use BenGorFile\File\Application\Query\FilterFilesQuery;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

/**
 * @author Beñat Espiña <benatespina@gmail.com>
 */
class AjaxFileGalleryAction
{
    private $filterFilesHandler;
    private $countFilesHandler;

    public function __construct(FilterFilesHandler $filterFilesHandler, CountFilesHandler $countFilesHandler)
    {
        $this->filterFilesHandler = $filterFilesHandler;
        $this->countFilesHandler = $countFilesHandler;
    }

    public function __invoke(Request $request)
    {
        $query = $request->query->get('q');
        $limit = $request->query->get('limit');
        $offset = $request->query->get('page');

        $files = $this->filterFilesHandler->__invoke(
            new FilterFilesQuery(
                $query,
                $offset,
                $limit
            )
        );

        $filesTotalCount = $this->countFilesHandler->__invoke(
            new CountFilesQuery(null)
        );

        return new JsonResponse([
            'files'           => $files,
            'filesTotalCount' => $filesTotalCount,
        ]);
    }
}
