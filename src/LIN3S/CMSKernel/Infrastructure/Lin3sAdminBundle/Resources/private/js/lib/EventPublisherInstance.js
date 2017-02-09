/*
 * This file is part of the CMS Kernel library.
 *
 * Copyright (c) 2016 LIN3S <info@lin3s.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = require('./../../../../../../../../../../admin-bundle/src/LIN3S/AdminBundle/Resources/private/js/lib/index');

var _lin3sEventBus = require('lin3s-event-bus');

var _undefined = undefined;
(function (myUndefined) {
  _undefined = myUndefined;
})();

var EventPublisher = _index.EventPublisher !== _undefined ? _index.EventPublisher : _lin3sEventBus.EventPublisher;

exports.default = EventPublisher;