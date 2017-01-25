<?php

/*
 * This file is part of the CMS Kernel library.
 *
 * Copyright (c) 2016 LIN3S <info@lin3s.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace LIN3S\CMSKernel\Domain\Model\Translation;

/**
 * @author Gorka Laucirica <gorka.lauzirika@gmail.com>
 */
interface Translation
{
    public function translations();

    public function locale();

    public function origin();
}
