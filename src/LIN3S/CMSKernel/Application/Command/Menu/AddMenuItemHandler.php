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
use LIN3S\CMSKernel\Domain\Model\Menu\MenuItemId;
use LIN3S\CMSKernel\Domain\Model\Menu\MenuItemLink;
use LIN3S\CMSKernel\Domain\Model\Menu\MenuItemOrder;
use LIN3S\CMSKernel\Domain\Model\Menu\MenuRepository;
use LIN3S\CMSKernel\Domain\Model\Translation\Locale;
use LIN3S\CMSKernel\Domain\Model\Translation\TranslationDoesNotExistException;

/**
 * @author Beñat Espiña <benatespina@gmail.com>
 */
class AddMenuItemHandler
{
    private $repository;

    public function __construct(MenuRepository $repository)
    {
        $this->repository = $repository;
    }

    public function __invoke(AddMenuItemCommand $command)
    {
        $menu = $this->repository->menuOfId(
            MenuId::generate(
                $command->menuId()
            )
        );
        if (!$menu instanceof Menu) {
            throw new MenuDoesNotExistException();
        }
        $locale = new Locale(
            $command->locale()
        );
        $translation = $menu->{$command->locale()}();

        $translation->addItem(
            new MenuItemLink(
                $command->menuItemLabel(),
                $command->menuItemUrl()
            ),
            new MenuItemOrder(
                $command->menuItemOrder()
            ),
            null !== $command->menuItemParentId()
                ? MenuItemId::generate($command->menuItemParentId())
                : null
        );

        try {
            $menu->removeTranslation($locale);
        } catch (TranslationDoesNotExistException $exception) {
        }

        $menu->addTranslation($translation);
        $this->repository->persist($menu);
    }
}
