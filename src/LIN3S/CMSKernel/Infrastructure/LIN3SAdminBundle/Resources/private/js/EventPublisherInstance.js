/*
 * This file is part of the CMS Kernel library.
 *
 * Copyright (c) 2016 LIN3S <info@lin3s.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

'use strict';

import {
  EventPublisher as Lin3sAdminBundleEventPublisher
} from './../../../../../../../../../admin-bundle/src/LIN3S/AdminBundle/Resources/private/js/lib/index';
import {EventPublisher as Lin3sEventPublisher} from 'lin3s-event-bus';

let _undefined = undefined;
((myUndefined) => {
  _undefined = myUndefined;
})();

const EventPublisher = Lin3sAdminBundleEventPublisher !== _undefined
  ? Lin3sAdminBundleEventPublisher
  : Lin3sEventPublisher;

export default EventPublisher;
