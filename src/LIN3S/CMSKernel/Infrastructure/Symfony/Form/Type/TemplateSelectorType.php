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

use LIN3S\CMSKernel\Domain\Model\Template\Template;
use LIN3S\SharedKernel\Exception\InvalidArgumentException;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\DataMapperInterface;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

/**
 * @author Beñat Espiña <benatespina@gmail.com>
 */
class TemplateSelectorType extends AbstractType implements DataMapperInterface
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('name', ChoiceType::class, [
                'choices'            => $this->getChoices($options),
                'label'              => 'lin3s_cms_kernel.form.type.template_selector.name',
                'translation_domain' => 'Lin3sCmsKernel',
            ]);

        foreach ($options['templates'] as $key => $template) {
            $templateOptions = isset($template['options']) ? $template['options'] : [];

            $builder
                ->add($this->getTemplate($template), $this->getType($template), $templateOptions)
                ->setDataMapper($this);
        }
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setRequired('templates');
    }

    public function mapDataToForms($data, $forms)
    {
        if (null === $data) {
            return;
        }
        if (!$data instanceof Template) {
            throw new InvalidArgumentException(
                sprintf(
                    'Given data must be %s instance, %s given',
                    Template::class,
                    get_class($data)
                )
            );
        }

        $forms = iterator_to_array($forms);

        $forms['name']->setData($data::name());
        $forms[$data::name()]->setData($data->serialize());
    }

    public function mapFormsToData($forms, &$data)
    {
        $forms = iterator_to_array($forms);

        if (empty($data)) {
            $data = ['name' => '', 'content' => ''];
        } else {
            $templateName = $forms['name']->getData();

            $data = [
                'name'    => $templateName,
                'content' => $forms[$templateName]->getData(),
            ];
        }
    }

    public function getBlockPrefix()
    {
        return 'template_selector';
    }

    private function getChoices(array $options)
    {
        $choices = [];
        foreach ($options['templates'] as $key => $template) {
            if (isset($template['options']) && isset($template['options']['label'])) {
                $choices[$template['options']['label']] = $this->getTemplate($template);
            } else {
                $choices[$key] = ucfirst($key);
            }
        }

        return $choices;
    }

    private function getTemplate($template)
    {
        if (!isset($template['options']['template'])) {
            throw new \Exception('The template must have a "template" key');
        }
        $templateReflection = new \ReflectionClass($template['options']['template']);
        if (!$templateReflection->implementsInterface(Template::class)) {
            throw new \Exception(
                sprintf(
                    'The "template" key must be an instance of %s, %s given.',
                    Template::class,
                    $template['options']['template']
                )
            );
        }

        return $template['options']['template']::name();
    }

    private function getType($template)
    {
        if (!isset($template['type'])) {
            throw new \Exception('The template must have a "type" key');
        }

        return $template['type'];
    }
}
