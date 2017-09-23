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

import {Parsley} from 'lin3s-front-foundation';

class TemplateSelector {
  static INPUT_SELECTORS = '.template-selector__template:not(.template-selector__template--selected) input';

  constructor(rootNode) {
    Parsley.excludeFormFields(TemplateSelector.INPUT_SELECTORS);

    this.templateName = rootNode.querySelector('.template-selector__name');
    this.templates = rootNode.querySelectorAll('.template-selector__template');

    this.onChange();
    this.templateName.addEventListener('change', this.onChange.bind(this));
  }

  onChange() {
    const SELECTED_CLASS = 'template-selector__template--selected';

    Array.from(this.templates).forEach((template) => {
      template.classList.remove(SELECTED_CLASS);

      if (this.isCurrentTemplate(template)) {
        template.classList.add(SELECTED_CLASS);
      }
    });
  }

  isCurrentTemplate(template) {
    const
      templateValue = template.getAttribute('data-template-index'),
      selectedValue = this.templateName.querySelector('select').value;

    return templateValue === selectedValue
  }
}

export default TemplateSelector;
