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

use App\Infrastructure\Web\Symfony\Form\Type\TemplateType;
use Symfony\Component\Form\Extension\Core\Type\FormType;
use Symfony\Component\Form\FormFactoryInterface;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Templating\EngineInterface;

class PageTemplateFormAction
{
    private $templating;
    private $factory;

    public function __construct(FormFactoryInterface $factory, EngineInterface $templating)
    {
        $this->templating = $templating;
        $this->factory = $factory;
    }

    public function action($template)
    {
        $form = $this->factory->createNamedBuilder('', FormType::class, null, ['csrf_protection' => false])->getForm();
        $form = TemplateType::buildForm($form, $template);

        return new Response(
            $this->templating->render('template_form.html.twig', [
                'form' => $form->createView(),
            ])
        );
    }
}
