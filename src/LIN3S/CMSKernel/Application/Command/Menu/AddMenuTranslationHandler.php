<?php

/*
 * This file is part of the CMS Kernel package.
 *
 * Copyright (c) 2016-present LIN3S <info@lin3s.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace LIN3S\CMSKernel\Application\Command\Menu;

use LIN3S\CMSKernel\Domain\Model\Menu\Menu;
use LIN3S\CMSKernel\Domain\Model\Menu\MenuDoesNotExistException;
use LIN3S\CMSKernel\Domain\Model\Menu\MenuId;
use LIN3S\CMSKernel\Domain\Model\Menu\MenuName;
use LIN3S\CMSKernel\Domain\Model\Menu\MenuRepository;
use LIN3S\CMSKernel\Domain\Model\Menu\MenuTranslation;
use LIN3S\CMSKernel\Domain\Model\Menu\MenuTranslationId;
use LIN3S\CMSKernel\Domain\Model\Translation\Locale;

/**
 * @author Beñat Espiña <benatespina@gmail.com>
 */
class AddMenuTranslationHandler
{
    private $repository;

    public function __construct(MenuRepository $repository)
    {
        $this->repository = $repository;
    }

    public function __invoke(AddMenuTranslationCommand $command)
    {
        $menu = $this->repository->menuOfId(
            MenuId::generate(
                $command->menuId()
            )
        );
        if (!$menu instanceof Menu) {
            throw new MenuDoesNotExistException();
        }

        $menu->addTranslation(
            new MenuTranslation(
                MenuTranslationId::generate(),
                new Locale(
                    $command->locale()
                ),
                new MenuName(
                    $command->name()
                )
            )
        );
        $this->repository->persist($menu);
    }
}
