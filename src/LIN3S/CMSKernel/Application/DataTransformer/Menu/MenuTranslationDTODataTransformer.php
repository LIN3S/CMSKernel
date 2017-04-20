<?php

/*
 * This file is part of the CMS Kernel package.
 *
 * Copyright (c) 2016-present LIN3S <info@lin3s.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace LIN3S\CMSKernel\Application\DataTransformer\Menu;

use LIN3S\CMSKernel\Application\DataTransformer\Translation\TranslationDTODataTransformer;
use LIN3S\CMSKernel\Domain\Model\Menu\MenuTranslation;

/**
 * @author Beñat Espiña <benatespina@gmail.com>
 */
class MenuTranslationDTODataTransformer extends TranslationDTODataTransformer
{
    private $menuItemDataTransformer;

    public function __construct(MenuItemDataTransformer $menuItemDataTransformer)
    {
        $this->menuItemDataTransformer = $menuItemDataTransformer;
    }

    protected function translationClass()
    {
        return MenuTranslation::class;
    }

    protected function serialize()
    {
        return [
            'name' => $this->translation->name()->name(),
            'tree' => $this->tree($this->translation->tree()),
        ];
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
            usort($tree[$item['parent_id']]['children'], [$this, 'sortByOrder']);
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

        usort($result, [$this, 'sortByOrder']);

        return $result;
    }

    private function sortByOrder($item1, $item2)
    {
        if ($item1['order'] === $item2['order']) {
            return 0;
        }

        return ($item1['order'] > $item2['order']) ? 1 : -1;
    }
}
