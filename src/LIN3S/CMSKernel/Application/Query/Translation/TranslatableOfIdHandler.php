<?php

/*
 * This file is part of the CMS Kernel library.
 *
 * Copyright (c) 2016-2017 LIN3S <info@lin3s.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace LIN3S\CMSKernel\Application\Query\Translation;

use LIN3S\CMSKernel\Application\DataTransformer\Translation\TranslatableDataTransformer;
use LIN3S\CMSKernel\Domain\Model\Translation\Locale;
use LIN3S\CMSKernel\Domain\Model\Translation\Translatable;
use LIN3S\CMSKernel\Domain\Model\Translation\TranslatableDoesNotExistException;
use LIN3S\CMSKernel\Domain\Model\Translation\TranslatableId;
use LIN3S\CMSKernel\Domain\Model\Translation\TranslatableRepository;

/**
 * @author Beñat Espiña <benatespina@gmail.com>
 */
class TranslatableOfIdHandler
{
    private $dataTransformer;
    private $repository;

    public function __construct(TranslatableRepository $repository, TranslatableDataTransformer $dataTransformer)
    {
        $this->repository = $repository;
        $this->dataTransformer = $dataTransformer;
    }

    public function __invoke(TranslatableOfIdQuery $query)
    {
        $translatable = $this->repository->translatableOfId(
            TranslatableId::generate(
                $query->translatableId()
            )
        );
        if (!$translatable instanceof Translatable) {
            throw new TranslatableDoesNotExistException();
        }

        $this->dataTransformer->write(
            $translatable,
            new Locale(
                $query->locale()
            )
        );

        return $this->dataTransformer->read();
    }
}
