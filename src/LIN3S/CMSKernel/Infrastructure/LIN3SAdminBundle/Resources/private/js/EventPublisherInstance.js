'use strict';

import {
  EventPublisher as Lin3sAdminBundleEventPublisher
} from './../../../../../../../../vendor/lin3s/admin-bundle/src/LIN3S/AdminBundle/Resources/private/js/lib/index';
import {EventPublisher as Lin3sEventPublisher} from 'lin3s-event-bus';

let _undefined = undefined;
((myUndefined) => {
  _undefined = myUndefined;
})();

const EventPublisher = Lin3sAdminBundleEventPublisher !== _undefined
  ? Lin3sAdminBundleEventPublisher
  : Lin3sEventPublisher;

export default EventPublisher;
