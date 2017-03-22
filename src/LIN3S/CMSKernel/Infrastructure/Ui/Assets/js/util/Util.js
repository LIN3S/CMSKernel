/*
 * This file is part of the CMS Kernel package.
 *
 * Copyright (c) 2017-2018 LIN3S <info@lin3s.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 *
 * @author Mikel Tuesta <mikeltuesta@gmail.com>
 */

//////////////////////////////////////////////////////////////////////////////////////////////////////
// These are some handy methods for TypeChecking react props. (only for Component Class typeChecking)
// If you need to typeCheck an standard ES6 class, use 'React.PropTypes.instanceOf(YourClass)' instead
//////////////////////////////////////////////////////////////////////////////////////////////////////

import {React} from './../bundle.dependencies';

const reactPropType = type =>
  React.PropTypes.shape({
    type: React.PropTypes.oneOf([type])
  });

const reactPropTypeInstanceOf = ComponentClass =>
  React.PropTypes.oneOfType([reactPropType(ComponentClass)]);

const reactPropTypeArrayOf = ComponentClass =>
  React.PropTypes.oneOfType([
    React.PropTypes.arrayOf(reactPropType(ComponentClass)), // array of
    reactPropType(ComponentClass) // single instance
  ]);

//////////////////////////////////////////////////////////////////////////////////////////////////////
// This method will wrap your promise, provinding a method for canceling it.
//////////////////////////////////////////////////////////////////////////////////////////////////////

const makeCancelable = (promise) => {
  let hasCanceled_ = false;
  const wrappedPromise = new Promise((resolve, reject) => {
    promise.then((val) =>
      hasCanceled_ ? reject({isCanceled: true}) : resolve(val)
    );
    promise.catch((error) =>
      hasCanceled_ ? reject({isCanceled: true}) : reject(error)
    );
  });
  return {
    promise: wrappedPromise,
    cancel() {
      hasCanceled_ = true;
    },
  };
};

export {
  makeCancelable,
  reactPropType,
  reactPropTypeArrayOf,
  reactPropTypeInstanceOf
};
