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

import 'whatwg-fetch';
import 'polyfill-array-includes';

Object.assign = require('object-assign');

if (typeof Array.from === 'undefined') {
  Array.from = require('array-from');
}

if (typeof Number.isNaN === 'undefined') {
  Number.isNaN = require('is-nan');
}

if (typeof Promise === 'undefined') {
  require('promise/lib/rejection-tracking').enable();
  window.Promise = require('promise/lib/es6-extensions.js');
}

if (!String.prototype.startsWith) {
  String.prototype.startsWith = function (searchString, position) {
    position = position || 0;

    return this.substr(position, searchString.length) === searchString;
  };
}

if (!String.prototype.endsWith) {
  String.prototype.endsWith = function(searchString, position) {
    var subjectString = this.toString();
    if (typeof position !== 'number' || !isFinite(position) || Math.floor(position) !== position || position > subjectString.length) {
      position = subjectString.length;
    }
    position -= searchString.length;
    var lastIndex = subjectString.indexOf(searchString, position);
    return lastIndex !== -1 && lastIndex === position;
  };
}

if (!Array.prototype.find) {
  Array.prototype.find = function (predicate) { // eslint-disable-line no-extend-native
    if (this === null) {
      throw new TypeError('Array.prototype.find called on null or undefined');
    }
    if (typeof predicate !== 'function') {
      throw new TypeError('predicate must be a function');
    }
    const
      list = Object(this),
      length = list.length >>> 0,
      thisArg = arguments[1];
    let value;

    for (let i = 0; i < length; i++) {
      value = list[i];
      if (predicate.call(thisArg, value, i, list)) { // eslint-disable-line prefer-reflect
        return value;
      }
    }

    return undefined;
  };
}

if ( ![].fill)  {
  Array.prototype.fill = function( value ) {

    var O = Object( this );
    var len = parseInt( O.length, 10 );
    var start = arguments[1];
    var relativeStart = parseInt( start, 10 ) || 0;
    var k = relativeStart < 0
      ? Math.max( len + relativeStart, 0)
      : Math.min( relativeStart, len );
    var end = arguments[2];
    var relativeEnd = end === undefined
      ? len
      : ( parseInt( end)  || 0) ;
    var final = relativeEnd < 0
      ? Math.max( len + relativeEnd, 0 )
      : Math.min( relativeEnd, len );

    for (; k < final; k++) {
      O[k] = value;
    }

    return O;
  };
}
