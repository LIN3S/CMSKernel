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
use LIN3S\CMSKernel\Domain\Model\Menu\MenuId;
use LIN3S\CMSKernel\Domain\Model\Menu\MenuIsAlreadyExistsException;
use LIN3S\CMSKernel\Domain\Model\Menu\MenuName;
use LIN3S\CMSKernel\Domain\Model\Menu\MenuRepository;
use LIN3S\CMSKernel\Domain\Model\Menu\MenuTranslation;
use LIN3S\CMSKernel\Domain\Model\Menu\MenuTranslationId;
use LIN3S\CMSKernel\Domain\Model\Translation\Locale;

/**
 * @author Beñat Espiña <benatespina@gmail.com>
 */
class AddMenuHandler
{
    private $repository;

    public function __construct(MenuRepository $repository)
    {
        $this->repository = $repository;
    }

    public function __invoke(AddMenuCommand $command)
    {
        if (null !== $menuId = $command->menuId()) {
            $menu = $this->repository->menuOfId(
                MenuId::generate(
                    $menuId
                )
            );
            if ($menu instanceof Menu) {
                throw new MenuIsAlreadyExistsException();
            }
        }

        $menu = new Menu(
            MenuId::generate(
                $command->menuId()
            ),
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
