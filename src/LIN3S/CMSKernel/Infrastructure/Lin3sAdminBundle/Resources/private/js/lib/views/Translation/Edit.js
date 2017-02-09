/*
 * This file is part of the CMS Kernel library.
 *
 * Copyright (c) 2016-2017 LIN3S <info@lin3s.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _EventPublisherInstance = require('../../EventPublisherInstance');

var _EventPublisherInstance2 = _interopRequireDefault(_EventPublisherInstance);

var _lin3sEventBus = require('lin3s-event-bus');

var _index = require('./../../../../../../../../../../../../admin-bundle/src/LIN3S/AdminBundle/Resources/private/js/lib/index');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var removeTranslationCallBack = function removeTranslationCallBack(element) {
  return window.location.replace(element.getAttribute('data-url'));
};

var onReady = function onReady() {
  var element = document.getElementById('react-confirmation-modal-remove-translation');

  if (element) {
    var trigger = {
      style: element.getAttribute('data-button-style'),
      content: element.getAttribute('data-button-title')
    };

    _reactDom2.default.render(_react2.default.createElement(_index.ConfirmationModal, {
      trigger: trigger,
      callback: removeTranslationCallBack.bind(undefined, element),
      description: element.getAttribute('data-message-description'),
      title: element.getAttribute('data-message-title') }), element);
  }
};

var init = function init() {
  _EventPublisherInstance2.default.subscribe(new _lin3sEventBus.DOMReadyEventSubscriber(onReady));
};
exports.default = init();
