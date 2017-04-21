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

const
  reactPropType = (...type) =>
    React.PropTypes.shape({
      type: React.PropTypes.oneOf([...type])
    }),
  reactPropTypeOneOf = (propKey, validProps) => {
    return (props, propName, componentName) => {
      if (propName === propKey && validProps.find(prop => prop === props[propName]) === undefined) {
        return new Error(
          `Invalid prop '${propName}' supplied to '${componentName}'. Validation failed.`
        );
      }
    }
  },
  reactPropTypeInstanceOf = ComponentClass =>
    React.PropTypes.oneOfType([reactPropType(ComponentClass)]),
  reactPropTypeArrayOf = ComponentClass =>
    React.PropTypes.oneOfType([
      React.PropTypes.arrayOf(reactPropType(ComponentClass)), // array of
      reactPropType(ComponentClass) // single instance
    ]);

//////////////////////////////////////////////////////////////////////////////////////////////////////
// This method will wrap your promise, provinding a method for canceling it.
//////////////////////////////////////////////////////////////////////////////////////////////////////

const
  makeCancelable = (promise) => {
    let hasBeenCanceled = false;
    const wrappedPromise = new Promise((resolve, reject) => {
      promise.then((val) =>
        hasBeenCanceled ? reject({isCanceled: true}) : resolve(val)
      );
      promise.catch((error) =>
        hasBeenCanceled ? reject({isCanceled: true}) : reject(error)
      );
    });
    return {
      promise: wrappedPromise,
      cancel() {
        hasBeenCanceled = true;
      },
    };
  };

//////////////////////////////////////////////////////////////////////////////////////////////////////
// This methods will help us mapping formInput values, and getting mapped formInput attributes.
//////////////////////////////////////////////////////////////////////////////////////////////////////

const
  setFormInputValue = (formInput, value) => {
    formInput.value = value;
  },
  getFormInputValue = (formInput) => {
    return formInput.value;
  },
  getFormInputAttribute = (formInput, attributeName) => {
    return formInput.getAttribute(attributeName);
  };

export {
  makeCancelable,
  reactPropType,
  reactPropTypeOneOf,
  reactPropTypeArrayOf,
  reactPropTypeInstanceOf,
  setFormInputValue,
  getFormInputValue,
  getFormInputAttribute
};
