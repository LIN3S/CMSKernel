<?php

/*
 * This file is part of the CMS Kernel library.
 *
 * Copyright (c) 2016-2017 LIN3S <info@lin3s.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace LIN3S\CMSKernel\Infrastructure\Lin3sAdminBundle\Action\Type;

use LIN3S\AdminBundle\Action\ActionType;
use LIN3S\AdminBundle\Action\Type\EntityId;
use LIN3S\AdminBundle\Action\Type\OptionResolver;
use LIN3S\AdminBundle\Configuration\EntityConfiguration;
use LIN3S\AdminBundle\Form\FormHandler;
use LIN3S\CMSKernel\Domain\Model\Translation\TranslationDoesNotExistException;
use LIN3S\SharedKernel\Application\CommandBus;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Session\Flash\FlashBagInterface;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

/**
 * @author Beñat Espiña <benatespina@gmail.com>
 */
class TranslateActionType implements ActionType
{
    use EntityId;
    use OptionResolver;

    private $flashBag;
    private $twig;
    private $formHandler;
    private $commandBus;

    public function __construct(
        FormHandler $formHandler,
        CommandBus $commandBus,
        \Twig_Environment $twig,
        FlashBagInterface $flashBag
    ) {
        $this->twig = $twig;
        $this->flashBag = $flashBag;
        $this->formHandler = $formHandler;
        $this->commandBus = $commandBus;
    }

    public function execute($entity, EntityConfiguration $config, Request $request, $options = null)
    {
        $this->checkRequired($options, 'form');

        $id = (string) $this->getEntityId($entity, $config);
        if (!$entity) {
            throw new NotFoundHttpException(
                sprintf('The translatable with %s id does not exist', $id)
            );
        }

        $locale = $request->query->get('locale');

//        TODO: Check if locale is defined in the bundle configuration
//        if (whatever) {
//            throw new NotFoundHttpException(
//                sprintf('%s locale is not supported from the admin', $locale)
//            );
//        }

        try {
            $translation = $entity->{$locale}();
        } catch (TranslationDoesNotExistException $exception) {
            $translation = null;
        }

        $form = $this->formHandler->createForm(
            $options['form'],
            $translation, [
            'locale'  => $locale,
            'page_id' => $id,
        ]);
        if ($request->isMethod('POST') || $request->isMethod('PUT') || $request->isMethod('PATCH')) {
            $form->handleRequest($request);
            if ($form->isValid() && $form->isSubmitted()) {
                $this->commandBus->handle(
                    $form->getData()
                );
                $this->flashBag->add(
                    'lin3s_admin_success',
                    sprintf(
                        'The %s translation is successfully saved',
                        $config->name()
                    )
                );
            } else {
                $this->flashBag->add(
                    'lin3s_admin_error',
                    sprintf(
                        'Errors while saving %s translation. Please check all fields and try again',
                        $config->name()
                    )
                );
            }
        }

        return new Response(
            $this->twig->render('@Lin3sCmsAdminBridge/Admin/edit_translation.html.twig', [
                'entity'       => $entity,
                'entityConfig' => $config,
                'locale'       => $locale,
                'form'         => $form->createView(),
            ])
        );
    }
}
