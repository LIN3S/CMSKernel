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
use LIN3S\CMSKernel\Domain\Model\Menu\MenuCode;
use LIN3S\CMSKernel\Domain\Model\Menu\MenuId;
use LIN3S\CMSKernel\Domain\Model\Menu\MenuItemId;
use LIN3S\CMSKernel\Domain\Model\Menu\MenuItemLink;
use LIN3S\CMSKernel\Domain\Model\Menu\MenuItemOrder;
use LIN3S\CMSKernel\Domain\Model\Menu\MenuName;
use LIN3S\CMSKernel\Domain\Model\Menu\MenuRepository;
use LIN3S\CMSKernel\Domain\Model\Menu\MenuTranslation;
use LIN3S\CMSKernel\Domain\Model\Menu\MenuTranslationId;
use LIN3S\CMSKernel\Domain\Model\Translation\Locale;
use LIN3S\CMSKernel\Domain\Model\Translation\TranslationDoesNotExistException;

/**
 * @author Beñat Espiña <benatespina@gmail.com>
 */
class ManageMenuHandler
{
    private $repository;

    public function __construct(MenuRepository $repository)
    {
        $this->repository = $repository;
    }

    public function __invoke(ManageMenuCommand $command)
    {
        $menuId = MenuId::generate($command->id());
        $menuCode = new MenuCode($command->code());
        $menuName = new MenuName($command->name());
        $locale = new Locale($command->locale());
        $menuTranslationId = MenuTranslationId::generate();
        $tree = $command->items();

        $menuTranslation = new MenuTranslation($menuTranslationId, $locale, $menuName);
        $this->buildTree($menuTranslation, $tree);

        $menu = $this->repository->menuOfId($menuId);
        if (null === $menu) {
            $menu = new Menu($menuId, $menuCode, $menuTranslation);
        } else {
            try {
                $menu->removeTranslation($locale);
            } catch (TranslationDoesNotExistException $exception) {
            }
            $menu->addTranslation($menuTranslation);
        }
        $this->repository->persist($menu);
    }

    private function buildTree(MenuTranslation $menuTranslation, array $items, MenuItemId $parentId = null)
    {
        foreach ($items as $order => $item) {
            ++$order;
            $menuItemId = MenuItemId::generate();

            $menuTranslation->addItem(
                new MenuItemLink(
                    $item['label'],
                    $item['url']
                ),
                new MenuItemOrder(
                    $order
                ),
                $parentId,
                $menuItemId
            );

            if (isset($item['children']) && count($item['children']) > 0) {
                $this->buildTree($menuTranslation, $item['children'], $menuItemId);
            }
        }
    }
}
