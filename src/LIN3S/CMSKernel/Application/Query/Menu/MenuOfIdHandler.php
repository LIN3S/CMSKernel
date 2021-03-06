<?php

/*
 * This file is part of the CMS Kernel package.
 *
 * Copyright (c) 2016-present LIN3S <info@lin3s.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace LIN3S\CMSKernel\Application\Query\Menu;

use LIN3S\CMSKernel\Application\DataTransformer\Translation\TranslatableDataTransformer;
use LIN3S\CMSKernel\Domain\Model\Menu\Menu;
use LIN3S\CMSKernel\Domain\Model\Menu\MenuDoesNotExistException;
use LIN3S\CMSKernel\Domain\Model\Menu\MenuId;
use LIN3S\CMSKernel\Domain\Model\Menu\MenuRepository;
use LIN3S\CMSKernel\Domain\Model\Translation\Locale;

/**
 * @author Beñat Espiña <benatespina@gmail.com>
 */
class MenuOfIdHandler
{
    private $repository;
    private $dataTransformer;

    public function __construct(MenuRepository $repository, TranslatableDataTransformer $dataTransformer)
    {
        $this->repository = $repository;
        $this->dataTransformer = $dataTransformer;
    }

    public function __invoke(MenuOfIdQuery $query)
    {
        $locale = new Locale($query->locale());
        $menu = $this->repository->menuOfId(
            MenuId::generate(
                $query->menuId()
            )
        );
        if (!$menu instanceof Menu) {
            throw new MenuDoesNotExistException();
        }

        $this->dataTransformer->write($menu, $locale);

        return $this->dataTransformer->read();
    }
}
