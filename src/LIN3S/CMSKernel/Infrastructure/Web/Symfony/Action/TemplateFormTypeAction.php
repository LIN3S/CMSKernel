<?php

/*
 * This file is part of the CMS Kernel library.
 *
 * Copyright (c) 2016 LIN3S <info@lin3s.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace LIN3S\CMSKernel\Infrastructure\Web\Symfony\Action;

use LIN3S\CMSKernel\Infrastructure\Web\Symfony\Form\TemplateFormRegistry;
use Symfony\Component\Form\Extension\Core\Type\FormType;
use Symfony\Component\Form\FormFactoryInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\Templating\EngineInterface;

class TemplateFormTypeAction
{
    private $templating;
    private $factory;
    private $templateFormRegistry;

    public function __construct(
        FormFactoryInterface $factory,
        EngineInterface $templating,
        TemplateFormRegistry $templateFormRegistry
    ) {
        $this->templating = $templating;
        $this->factory = $factory;
        $this->templateFormRegistry = $templateFormRegistry;
    }

    public function action(Request $request, $template)
    {
        if (!$request->isXmlHttpRequest()) {
            throw new NotFoundHttpException();
        }

        $form = $this->factory->createNamedBuilder('', FormType::class, null, ['csrf_protection' => false])->getForm();
        $formType = $this->templateFormRegistry->get($template);
        $form = (new $formType())->buildForm($form);

        return new Response(
            $this->templating->render('template_form_type.html.twig', [
                'form' => $form->createView(),
            ])
        );
    }
}
