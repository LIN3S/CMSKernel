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

use LIN3S\CMSKernel\Application\DataTransformer\Menu\MenuItemDataTransformer;
use LIN3S\CMSKernel\Domain\Model\Menu\Menu;
use LIN3S\CMSKernel\Domain\Model\Menu\MenuDoesNotExistException;
use LIN3S\CMSKernel\Domain\Model\Menu\MenuId;
use LIN3S\CMSKernel\Domain\Model\Menu\MenuRepository;

/**
 * @author Beñat Espiña <benatespina@gmail.com>
 */
class MenuOfIdHandler
{
    private $repository;
    private $menuItemDataTransformer;

    public function __construct(MenuRepository $repository, MenuItemDataTransformer $menuItemDataTransformer)
    {
        $this->repository = $repository;
        $this->menuItemDataTransformer = $menuItemDataTransformer;
    }

    public function __invoke(MenuOfIdQuery $query)
    {
        $menu = $this->repository->menuOfId(
            MenuId::generate(
                $query->menuId()
            )
        );
        if (!$menu instanceof Menu) {
            throw new MenuDoesNotExistException();
        }

        $translation = $menu->{$query->locale()}();

        return $this->tree($translation->tree());
    }

    private function tree($items)
    {
        $tree = [];

        // Create an associative array with each key being the ID of the item
        foreach ($items as &$item) {
            $this->menuItemDataTransformer->write($item);
            $item = $this->menuItemDataTransformer->read();

            $tree[$item['id']] = &$item;
        }

        // Loop over the array and add each child to their parent
        foreach ($tree as &$item) {
            if (!isset($item['parent_id'])) {
                continue;
            }
            $tree[$item['parent_id']]['children'][] = &$item;
        }

        // Loop over the array again and remove any items that don't have a parent of 0;
        foreach ($tree as $key => &$item) {
            if (!isset($item['parent_id'])) {
                continue;
            }
            unset($tree[$key]);
        }

        // Sanitize the first level items
        $result = [];
        foreach ($tree as &$item) {
            $result[] = &$item['children'][0];
        }

        return $result;
    }
}
