<?php

/*
 * This file is part of the CMS Kernel library.
 *
 * Copyright (c) 2016-2017 LIN3S <info@lin3s.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace LIN3S\CMSKernel\Infrastructure\Persistence\Doctrine\DBAL\Page\Types;

use Doctrine\DBAL\Platforms\AbstractPlatform;
use Doctrine\DBAL\Types\GuidType;
use LIN3S\CMSKernel\Domain\Model\Page\PageTranslationId;

/**
 * @author Beñat Espiña <benatespina@gmail.com>
 */
class PageTranslationIdType extends GuidType
{
    public function convertToDatabaseValue($value, AbstractPlatform $platform)
    {
        if ($value instanceof PageTranslationId) {
            return $value->id();
        }

        return $value;
    }

    public function convertToPHPValue($value, AbstractPlatform $platform)
    {
        return PageTranslationId::generate($value);
    }

    public function getName()
    {
        return 'page_translation_id';
    }
}
