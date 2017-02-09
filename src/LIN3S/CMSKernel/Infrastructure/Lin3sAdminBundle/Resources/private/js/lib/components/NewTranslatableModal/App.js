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

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Component2 = require('./Component');

var _Component3 = _interopRequireDefault(_Component2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_Component) {
  _inherits(App, _Component);

  function App() {
    _classCallCheck(this, App);

    var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this));

    _this.state = {
      modalIsOpen: false
    };
    return _this;
  }

  _createClass(App, [{
    key: 'openModal',
    value: function openModal() {
      this.setState({
        modalIsOpen: true
      });

      document.getElementsByTagName('body')[0].style.overflow = 'hidden';
    }
  }, {
    key: 'closeModal',
    value: function closeModal() {
      this.setState({
        modalIsOpen: false
      });

      document.getElementsByTagName('body')[0].style.overflow = '';
    }
  }, {
    key: 'buildTrigger',
    value: function buildTrigger() {
      return _react2.default.createElement('button', {
        className: this.props.trigger.style,
        dangerouslySetInnerHTML: { __html: this.props.trigger.content },
        onClick: this.openModal.bind(this) });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        this.buildTrigger(),
        _react2.default.createElement(_Component3.default, {
          button: this.props.button,
          callback: this.props.callback,
          closeModal: this.closeModal.bind(this),
          content: this.props.content,
          isOpen: this.state.modalIsOpen,
          title: this.props.title
        })
      );
    }
  }]);

  return App;
}(_react.Component);

App.propTypes = {
  button: _react2.default.PropTypes.string.isRequired,
  callback: _react2.default.PropTypes.func.isRequired,
  content: _react2.default.PropTypes.string.isRequired,
  title: _react2.default.PropTypes.string,
  trigger: _react2.default.PropTypes.object
};
exports.default = App;
