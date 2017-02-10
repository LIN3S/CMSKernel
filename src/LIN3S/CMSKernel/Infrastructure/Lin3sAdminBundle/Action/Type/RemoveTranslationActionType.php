<?php

/*
 * This file is part of the CMS Kernel library.
 *
 * Copyright (c) 2016-2017 LIN3S <info@lin3s.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace LIN3S\CMSKernel\Infrastructure\Lin3sAdminBundle\Action\Type;

use Doctrine\Common\Persistence\ObjectManager;
use LIN3S\AdminBundle\Configuration\Model\Entity;
use LIN3S\AdminBundle\Configuration\Type\ActionType;
use LIN3S\AdminBundle\Extension\Action\EntityId;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Session\Flash\FlashBagInterface;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;

/**
 * @author Beñat Espiña <benatespina@gmail.com>
 */
class RemoveTranslationActionType implements ActionType
{
    use EntityId;

    private $manager;
    private $flashBag;
    private $urlGenerator;

    public function __construct(
        UrlGeneratorInterface $urlGenerator,
        ObjectManager $manager,
        FlashBagInterface $flashBag
    ) {
        $this->manager = $manager;
        $this->flashBag = $flashBag;
        $this->urlGenerator = $urlGenerator;
    }

    public function execute($entity, Entity $config, Request $request, $options = null)
    {
        $id = (string)$this->getEntityId($entity, $config);
        if (!$entity) {
            throw new NotFoundHttpException(
                sprintf('The translatable with %s id does not exist', $id)
            );
        }

        $locale = $request->query->get('locale');
        try {
            $translation = $entity->{$locale}();
            $entity->removeTranslation($translation->locale());

            if ($entity->translations()->count() === 0) {
                $this->manager->remove($entity);
            } else {
                $this->manager->persist($entity);
            }

            $this->manager->flush();

            $this->flashBag->add(
                'lin3s_admin_success',
                sprintf(
                    'The %s translation of %s is successfully removed',
                    $locale,
                    $config->name()
                )
            );
        } catch (\Exception $exception) {
            $this->flashBag->add(
                'lin3s_admin_error',
                sprintf(
                    'Errors while remove the %s translation of %s',
                    $locale,
                    $config->name()
                )
            );
        }

        return new RedirectResponse(
            $this->urlGenerator->generate('lin3s_admin_list', [
                'entity' => $config->name(),
            ])
        );
    }
}
