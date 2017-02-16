<?php

/*
 * This file is part of the CMS Kernel package.
 *
 * Copyright (c) 2016-present LIN3S <info@lin3s.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace LIN3S\CMSKernel\Application\Query\Translation;

use LIN3S\CMSKernel\Application\DataTransformer\Translation\TranslatableDataTransformer;
use LIN3S\CMSKernel\Domain\Model\Translation\Locale;
use LIN3S\CMSKernel\Domain\Model\Translation\TranslatableRepository;
use LIN3S\CMSKernel\Domain\Model\Translation\TranslatableSpecificationFactory;

/**
 * @author Beñat Espiña <benatespina@gmail.com>
 */
class FilterTranslatablesHandler
{
    private $dataTransformer;
    private $repository;
    private $specificationFactory;
    private $totalPerPage;

    public function __construct(
        TranslatableRepository $repository,
        TranslatableDataTransformer $dataTransformer,
        TranslatableSpecificationFactory $specificationFactory,
        $totalPerPage = 10
    ) {
        $this->repository = $repository;
        $this->dataTransformer = $dataTransformer;
        $this->specificationFactory = $specificationFactory;
        $this->totalPerPage = $totalPerPage;
    }

    public function __invoke(FilterTranslatablesQuery $query)
    {
        $locale = new Locale($query->locale());

        $specification = $this->specificationFactory->createFilterTranslatable(
            $query->filters(),
            $query->page(),
            $this->totalPerPage
        );
        $translatables = $this->repository->query($specification);
        $totalTranslatables = $this->repository->count($specification);

        if (!is_array($translatables)) {
            $translatables = [$translatables];
        }

        return array_merge(
            [
                'translatables' => array_map(function ($translatable) use ($locale) {
                    $this->dataTransformer->write($translatable, $locale);

                    return $this->dataTransformer->read();
                }, $translatables),

            ],
            $this->paginate($translatables, $totalTranslatables, $query->page())
        );
    }

    private function paginate($translatables, $totalTranslatables, $page)
    {
        if (null === $page) {
            return [];
        }

        return [
            'totalTranslatables'        => $totalTranslatables,
            'initialTranslatableOfPage' => ($page - 1) * $this->totalPerPage + 1,
            'lastTranslatableOfPage'    => ($page - 1) * $this->totalPerPage + count($translatables),
            'totalPages'                => (int) ceil($totalTranslatables / $this->totalPerPage),
            'currentPage'               => $page,
        ];
    }
}
