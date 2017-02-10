<?php

/*
 * This file is part of the CMS Kernel library.
 *
 * Copyright (c) 2016-2017 LIN3S <info@lin3s.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace LIN3S\CMSKernel\Infrastructure\Lin3sAdminBundle\ListField\Type;

use LIN3S\AdminBundle\Configuration\Model\Entity;
use LIN3S\AdminBundle\Configuration\Type\ListFieldType;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;

/**
 * @author Beñat Espiña <benatespina@gmail.com>
 */
class TranslateListFieldType implements ListFieldType
{
    private $twig;
    private $urlGenerator;

    public function __construct(\Twig_Environment $twig, UrlGeneratorInterface $urlGenerator)
    {
        $this->urlGenerator = $urlGenerator;
        $this->twig = $twig;
    }

    public function header($name, Entity $configuration)
    {
        return $this->twig->render('@CmsKernelAdminBridge/components/translate_list_field_head.twig');
    }

    public function render($entity, $options, Entity $configuration)
    {
        if (!isset($options['action'])) {
            throw new \InvalidArgumentException('Action key is required');
        }

        return $this->twig->render('@CmsKernelAdminBridge/components/list_table_translations_content.html.twig', [
            'entity'       => $entity,
            'action'       => $options['action'],
            'entityConfig' => $configuration,
        ]);
    }
}
