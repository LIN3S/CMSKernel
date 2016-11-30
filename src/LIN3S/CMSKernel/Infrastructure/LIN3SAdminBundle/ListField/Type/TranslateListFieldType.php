<?php

/*
 * This file is part of the CMS Kernel library.
 *
 * Copyright (c) 2016 LIN3S <info@lin3s.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace LIN3S\CMSKernel\Infrastructure\LIN3SAdminBundle\ListField\Type;

use LIN3S\AdminBundle\Configuration\EntityConfiguration;
use LIN3S\AdminBundle\ListFields\ListFieldType;
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

    public function header($options, EntityConfiguration $configuration)
    {
        return $this->twig->render('@Lin3sCmsAdminBridge/components/translate_list_field_head.twig');
    }

    public function render($entity, $options, EntityConfiguration $configuration)
    {
        if (!isset($options['action'])) {
            throw new \InvalidArgumentException('Action key is required');
        }

        return $this->twig->render('@Lin3sCmsAdminBridge/components/list_table_translations_content.html.twig', [
            'entity'       => $entity,
            'action'       => $options['action'],
            'entityConfig' => $configuration,
        ]);
    }
}
