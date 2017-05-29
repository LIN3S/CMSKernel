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
use LIN3S\SharedKernel\Application\CommandBus;
use LIN3S\SharedKernel\Exception\Exception;
use Symfony\Component\Form\FormFactoryInterface;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Session\Flash\FlashBagInterface;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Component\Translation\TranslatorInterface;

/**
 * @author Beñat Espiña <benatespina@gmail.com>
 */
class NewTranslatableActionType implements ActionType
{
    private $flashBag;
    private $twig;
    private $formFactory;
    private $commandBus;
    private $urlGenerator;
    private $translator;

    public function __construct(
        FormFactoryInterface $formFactory,
        CommandBus $commandBus,
        \Twig_Environment $twig,
        FlashBagInterface $flashBag,
        UrlGeneratorInterface $urlGenerator,
        TranslatorInterface $translator
    ) {
        $this->twig = $twig;
        $this->flashBag = $flashBag;
        $this->formFactory = $formFactory;
        $this->commandBus = $commandBus;
        $this->urlGenerator = $urlGenerator;
        $this->translator = $translator;
    }

    public function execute($entity, Entity $config, Request $request, $options = null)
    {
        $entityName = $config->name();
        $locale = $request->query->get('locale');

        $this->checkFormIsPassed($options);
        $this->checkLocaleIsAvailable($locale);

        $form = $this->formFactory->create($options['form'], null, ['locale' => $locale]);
        if ($request->isMethod('POST') || $request->isMethod('PUT') || $request->isMethod('PATCH')) {
            $form->handleRequest($request);
            if ($form->isValid() && $form->isSubmitted()) {
                try {
                    $command = $form->getData();
                    $this->commandBus->handle($command);

                    $this->flashBag->add(
                        'lin3s_admin_success',
                        sprintf('The %s translation is successfully saved', $entityName)
                    );

                    return $this->redirect($options, $entityName, $command->id());
                } catch (Exception $exception) {
                    $this->addError($exception, $options);
                }
            } else {
                $this->flashBag->add(
                    'lin3s_admin_error',
                    sprintf(
                        'Errors while saving %s translation. Please check all fields and try again',
                        $entityName
                    )
                );
            }
        }

        return new Response(
            $this->twig->render('@Lin3sAdmin/Admin/form.html.twig', [
                'entity'       => $entity,
                'entityConfig' => $config,
                'locale'       => $locale,
                'form'         => $form->createView(),
            ])
        );
    }

    private function checkFormIsPassed($options)
    {
        if (!isset($options['form'])) {
            throw new \InvalidArgumentException(
                '"form" option is required so, you must declare inside action in the admin.yml'
            );
        }
    }

    private function checkLocaleIsAvailable($locale)
    {
        if (false) { // TODO: Check if locale is defined in the bundle configuration
            throw new NotFoundHttpException(
                sprintf('%s locale is not supported from the admin', $locale)
            );
        }
    }

    private function redirect($options, $entity, $id)
    {
        if (!isset($options['redirectAction'])) {
            return new RedirectResponse(
                $this->urlGenerator->generate('lin3s_admin_list', [
                    'entity' => $entity,
                ])
            );
        }

        return new RedirectResponse(
            $this->urlGenerator->generate('lin3s_admin_custom', [
                'action' => $options['redirectAction'],
                'entity' => $entity,
                'id'     => $id,
            ])
        );
    }

    private function addError(Exception $exception, array $options)
    {
        $exceptions = $this->catchableExceptions($options);
        $exceptionClassName = get_class($exception);

        if (array_key_exists($exceptionClassName, $exceptions)) {
            $error = $this->translator->trans($exceptions[$exceptionClassName]);
            $this->flashBag->add('lin3s_admin_error', $error);
        }
    }

    private function catchableExceptions(array $options)
    {
        if (!isset($options['catchable_exceptions'])) {
            return [];
        }

        return json_decode($options['catchable_exceptions'], true);
    }
}
