<?php

/*
 * This file is part of the CMS Kernel package.
 *
 * Copyright (c) 2016-present LIN3S <info@lin3s.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace LIN3S\CMSKernel\Infrastructure\BenGorFileBundle\HttpAction;

use BenGorFile\File\Domain\Model\FileAlreadyExistsException;
use BenGorFile\File\Domain\Model\FileDoesNotExistException;
use BenGorFile\File\Domain\Model\FileMimeTypeDoesNotSupportException;
use BenGorFile\File\Domain\Model\FileNameInvalidException;
use BenGorFile\File\Infrastructure\Application\FileCommandBus;
use BenGorFile\FileBundle\Controller\SuffixNumberUploadAction;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

/**
 * @author Beñat Espiña <benatespina@gmail.com>
 */
class AjaxFileUploadAction
{
    use SuffixNumberUploadAction;

    private $commandBus;

    public function __construct(FileCommandBus $commandBus)
    {
        $this->commandBus = $commandBus;
    }

    public function __invoke(Request $request)
    {
        try {
            $fileData = $this->upload($request, $this->commandBus, 'file');
        } catch (FileDoesNotExistException $exception) {
            return new JsonResponse($exception->getMessage(), 404);
        } catch (FileAlreadyExistsException $exception) {
            return new JsonResponse($exception->getMessage(), 409);
        } catch (FileMimeTypeDoesNotSupportException $exception) {
            return new JsonResponse($exception->getMessage(), 400);
        } catch (FileNameInvalidException $exception) {
            return new JsonResponse($exception->getMessage(), 400);
        }

        return new JsonResponse($fileData);
    }
}
