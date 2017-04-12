/* eslint react/no-danger: 0 */

import {React} from './../../bundle.dependencies';

import ConfirmationModal from './Component';

class App extends React.Component {
  static propTypes = {
    callback: React.PropTypes.func,
    description: React.PropTypes.string,
    title: React.PropTypes.string,
    trigger: React.PropTypes.object
  };

  constructor(props) {
    super(props);

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);

    this.state = {
      modalIsOpen: false
    };
  }

  openModal(event) {
    event.preventDefault();

    this.setState({
      modalIsOpen: true
    });

    document.getElementsByTagName('body')[0].style.overflow = 'hidden';
  }

  closeModal(event) {
    event.preventDefault();

    this.setState({
      modalIsOpen: false
    });

    document.getElementsByTagName('body')[0].style.overflow = '';
  }

  buildContent() {
    const {description, title} = this.props;

    return {
      title: title ? title : '',
      message: description ? description : ''
    };
  }

  buildTrigger() {
    const {trigger} = this.props;

    if (trigger.type === 'link') {
      return <a onClick={this.openModal}>{trigger.content}</a>;
    }

    return (
      <button
        className={trigger.style}
        dangerouslySetInnerHTML={{__html: trigger.content}}
        onClick={this.openModal}
      />
    );
  }

  render() {
    const {callback} = this.props;

    return (
      <div>
        {this.buildTrigger()}
        <ConfirmationModal
          callback={callback}
          closeModal={this.closeModal}
          content={this.buildContent()}
          isOpen={this.state.modalIsOpen}
        />
      </div>
    );
  }
}

export default App;
