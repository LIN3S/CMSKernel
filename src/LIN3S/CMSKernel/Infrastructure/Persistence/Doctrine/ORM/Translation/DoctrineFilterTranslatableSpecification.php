<?php

/*
 * This file is part of the CMS Kernel package.
 *
 * Copyright (c) 2016-present LIN3S <info@lin3s.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace LIN3S\CMSKernel\Infrastructure\Persistence\Doctrine\ORM\Translation;

use Doctrine\ORM\EntityManager;
use Doctrine\ORM\Tools\Pagination\Paginator;
use LIN3S\SharedKernel\Infrastructure\Persistence\Doctrine\ORM\DoctrineCountSpecification;
use LIN3S\SharedKernel\Infrastructure\Persistence\Doctrine\ORM\DoctrineQuerySpecification;

/**
 * @author Beñat Espiña <benatespina@gmail.com>
 */
abstract class DoctrineFilterTranslatableSpecification implements DoctrineQuerySpecification, DoctrineCountSpecification
{
    private $page;
    private $translatablesPerPage;

    protected $filters;
    protected $queryBuilder;

    abstract public function translatableClass();

    public function __construct(array $filters, $page, $translatablesPerPage)
    {
        $this->filters = $filters;
        $this->page = $page;
        $this->translatablesPerPage = $translatablesPerPage;
    }

    public function buildQuery(EntityManager $manager)
    {
        $this->queryBuilder = $manager->createQueryBuilder();
        $this->queryBuilder
            ->select('tr')
            ->from($this->translatableClass(), 'tr')
            ->join('tr.translations', 'trans')
            ->groupBy('tr.id');

        foreach ($this->filters as $key => $filter) {
            if (!empty($filter)) {
                $this->{'add' . ucfirst($key) . 'Criteria'}($filter);
            }
        }

        return null === $this->page ? $this->queryBuilder->getQuery() : $this->paginate()->getQuery();
    }

    public function buildCount(EntityManager $manager)
    {
        $this->queryBuilder = $manager->createQueryBuilder();
        $this->queryBuilder
            ->select($this->queryBuilder->expr()->count('tr.id'))
            ->from($this->translatableClass(), 'tr')
            ->join('tr.translations', 'trans');

        $areFiltersEmpty = true;
        foreach ($this->filters as $key => $filter) {
            if (!empty($filter)) {
                $areFiltersEmpty = false;
                $this->{'add' . ucfirst($key) . 'Criteria'}($filter);
            }
        }
        if (true === $areFiltersEmpty) {
            // Remove the join Clause to avoid undesired behaviour with pagination.
            // When the filters given are empty and join clause is added, the query returns
            // information keeping in mind the translations group, instead of translatables group
            $this->queryBuilder->resetDQLPart('join');
        }

        return $this->queryBuilder->getQuery();
    }

    private function paginate()
    {
        $paginator = new Paginator($this->queryBuilder);

        $paginator
            ->getQuery()
            ->setFirstResult($this->translatablesPerPage * ($this->page - 1))
            ->setMaxResults($this->translatablesPerPage);

        return $paginator;
    }
}
