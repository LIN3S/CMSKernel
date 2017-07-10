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
use LIN3S\SharedKernel\Exception\InvalidArgumentException;
use LIN3S\SharedKernel\Exception\LogicException;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\CallbackTransformer;
use Symfony\Component\Form\Extension\Core\Type\HiddenType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Form\FormInterface;
use Symfony\Component\Form\FormView;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Component\Serializer\NameConverter\CamelCaseToSnakeCaseNameConverter;

/**
 * @author Beñat Espiña <benatespina@gmail.com>
 */
class FileType extends AbstractType
{
    private $configuration;
    private $queryHandlers;
    private $implicitFileType;
    private $urlGenerator;

    public function __construct(UrlGeneratorInterface $urlGenerator, array $queryHandlers, array $configuration = null)
    {
        $this->setQueryHandlers($queryHandlers);
        $this->configuration = $configuration;
        $this->urlGenerator = $urlGenerator;
    }

    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('file', HiddenType::class, [
                'attr' => array_key_exists('attr', $options) ? $options['attr'] : null,
            ])
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
        $this->implicitFileType = $form->getConfig()->getName();
        $fileId = $form->get('file')->getData();

        $filePreview = '';
        if (null !== $fileId) {
            $filePreview = $this->queryHandler($this->fileType($options))->__invoke(
                new FileOfIdQuery($fileId)
            );

            $filePreview['preview_path'] = $this->getFilePreviewPath($filePreview['file_name'], $options);
        }

        $view->vars = array_merge(
            $view->vars, array_merge(
                $options, [
                    'file_preview'     => $filePreview,
                    'upload_endpoint'  => $this->uploadEndpoint($options),
                    'gallery_endpoint' => $this->galleryEndpoint($options),
                    'mime_types'       => $this->mimeTypes($options),
                ]
            )
        );
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefined(['entry_file', 'upload_endpoint', 'gallery_endpoint', 'mime_types']);
    }

    public function getBlockPrefix()
    {
        return 'lin3s_cms_file';
    }

    private function uploadEndpoint(array $options)
    {
        if (!isset($options['upload_endpoint'])) {
            return $this->fromConfigFileType($options);
        }

        return $options['upload_endpoint'];
    }

    private function galleryEndpoint(array $options)
    {
        if (!isset($options['gallery_endpoint'])) {
            return $this->fromConfigFileType($options, 'galleryEndpoint');
        }

        return $options['gallery_endpoint'];
    }

    private function mimeTypes(array $options)
    {
        if (isset($options['mime_types'])) {
            return $options['mime_types'];
        }

        if (!isset($this->configuration[$this->fileType($options)]['class'])) {
            throw new LogicException(
                'All the fallback are invalid. You can pass "entry_file" as option form, ' .
                'or you use implicit name of the form property, or also, you can pass ' .
                'explicitly the "mime_types" form options'
            );
        }

        return forward_static_call_array([
            $this->configuration[$this->fileType($options)]['class'],
            'availableMimeTypes',
        ], []);
    }

    private function fromConfigFileType(array $options, $method = 'uploadEndpoint')
    {
        $method = (new CamelCaseToSnakeCaseNameConverter())->normalize($method);

        return $this->configuration[$this->fileType($options)][$method];
    }

    private function fileType(array $options)
    {
        if (isset($options['entry_file']) && isset($this->configuration[$options['entry_file']])) {
            return $options['entry_file'];
        }

        if (!isset($this->configuration[$this->implicitFileType])) {
            throw new LogicException(
                'All the fallback are invalid. You can pass "entry_file" as option form, ' .
                'or you use implicit name of the form property, or also, you can pass ' .
                'explicitly the "upload_endpoint" and "gallery_endpoint" form options'
            );
        }

        return $this->implicitFileType;
    }

    private function queryHandler($fileType)
    {
        if (!isset($this->queryHandlers[$fileType])) {
            throw new InvalidArgumentException(
                sprintf(
                    'Does not exist any registered query handler with "%" file type',
                    $fileType
                )
            );
        }

        return $this->queryHandlers[$fileType];
    }

    private function setQueryHandlers(array $queryHandlers)
    {
        $this->queryHandlers = array_map(function (FileOfIdHandler $fileOfIdHandler) {
            return $fileOfIdHandler;
        }, $queryHandlers);
    }

    private function getFilePreviewPath($filename, array $options)
    {
        return $this->urlGenerator->generate(
            'bengor_file_' . $this->fileType($options) . '_download',
            [
                'filename' => $filename,
            ]
        );
    }
}
