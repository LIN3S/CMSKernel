<?php

/*
 * This file is part of the CMS Kernel package.
 *
 * Copyright (c) 2016-present LIN3S <info@lin3s.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace LIN3S\CMSKernel\Infrastructure\Symfony\Form\Type;

use BenGorFile\File\Application\Query\FileOfIdHandler;
use BenGorFile\File\Application\Query\FileOfIdQuery;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\CallbackTransformer;
use Symfony\Component\Form\Extension\Core\Type\HiddenType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Form\FormInterface;
use Symfony\Component\Form\FormView;
use Symfony\Component\OptionsResolver\OptionsResolver;

class FileType extends AbstractType
{
    private $queryHandler;

    public function __construct(FileOfIdHandler $queryHandler)
    {
        $this->queryHandler = $queryHandler;
    }

    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('file', HiddenType::class)
            ->addModelTransformer(new CallbackTransformer(
                function ($value) {
                    return ['file' => $value];
                },
                function ($value) {
                    return $value['file'];
                }
            ));
    }
    public function buildView(FormView $view, FormInterface $form, array $options)
    {
        $fileId = $form->get('file')->getData();
        $filePreview = '';

        if (null !== $fileId) {
            $filePreview = $this->queryHandler->__invoke(new FileOfIdQuery($fileId));
        }

        $view->vars = array_merge($view->vars, array_merge($options, ['file_preview' => $filePreview]));
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setRequired(['upload_endpoint', 'gallery_endpoint', 'mime_types']);
    }
}
