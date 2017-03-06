/*
 * This file is part of the CMS Kernel package.
 *
 * Copyright (c) 2016-present LIN3S <info@lin3s.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 *
 * @author Beñat Espiña <benatespina@gmail.com>
 */

class TemplateSelector {
  constructor(rootNode) {
    this.templateName = rootNode.querySelector('.template-selector__name');
    this.templates = rootNode.querySelectorAll('.template-selector__template');

    this.onChange();
    this.templateName.addEventListener('change', this.onChange.bind(this));
  }

  onChange() {
    const
      SELECTED_CLASS = 'template-selector__template--selected',
      selectedValue = this.templateName.querySelector('select').value;

    this.templates.forEach((template) => {
      const templateValue = template.getAttribute('data-template-index');

      template.classList.remove(SELECTED_CLASS);
      if (templateValue === selectedValue) {
        template.classList.add(SELECTED_CLASS);
      }
    });
  }
}

export default TemplateSelector;
