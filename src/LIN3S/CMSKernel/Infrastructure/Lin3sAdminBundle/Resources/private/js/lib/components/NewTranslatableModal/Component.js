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

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactModal = require('react-modal');

var _reactModal2 = _interopRequireDefault(_reactModal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var styles = {
  reactModalOverlay: {
    zIndex: 1000
  },
  reactModalContent: {
    alignItems: 'center',
    display: 'flex',
    height: '35%',
    justifyContent: 'center',
    left: '50%',
    padding: '0',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    width: '40%'
  },
  root: {
    backgroundColor: '#fff',
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: '500px',
    position: 'relative',
    textAlign: 'center',
    width: '100%'
  },
  content: {
    marginBottom: '15px',
    marginLeft: '10px',
    marginRight: '10px'
  },
  actions: {
    display: 'flex',
    justifyContent: 'space-around',
    marginBottom: '15px',
    marginLeft: '10px',
    marginRight: '10px'
  },
  localesSelect: {
    marginBottom: '10px',
    marginTop: '15px'
  }
};

var NewTranslatableModal = function (_Component) {
  _inherits(NewTranslatableModal, _Component);

  function NewTranslatableModal() {
    _classCallCheck(this, NewTranslatableModal);

    var _this = _possibleConstructorReturn(this, (NewTranslatableModal.__proto__ || Object.getPrototypeOf(NewTranslatableModal)).call(this));

    _this.state = {
      locales: []
    };
    return _this;
  }

  _createClass(NewTranslatableModal, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var index = 0;
      for (var locale in this.content().locales) {
        var localeString = this.content().locales[locale];

        this.state.locales.push(_react2.default.createElement(
          'option',
          { key: locale, value: locale },
          localeString
        ));

        if (0 === index) {
          document.getElementById('react-confirm-global-action').setAttribute('data-selected-locale', locale);
        }
        index++;
      }
    }
  }, {
    key: 'callback',
    value: function callback() {
      this.props.callback(this.props.args);
      this.props.closeModal();
    }
  }, {
    key: 'onSelectChange',
    value: function onSelectChange(event) {
      document.getElementById('react-confirm-global-action').setAttribute('data-selected-locale', event.target.value);
    }
  }, {
    key: 'title',
    value: function title() {
      return this.props.title ? this.props.title : '';
    }
  }, {
    key: 'content',
    value: function content() {
      var content = JSON.parse(this.props.content);

      return {
        main: content['main'] ? content.main : '',
        locales: content['locales'] ? content.locales : ''
      };
    }
  }, {
    key: 'render',
    value: function render() {

      return _react2.default.createElement(
        _reactModal2.default,
        {
          isOpen: this.props.isOpen,
          onRequestClose: this.props.closeModal,
          style: { overlay: styles.reactModalOverlay, content: styles.reactModalContent } },
        _react2.default.createElement(
          'div',
          { style: styles.root },
          _react2.default.createElement(
            'h2',
            null,
            this.title()
          ),
          _react2.default.createElement(
            'div',
            { style: styles.content },
            _react2.default.createElement(
              'div',
              null,
              this.content().main
            ),
            _react2.default.createElement(
              'select',
              {
                className: 'form__select',
                onChange: this.onSelectChange.bind(this),
                style: styles.localesSelect },
              this.state.locales
            )
          ),
          _react2.default.createElement(
            'div',
            { style: styles.actions },
            _react2.default.createElement(
              'button',
              { className: 'button button--secondary',
                onClick: this.callback.bind(this),
                type: 'button' },
              this.props.button
            )
          )
        )
      );
    }
  }]);

  return NewTranslatableModal;
}(_react.Component);

NewTranslatableModal.propTypes = {
  args: _react2.default.PropTypes.array,
  button: _react2.default.PropTypes.string.isRequired,
  callback: _react2.default.PropTypes.func.isRequired,
  closeModal: _react2.default.PropTypes.func,
  content: _react2.default.PropTypes.string.isRequired,
  isOpen: _react2.default.PropTypes.bool
};
exports.default = NewTranslatableModal;