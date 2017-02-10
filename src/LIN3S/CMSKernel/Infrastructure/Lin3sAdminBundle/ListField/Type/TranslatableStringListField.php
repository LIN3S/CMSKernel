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
use LIN3S\CMSKernel\Domain\Model\Translation\Translatable;
use LIN3S\CMSKernel\Domain\Model\Translation\TranslationDoesNotExistException;
use Symfony\Component\Translation\TranslatorInterface;

/**
 * @author Beñat Espiña <benatespina@gmail.com>
 */
class TranslatableStringListField implements ListFieldType
{
    private $translator;

    public function __construct(TranslatorInterface $translator)
    {
        $this->translator = $translator;
    }

    public function header($name, Entity $configuration)
    {
        if (!isset($name)) {
            throw new \InvalidArgumentException('Field to be rendered must be passed as string');
        }

        return $this->translator->trans($name);
    }

    public function render($entity, $options, Entity $configuration)
    {
        if (!isset($options['field'])) {
            throw new \InvalidArgumentException('Field to be rendered must be passed as string');
        }
        $properties = explode('.', $options['field']);

        $value = $entity;
        if (!$value instanceof Translatable || $properties[0] !== 'translations') {
            throw new \LogicException(
                sprintf(
                    'The entity must be an instance of %s, and the given field must be begin with "translations" value',
                    Translatable::class
                )
            );
        }
        unset($properties[0]);
        reset($properties);

        try {
            $value = $value->{$this->translator->getLocale()}();
            foreach ($properties as $property) {
                $value = $value->$property();
            }

            return (string) $value;
        } catch (TranslationDoesNotExistException $exception) {
            return $this->translator->trans('cms_kernel_admin_bridge.translation.locale_not_defined', [
                '%locale%' => $this->translator->getLocale(),
            ]);
        }
    }
}
