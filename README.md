#LIN3S CMS Kernel
>Base package to make CMS in an easy way

[![SensioLabsInsight](https://insight.sensiolabs.com/projects/66aaf1b9-c8bc-4d03-a831-3311630f5014/mini.png)](https://insight.sensiolabs.com/projects/66aaf1b9-c8bc-4d03-a831-3311630f5014)
[![Build Status](https://travis-ci.org/LIN3S/CMSKernel.svg?branch=master)](https://travis-ci.org/LIN3S/CMSKernel)
[![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/LIN3S/CMSKernel/badges/quality-score.png?b=master)](https://scrutinizer-ci.com/g/LIN3S/CMSKernel/?branch=master)
[![Total Downloads](https://poser.pugx.org/lin3s/cms-kernel/downloads)](https://packagist.org/packages/lin3s/cms-kernel)
&nbsp;&nbsp;&nbsp;&nbsp;
[![Latest Stable Version](https://poser.pugx.org/lin3s/cms-kernel/v/stable.svg)](https://packagist.org/packages/lin3s/cms-kernel)
[![Latest Unstable Version](https://poser.pugx.org/lin3s/cms-kernel/v/unstable.svg)](https://packagist.org/packages/lin3s/cms-kernel)

##How to's

### Adding form translations

You need to create a basic form type for the translation:

```php
(...)

class ExhibitionTranslationType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('title', TextType::class)
            ->add('description', TextareaType::class)
            ->add('custom_date', TextType::class, ['required' => false])
            ->add('link_text', TextType::class)
            ->add('link_url', TextType::class)
            ->add('image_text', TextType::class)
            ->add('image_url', TextType::class)
            ->add('slug', TextType::class);
    }
}

(...)
```

And use it in a form type:

```php
class AddExhibitionType extends AbstractType implements DataMapperInterface
{
    private $locale;
    
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $this->locale = $options['locale'];
        
        $builder
            ->add('translation', ExhibitionTranslationType::class)
            ->setDataMapper($this);
    }
    
        
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setRequired(['locale']);
    }
    
    public function mapFormsToData($forms, &$data)
    {
        $forms = iterator_to_array($forms);
        $translation = $forms['translation']->getData();
        
        $data = new AddExhibitionCommand(
            $this->locale,
            $translation['title'],
            $translation['description'],
            $translation['custom_date'],
            $translation['link_text'],
            $translation['link_url'],
            $translation['image_text'],
            $translation['image_url'],
            $translation['slug']
        );
    }
}
```

##Licensing Options
[![License](https://poser.pugx.org/lin3s/cms-kernel/license.svg)](https://github.com/LIN3S/CMSKernel/blob/master/LICENSE)
