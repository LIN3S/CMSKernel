<?php

/*
 * This file is part of the Php DDD Standard project.
 *
 * Copyright (c) 2017 LIN3S <info@lin3s.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace LIN3S\CMSKernel\Infrastructure\Symfony\Form\Type\Menu;

use LIN3S\CMSKernel\Application\Command\Menu\ManageMenuCommand;
use LIN3S\CMSKernel\Domain\Model\Menu\EmptyMenuCodeException;
use LIN3S\CMSKernel\Domain\Model\Menu\EmptyMenuNameException;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\DataMapperInterface;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Form\FormError;
use Symfony\Component\Form\FormInterface;
use Symfony\Component\Form\FormView;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Translation\TranslatorInterface;

/**
 * @author Beñat Espiña <benatespina@gmail.com>
 */
class AddMenuType extends AbstractType implements DataMapperInterface
{
    private $locale;
    private $translator;

    public function __construct(TranslatorInterface $translator)
    {
        $this->translator = $translator;
    }

    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $this->locale = $options['locale'];

        $builder
            ->add('code', TextType::class)
            ->add('translation', MenuTranslationType::class, [
                'locale' => $this->locale,
            ])
            ->setDataMapper($this);
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setRequired('locale');
    }

    public function buildView(FormView $view, FormInterface $form, array $options)
    {
        $view->vars = array_merge($view->vars, [
            'groups' => [
                [
                    'name'   => 'Menu',
                    'fields' => [
                        'code',
                        'translation.name',
                        'translation.items',
                    ],
                ],
            ],
        ]);
    }

    public function mapDataToForms($data, $forms)
    {
        if (null === $data) {
            return;
        }
        $forms = iterator_to_array($forms);
        $translation = $data->${$this->locale}();

        $forms['code']->setData($data->code());

        $forms['translation']->setData([
            'name'  => $translation->name(),
            'items' => $translation->items(),
        ]);
    }

    public function mapFormsToData($forms, &$data)
    {
        $forms = iterator_to_array($forms);
        $translation = $forms['translation']->getData();

        try {
            $data = new ManageMenuCommand(
                $this->locale,
                $translation['name'],
                $forms['code']->getData(),
                $translation['items']
            );
        } catch (EmptyMenuCodeException $exception) {
            $forms['translation']['code']->addError(
                new FormError(
                    $this->translator->trans(
                        'lin3s_cms_kernel.form.type.menu.error.empty_menu_code',
                        [],
                        'Lin3sCmsKernel'
                    )
                )
            );
        } catch (EmptyMenuNameException $exception) {
            $forms['translation']['name']->addError(
                new FormError(
                    $this->translator->trans(
                        'lin3s_cms_kernel.form.type.menu.error.empty_menu_name',
                        [],
                        'Lin3sCmsKernel'
                    )
                )
            );
        }
    }
}
