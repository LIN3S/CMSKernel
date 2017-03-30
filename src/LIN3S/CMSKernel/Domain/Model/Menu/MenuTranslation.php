<?php

/*
 * This file is part of the CMS Kernel package.
 *
 * Copyright (c) 2016-present LIN3S <info@lin3s.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace LIN3S\CMSKernel\Domain\Model\Menu;

use LIN3S\CMSKernel\Domain\Model\Translation\Locale;
use LIN3S\CMSKernel\Domain\Model\Translation\Translation;

/**
 * @author Beñat Espiña <benatespina@gmail.com>
 */
class MenuTranslation extends Translation
{
    private $id;
    private $name;
    private $tree;

    public function __construct(MenuTranslationId $id, Locale $locale, MenuName $name)
    {
        parent::__construct($locale);
        $this->id = $id;
        $this->name = $name;
        $this->tree = new MenuItemCollection();
    }

    public function addItem(MenuItemLink $link, MenuItemId $parentId = null, MenuItemId $menuItemId = null)
    {
        $menuItemId = null === $menuItemId ? MenuItemId::generate() : $menuItemId;

        $menuItem = new MenuItem($menuItemId, $link, $parentId);
        $menuItemReflection = new \ReflectionClass($menuItem);
        $menuTranslation = $menuItemReflection->getProperty('menuTranslation');
        $menuTranslation->setAccessible(true);
        $menuTranslation->setValue($menuItem, $this);

        $this->tree->add($menuItem);
    }

    public function removeItem(MenuItemId $id)
    {
        $this->tree->removeById($id);
    }

    public function id()
    {
        return $this->id;
    }

    public function name()
    {
        return $this->name;
    }

    public function tree()
    {
        return $this->tree;
    }

    public function item(MenuItemId $id)
    {
        $menuItem = null;
        foreach ($this->tree() as $item) {
            if ($id->equals($item->id())) {
                $menuItem = $item;
                break;
            }
        }
        if (!$menuItem instanceof MenuItem) {
            throw new MenuItemDoesNotExistException();
        }

        return $menuItem;
    }

    public function __toString()
    {
        return (string) $this->id->id();
    }
}
