/*
 * This file is part of the CMS Kernel library.
 *
 * Copyright (c) 2016 LIN3S <info@lin3s.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

'use strict';

import React, {Component} from 'react';
import Modal from 'react-modal';

const styles = {
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

class NewTranslatableModal extends Component {
  static propTypes = {
    args: React.PropTypes.array,
    button: React.PropTypes.string.isRequired,
    callback: React.PropTypes.func.isRequired,
    closeModal: React.PropTypes.func,
    content: React.PropTypes.string.isRequired,
    isOpen: React.PropTypes.bool
  };

  constructor() {
    super();
    this.state = {
      locales: []
    };
  }

  componentWillMount() {
    let index = 0;
    for (let locale in this.content().locales) {
      let localeString = this.content().locales[locale];

      this.state.locales.push(
        <option key={locale} value={locale}>{localeString}</option>
      );

      if (0 === index) {
        document
          .getElementById('react-confirm-global-action')
          .setAttribute('data-selected-locale', locale);
      }
      index++;
    }
  }

  callback() {
    this.props.callback(this.props.args);
    this.props.closeModal();
  }

  onSelectChange(event) {
    document
      .getElementById('react-confirm-global-action')
      .setAttribute('data-selected-locale', event.target.value);
  }

  title() {
    return this.props.title ? this.props.title : '';
  }

  content() {
    const content = JSON.parse(this.props.content);

    return {
      main: content['main'] ? content.main : '',
      locales: content['locales'] ? content.locales : '',
    };
  }

  render() {

    return (
      <Modal
        isOpen={this.props.isOpen}
        onRequestClose={this.props.closeModal}
        style={{overlay: styles.reactModalOverlay, content: styles.reactModalContent}}>
        <div style={styles.root}>
          <h2>{this.title()}</h2>
          <div style={styles.content}>
            <div>{this.content().main}</div>
            <select
              className="form__select"
              onChange={this.onSelectChange.bind(this)}
              style={styles.localesSelect}>
              {this.state.locales}
            </select>
          </div>
          <div style={styles.actions}>
            <button className="button button--secondary"
                    onClick={this.callback.bind(this)}
                    type="button">
              {this.props.button}
            </button>
          </div>
        </div>
      </Modal>
    )
  }
}

export default NewTranslatableModal;
