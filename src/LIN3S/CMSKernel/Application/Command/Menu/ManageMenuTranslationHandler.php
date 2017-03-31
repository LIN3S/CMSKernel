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
use LIN3S\CMSKernel\Domain\Model\Menu\MenuName;
use LIN3S\CMSKernel\Domain\Model\Menu\MenuRepository;
use LIN3S\CMSKernel\Domain\Model\Menu\MenuTranslation;
use LIN3S\CMSKernel\Domain\Model\Menu\MenuTranslationId;
use LIN3S\CMSKernel\Domain\Model\Translation\Locale;
use LIN3S\CMSKernel\Domain\Model\Translation\TranslationDoesNotExistException;

/**
 * @author Beñat Espiña <benatespina@gmail.com>
 */
class ManageMenuTranslationHandler
{
    private $repository;

    public function __construct(MenuRepository $repository)
    {
        $this->repository = $repository;
    }

    public function __invoke(ManageMenuTranslationCommand $command)
    {
        $menuId = MenuId::generate($command->menuId());
        $menuName = new MenuName($command->name());
        $locale = new Locale($command->locale());
        $menuTranslationId = MenuTranslationId::generate();
        $tree = $command->items();

        $menu = $this->repository->menuOfId($menuId);
        $this->checkMenuExists($menu);

        $menuTranslation = new MenuTranslation($menuTranslationId, $locale, $menuName);
        $this->buildTree($menuTranslation, $tree);

        try {
            $menu->removeTranslation($locale);
        } catch (TranslationDoesNotExistException $exception) {
        }
        $menu->addTranslation($menuTranslation);
        $this->repository->persist($menu);
    }

    private function checkMenuExists(Menu $menu = null)
    {
        if (!$menu instanceof Menu) {
            throw new MenuDoesNotExistException();
        }
    }

    private function buildTree(MenuTranslation $menuTranslation, array $items, MenuItemId $parentId = null)
    {
        foreach ($items as $item) {
            $menuItemId = MenuItemId::generate();

            $menuTranslation->addItem(
                new MenuItemLink(
                    $item['label'],
                    $item['url']
                ),
                $parentId,
                $menuItemId
            );

            if (isset($item['children'])) {
                $this->buildTree($menuTranslation, $item['children'], $menuItemId);
            }
        }
    }
}
