<?php

/*
 * This file is part of the CMS Kernel library.
 *
 * Copyright (c) 2016-2017 LIN3S <info@lin3s.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace LIN3S\CMSKernel\Application\Command\Menu;

use LIN3S\CMSKernel\Domain\Model\Menu\Menu;
use LIN3S\CMSKernel\Domain\Model\Menu\MenuDoesNotExistException;
use LIN3S\CMSKernel\Domain\Model\Menu\MenuId;
use LIN3S\CMSKernel\Domain\Model\Menu\MenuItemId;
use LIN3S\CMSKernel\Domain\Model\Menu\MenuRepository;
use LIN3S\CMSKernel\Domain\Model\Translation\Locale;

/**
 * @author Beñat Espiña <benatespina@gmail.com>
 */
class ChangeParentMenuItemHandler
{
    private $repository;

    public function __construct(MenuRepository $repository)
    {
        $this->repository = $repository;
    }

    public function __invoke(ChangeParentMenuItemCommand $command)
    {
        $menu = $this->repository->menuOfId(
            MenuId::generate(
                $command->menuId()
            )
        );
        if (!$menu instanceof Menu) {
            throw new MenuDoesNotExistException();
        }
        $translation = $menu->{$command->locale()}();

        $menuItemParent = $translation->item(
            null !== $command->menuItemParentId()
                ? MenuItemId::generate($command->menuItemParentId())
                : null
        );

        $translation->item(
            MenuItemId::generate(
                $command->menuItemId()
            )
        )->changeParent(
            $menuItemParent->id()
        );

        $menu->removeTranslation(
            new Locale(
                $command->locale()
            )
        );
        $menu->addTranslation($translation);
        $this->repository->persist($menu);
    }
}
