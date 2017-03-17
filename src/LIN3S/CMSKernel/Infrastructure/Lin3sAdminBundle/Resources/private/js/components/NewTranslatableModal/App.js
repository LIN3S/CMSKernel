/*
 * This file is part of the CMS Kernel package.
 *
 * Copyright (c) 2016-present LIN3S <info@lin3s.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

/* eslint-disable react/no-danger */

import {React} from './../../../../../../Ui/Assets/js/bundle.dependencies';

import NewTranslatableModal from './Component';

class App extends React.Component {
  static propTypes = {
    button: React.PropTypes.string.isRequired,
    callback: React.PropTypes.func.isRequired,
    content: React.PropTypes.string.isRequired,
    title: React.PropTypes.string,
    trigger: React.PropTypes.object,
  };

  constructor() {
    super();
    this.state = {
      modalIsOpen: false
    };
  }

  openModal() {
    this.setState({
      modalIsOpen: true
    });

    document.getElementsByTagName('body')[0].style.overflow = 'hidden';
  }

  closeModal() {
    this.setState({
      modalIsOpen: false
    });

    document.getElementsByTagName('body')[0].style.overflow = '';
  }

  buildTrigger() {
    return (
      <button
        className={this.props.trigger.style}
        dangerouslySetInnerHTML={{__html: this.props.trigger.content}}
        onClick={this.openModal.bind(this)}/>
    );
  }

  render() {
    return (
      <div>
        {this.buildTrigger()}
        <NewTranslatableModal
          button={this.props.button}
          callback={this.props.callback}
          closeModal={this.closeModal.bind(this)}
          content={this.props.content}
          isOpen={this.state.modalIsOpen}
          title={this.props.title}
        />
      </div>
    );
  }
}

export default App;
