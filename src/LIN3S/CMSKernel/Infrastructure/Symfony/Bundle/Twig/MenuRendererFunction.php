<?php

/*
 * This file is part of the CMS Kernel package.
 *
 * Copyright (c) 2016-present LIN3S <info@lin3s.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace LIN3S\CMSKernel\Infrastructure\Symfony\Bundle\Twig;

use LIN3S\CMSKernel\Application\Query\Menu\MenuOfCodeHandler;
use LIN3S\CMSKernel\Application\Query\Menu\MenuOfCodeQuery;
use Symfony\Component\HttpFoundation\RequestStack;

/**
 * @author Beñat Espiña <benatespina@gmail.com>
 */
class MenuRendererFunction extends \Twig_Extension
{
    private $requestStack;
    private $menuOfCodeHandler;

    public function __construct(RequestStack $requestStack, MenuOfCodeHandler $menuOfCodeHandler)
    {
        $this->requestStack = $requestStack;
        $this->menuOfCodeHandler = $menuOfCodeHandler;
    }

    public function getFunctions()
    {
        return [
            new \Twig_SimpleFunction('lin3s_cms_menu', [$this, 'menu']),
        ];
    }

    public function menu($menuCode, $locale = null)
    {
        if (null === $locale) {
            $request = $this->requestStack->getMasterRequest();
            $locale = $request->getLocale();
        }

        $menu = $this->menuOfCodeHandler->__invoke(
            new MenuOfCodeQuery(
                $menuCode,
                $locale
            )
        );

        return $menu['tree'];
    }
}
