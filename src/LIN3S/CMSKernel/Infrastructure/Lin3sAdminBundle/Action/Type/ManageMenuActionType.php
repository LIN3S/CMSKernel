<?php

/*
 * This file is part of the CMS Kernel package.
 *
 * Copyright (c) 2016-present LIN3S <info@lin3s.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace LIN3S\CMSKernel\Infrastructure\Lin3sAdminBundle\Action\Type;

use LIN3S\AdminBundle\Configuration\Model\Entity;
use LIN3S\AdminBundle\Configuration\Type\ActionType;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * @author Beñat Espiña <benatespina@gmail.com>
 */
class ManageMenuActionType implements ActionType
{
    private $twig;

    public function __construct(\Twig_Environment $twig)
    {
        $this->twig = $twig;
    }

    public function execute($entity, Entity $config, Request $request, $options = null)
    {
        $locale = $request->query->get('locale');

        return new Response(
            $this->twig->render('@Lin3sAdmin/Admin/menu.html.twig', [
                'entity'       => $entity,
                'entityConfig' => $config,
                'locale'       => $locale,
            ])
        );
    }
}
