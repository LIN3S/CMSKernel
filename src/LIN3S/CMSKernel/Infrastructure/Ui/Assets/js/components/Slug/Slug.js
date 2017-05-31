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

    this.input.addEventListener('focusout', this.onFocusOut.bind(this));
    this.action.addEventListener('click', this.onClick.bind(this));
  }

  static slugify(string) {
    return string.toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  onClick() {
    this.edit.classList.toggle('slug__action--visible');
    this.close.classList.toggle('slug__action--visible');

    this.slug();
    this.toggleDisabled();
  }

  onFocusOut() {
    this.slug();
    this.makeDisabled();
  }

  slug() {
    this.input.value = this.input.value
      ? this.constructor.slugify(this.input.value)
      : this.constructor.slugify(this.from.value);
  }

  toggleDisabled() {
    if (this.edit.classList.contains('slug__action--visible')) {
      this.input.setAttribute('disabled', true);
      this.input.classList.add('slug__input--disabled');

      return;
    }
    this.input.classList.remove('slug__input--disabled');
    this.input.removeAttribute('disabled');
  }

  makeDisabled() {
    this.edit.classList.add('slug__action--visible');
    this.close.classList.remove('slug__action--visible');

    this.input.setAttribute('disabled', true);
    this.input.classList.add('slug__input--disabled');
  }
}

export default Slug;
