<?php

/*
 * This file is part of the CMS Kernel package.
 *
 * Copyright (c) 2016-present LIN3S <info@lin3s.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace LIN3S\CMSKernel\Infrastructure\Persistence\Doctrine\DBAL\Page\Template\Types;

use Doctrine\DBAL\Platforms\AbstractPlatform;
use Doctrine\DBAL\Types\GuidType;
use LIN3S\CMSKernel\Domain\Model\Template\TemplateId;

/**
 * @author Beñat Espiña <benatespina@gmail.com>
 */
class TemplateIdType extends GuidType
{
    public function convertToDatabaseValue($value, AbstractPlatform $platform)
    {
        if ($value instanceof TemplateId) {
            return $value->id();
        }

        return $value;
    }

    public function convertToPHPValue($value, AbstractPlatform $platform)
    {
        return TemplateId::generate($value);
    }

    public function getName()
    {
        return 'template_id';
    }
}
