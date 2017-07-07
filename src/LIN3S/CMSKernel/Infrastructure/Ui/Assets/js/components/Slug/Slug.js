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

class Slug {
  constructor(rootNode) {
    this.input = rootNode.querySelector('.slug__input');
    this.action = rootNode.querySelector('.js-slug-click-action');
    this.edit = this.action.querySelector('.slug__action--edit');
    this.close = this.action.querySelector('.slug__action--close');

    const dataFromId = this.input.getAttribute('data-from-id');
    this.from = document.getElementById(dataFromId);

    this.disableSlugInput();

    this.input.addEventListener('focusout', this.handleInputFocusOut.bind(this));
    this.from.addEventListener('focusout', this.handleInputFocusOut.bind(this));
    this.action.addEventListener('click', this.handleActionClicked.bind(this));
  }

  static slugify(string) {
    return string.toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  handleActionClicked() {
    this.fillSlugValue();
    this.enableSlugInput();
  }

  handleInputFocusOut() {
    this.fillSlugValue();
    this.disableSlugInput();
  }

  fillSlugValue() {
    this.input.value = this.input.value
      ? this.constructor.slugify(this.input.value)
      : this.constructor.slugify(this.from.value);
  }

  enableSlugInput() {
    this.edit.classList.remove('slug__action--visible');
    this.close.classList.add('slug__action--visible');
    this.input.classList.remove('slug__input--disabled');
    this.input.disabled = true;
  }

  disableSlugInput() {
    this.edit.classList.add('slug__action--visible');
    this.close.classList.remove('slug__action--visible');
    this.input.classList.add('slug__input--disabled');
    this.input.disabled = true;
  }
}

export default Slug;
