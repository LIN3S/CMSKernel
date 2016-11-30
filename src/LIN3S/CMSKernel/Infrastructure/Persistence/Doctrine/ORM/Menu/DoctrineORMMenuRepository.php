<?php

/*
 * This file is part of the CMS Kernel library.
 *
 * Copyright (c) 2016 LIN3S <info@lin3s.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace LIN3S\CMSKernel\Infrastructure\Persistence\Doctrine\ORM\Menu;

use Doctrine\ORM\EntityRepository;
use LIN3S\CMSKernel\Domain\Model\Menu\Menu;
use LIN3S\CMSKernel\Domain\Model\Menu\MenuId;
use LIN3S\CMSKernel\Domain\Model\Menu\MenuRepository;

/**
 * @author Beñat Espiña <benatespina@gmail.com>
 */
class DoctrineORMMenuRepository extends EntityRepository implements MenuRepository
{
    public function menuOfId(MenuId $id)
    {
        return $this->find($id->id());
    }

    public function persist(Menu $menu)
    {
        $this->getEntityManager()->persist($menu);
    }

    public function remove(Menu $menu)
    {
        $this->getEntityManager()->remove($menu);
    }
}
