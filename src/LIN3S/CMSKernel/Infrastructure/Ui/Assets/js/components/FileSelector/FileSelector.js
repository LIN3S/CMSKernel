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

import {React, uppy} from './../../bundle.dependencies';
import {Tabbed} from './../../bundle.components';

import Tab from './../Tabbed/Tab';

const
  Uppy = uppy.Core,
  Dashboard = uppy.Dashboard,
  Informer = uppy.Informer,
  MetaData = uppy.MetaData,
  Tus10 = uppy.Tus10;

class FileSelector extends React.Component {

  static propTypes = {
    galleryEndpoint: React.PropTypes.string.isRequired,
    id: React.PropTypes.string.isRequired,
    mimeTypes: React.PropTypes.array.isRequired,
    uploadEndpoint: React.PropTypes.string.isRequired
  };

  uppy;
  uppyTargetClassIdentifier;

  constructor(props) {
    super(props);

    this.state = {
      isUppyInitialized: false,
      selectedTabIndex: 0
    };

    this.uppyTargetClassIdentifier = `uppy-${this.props.id}`;

    // Pre-bind method's context
    this.boundOnFilesUploaded = this.onFilesUploaded.bind(this);
    this.boundOnTabSelected = this.onTabSelected.bind(this);
  }

  componentDidMount() {
    if (this.state.isUppyInitialized) {
      return;
    }

    this.initializeUppy();
  }

  initializeUppy() {
    const {uploadEndpoint, mimeTypes} = this.props;
    console.log(uploadEndpoint);

    this.uppy = new Uppy({debug: true, autoProceed: false});
    this.uppy
      .use(Dashboard, {
        inline: true,
        target: `.${this.uppyTargetClassIdentifier}`
      })
      .use(Informer, {target: Dashboard})
      .use(Tus10, {endpoint: uploadEndpoint})
      .use(MetaData, {
        fields: [
          {id: 'resizeTo', name: 'Resize to', value: 1200, placeholder: 'specify future image size'},
          {id: 'description', name: 'Description', value: 'none', placeholder: 'describe what the file is for'}
        ]
      });
    this.uppy.on('core:success', this.boundOnFilesUploaded);
    this.uppy.run();

    this.setState({
      isUppyInitialized: true
    });
  }

  onFilesUploaded(fileCount) {
    console.log('files uploaded!');
  }

  onTabSelected(tabIndex) {
    this.setState({
      selectedTabIndex: tabIndex
    });
  }

  render() {
    const {selectedTabIndex} = this.state;

    return <div className="file-selector">
      <Tabbed
        onTabSelected={this.boundOnTabSelected}
        selectedTabIndex={selectedTabIndex}>
        <Tab label={
          <label>Upload</label>
        }>
          <div className={this.uppyTargetClassIdentifier}></div>
        </Tab>
        <Tab label={
          <label>Gallery</label>
        }>
          <div className="file-selector__gallery-wrapper"></div>
        </Tab>
      </Tabbed>
    </div>;
  }
}

export default FileSelector;
