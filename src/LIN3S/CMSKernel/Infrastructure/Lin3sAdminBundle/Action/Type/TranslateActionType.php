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
use LIN3S\CMSKernel\Domain\Model\Translation\TranslationDoesNotExistException;
use LIN3S\SharedKernel\Application\CommandBus;
use LIN3S\SharedKernel\Exception\Exception;
use Symfony\Component\Form\FormFactoryInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Session\Flash\FlashBagInterface;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\Translation\TranslatorInterface;

/**
 * @author Beñat Espiña <benatespina@gmail.com>
 */
final class TranslateActionType implements ActionType
{
    private $commandBus;
    private $flashBag;
    private $formFactory;
    private $twig;
    private $translator;

    public function __construct(
        FormFactoryInterface $formFactory,
        CommandBus $commandBus,
        \Twig_Environment $twig,
        FlashBagInterface $flashBag,
        TranslatorInterface $translator
    ) {
        $this->commandBus = $commandBus;
        $this->flashBag = $flashBag;
        $this->formFactory = $formFactory;
        $this->twig = $twig;
        $this->translator = $translator;
    }

    public function execute($entity, Entity $config, Request $request, $options = null)
    {
        $this->checkTranslatableExists($entity);

        $entityName = $config->name();
        $locale = $request->query->get('locale');

        $this->checkFormIsPassed($options);
        $this->checkLocaleIsAvailable($locale);

        $form = $this->formFactory->create($options['form'], $this->getTranslation($entity, $locale), [
            'locale'          => $locale,
            'translatable_id' => $this->translatableId($config, $entity),
        ]);

        if ($request->isMethod('POST') || $request->isMethod('PUT') || $request->isMethod('PATCH')) {
            $form->handleRequest($request);
            if ($form->isValid() && $form->isSubmitted()) {
                try {
                    $this->commandBus->handle(
                        $form->getData()
                    );

                    $this->flashBag->add(
                        'lin3s_admin_success',
                        sprintf('The %s translation is successfully saved', $entityName)
                    );
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
            $this->twig->render('@CmsKernelAdminBridge/Admin/edit_translation.html.twig', [
                'entity'       => $entity,
                'entityConfig' => $config,
                'locale'       => $locale,
                'form'         => $form->createView(),
            ])
        );
    }

    private function checkTranslatableExists($entity)
    {
        if (!$entity) {
            throw new NotFoundHttpException('The translatable does not exist');
        }
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

    private function translatableId(Entity $config, $entity)
    {
        return (string) $config->id($entity); // Ensure the id is scalar, not VO
    }

    private function getTranslation($entity, $locale)
    {
        try {
            $translation = $entity->{$locale}();
        } catch (TranslationDoesNotExistException $exception) {
            $translation = null;
        }

        return $translation;
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
