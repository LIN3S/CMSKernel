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

import slugify from 'slug';

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
    this.fillInitialSlugValue();
  }

  bindListeners() {
    this.mirrorInput.addEventListener('focusout', this.fillAndDisableInput.bind(this));
    this.from.addEventListener('focusout', this.fillAndDisableInput.bind(this));

    this.edit.addEventListener('click', this.fillAndEnableInput.bind(this));
    this.close.addEventListener('click', this.fillAndDisableInput.bind(this));
  }

  fillAndEnableInput() {
    this.fillSlugValue();
    this.enableSlugInput();
    this.mirrorInput.focus();
  }

  fillAndDisableInput() {
    this.fillSlugValue();
    this.disableSlugInput();
  }

  fillInitialSlugValue() {
    if (!this.input.value) {
      return;
    }

    this.mirrorInput.value = this.input.value;
  }

  fillSlugValue() {
    this.mirrorInput.value = this.mirrorInput.value
      ? slugify(this.mirrorInput.value)
      : slugify(this.from.value, {lower: true});

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
