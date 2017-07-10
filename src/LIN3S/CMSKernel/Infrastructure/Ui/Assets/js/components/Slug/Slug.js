/*
 * This file is part of the CMS Kernel package.
 *
 * Copyright (c) 2016-present LIN3S <info@lin3s.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 *
 * @author Beñat Espiña <benatespina@gmail.com>
 * @author Mikel Tuesta <mikeltuesta@gmail.com>
 */

class Slug {
  constructor(rootNode) {
    this.input = rootNode.querySelector('input[type=hidden]');
    this.mirrorInput = rootNode.querySelector('.slug__input');
    this.action = rootNode.querySelector('.js-slug-click-action');
    this.edit = this.action.querySelector('.slug__action--edit');
    this.close = this.action.querySelector('.slug__action--close');

    const dataFromId = this.input.getAttribute('data-from-id');
    this.from = document.getElementById(dataFromId);

    this.bindListeners();
    this.fillSlugValue();
  }

  static slugify(string) {
    return string.toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  bindListeners() {
    this.mirrorInput.addEventListener('focusout', this.handleInputFocusOut.bind(this));
    this.from.addEventListener('focusout', this.handleInputFocusOut.bind(this));
    this.action.addEventListener('click', this.handleActionClicked.bind(this));
  }

  handleActionClicked() {
    this.fillSlugValue();

    if (this.mirrorInput.disabled) {
      this.enableSlugInput();
      this.mirrorInput.focus();
    } else {
      this.disableSlugInput();
    }
  }

  handleInputFocusOut() {
    this.fillSlugValue();
    this.disableSlugInput();
  }

  fillSlugValue() {
    this.mirrorInput.value = this.mirrorInput.value
      ? this.constructor.slugify(this.mirrorInput.value)
      : this.constructor.slugify(this.from.value);

    this.input.value = this.mirrorInput.value;
  }

  enableSlugInput() {
    this.edit.classList.remove('slug__action--visible');
    this.close.classList.add('slug__action--visible');

    this.mirrorInput.classList.remove('slug__input--disabled');
    this.mirrorInput.disabled = false;
  }

  disableSlugInput() {
    this.edit.classList.add('slug__action--visible');
    this.close.classList.remove('slug__action--visible');

    this.mirrorInput.classList.add('slug__input--disabled');
    this.mirrorInput.disabled = true;
  }
}

export default Slug;
