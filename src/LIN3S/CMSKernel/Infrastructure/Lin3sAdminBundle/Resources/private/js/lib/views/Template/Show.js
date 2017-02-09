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

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _EventPublisherInstance = require('../../EventPublisherInstance');

var _EventPublisherInstance2 = _interopRequireDefault(_EventPublisherInstance);

var _lin3sEventBus = require('lin3s-event-bus');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var onReady = function onReady() {
  (0, _jquery2.default)('#templateName').on('change', function (event) {
    _jquery2.default.get('/admin/templates/' + (0, _jquery2.default)(event.currentTarget).val()).done(function (response) {
      (0, _jquery2.default)('.js-template').remove();
      (0, _jquery2.default)('#templateName').parent().after(response);
    });
  });
};

var init = function init() {
  _EventPublisherInstance2.default.subscribe(new _lin3sEventBus.DOMReadyEventSubscriber(onReady));
};
exports.default = init();
