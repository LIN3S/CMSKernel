<?php

/*
 * This file is part of the CMS Kernel package.
 *
 * Copyright (c) 2016-present LIN3S <info@lin3s.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace LIN3S\CMSKernel\Infrastructure\Symfony\Bundle\HttpAction;

use LIN3S\CMSKernel\Application\Command\Menu\ManageMenuTranslationCommand;
use LIN3S\CMSKernel\Domain\Model\Menu\MenuDoesNotExistException;
use LIN3S\CMSKernel\Domain\Model\Translation\TranslationDoesNotExistException;
use LIN3S\SharedKernel\Application\CommandBus;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

/**
 * @author Beñat Espiña <benatespina@gmail.com>
 */
class AjaxManageMenuTranslationAction
{
    private $commandBus;

    public function __construct(CommandBus $commandBus)
    {
        $this->commandBus = $commandBus;
    }

    public function __invoke(Request $request)
    {
        if (false === $request->isXmlHttpRequest()) {
            throw new NotFoundHttpException();
        }

        try {
            $this->commandBus->handle(
                new ManageMenuTranslationCommand(
                    $request->request->get('menu_id'),
                    $request->request->get('name'),
                    $request->request->get('locale'),
                    $request->request->get('items')
                )
            );

            return new JsonResponse(null, 200);
        } catch (TranslationDoesNotExistException $exception) {
            return new JsonResponse('The given translation does not exist', 404);
        } catch (MenuDoesNotExistException $exception) {
            return new JsonResponse('The given menu does not exist', 404);
        }
    }
}
