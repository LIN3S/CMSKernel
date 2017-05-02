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

import {React} from './../../bundle.dependencies';
import {FilePreview, SearchBox} from './../../bundle.components';
import {FileModel} from './../../bundle.model';
import {makeCancelable, buildQuery} from './../../bundle.util';

class FileGallery extends React.Component {

  static propTypes = {
    endpoint: React.PropTypes.string.isRequired,
    onAccept: React.PropTypes.func,
    onCancel: React.PropTypes.func,
    pageLimit: React.PropTypes.number.isRequired,
    queryId: React.PropTypes.string
  };

  static defaultProps = {
    onAccept: () => {},
    onCancel: () => {},
    queryId: ''
  };

  static PAGINATION_RANGE_DISPLAYED = 10;

  mainPromise;

  constructor(props) {
    super(props);

    this.state = {
      files: [],
      filesTotalCount: 0,
      page: 1,
      queryString: '',
      selectedFile: undefined
    };

    // Pre-bind methods' context
    this.boundOnAccept = this.onAccept.bind(this);
    this.boundOnCancel = this.onCancel.bind(this);

    this.boundOnSearchQueryUpdated = this.onSearchQueryUpdated.bind(this);
    this.boundOnPageChange = this.onPageChange.bind(this);
  }

  componentDidMount() {
    if (this.props.queryId !== '') {
      return;
    }

    this.fetchFiles();
  }

  componentWillUnmount() {
    // Cancel fetch promise
    this.mainPromise.cancel();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.queryId !== this.props.queryId || nextProps.pageLimit !== this.props.pageLimit) {
      this.setState({
        page: 1
      }, this.fetchFiles.bind(this));
    }
  }

  onSearchQueryUpdated(queryString) {
    this.setState({
      page: 1,
      queryString: queryString
    }, this.fetchFiles.bind(this));
  }

  onPageChange(page) {
    this.setState({
      page: page
    }, this.fetchFiles.bind(this));
  }

  fetchFiles() {
    // fetch files from server
    const {endpoint, pageLimit} = this.props;
    const {page, queryString} = this.state;
    const query = buildQuery(endpoint, {
      q: queryString,
      page: page,
      limit: pageLimit
    });

    this.mainPromise = makeCancelable(
      new Promise((resolve, reject) => {
        fetch(
          query,
          {method: 'GET'}
        )
          .then(response => response.json())
          .then((json) => {
            resolve(json);
          })
          .catch((ex) => {
            reject(ex);
          });
      })
    );

    this.mainPromise.promise.then((response) => {
      const
        jsonFiles = response.files,
        totalFilesCount = response.files_total_count;

      this.setState({
        files: jsonFiles.map(jsonFile => FileModel.fromJson(jsonFile)),
        filesTotalCount: totalFilesCount
      });
    });
  }

  onFileSelected(file) {
    if (this.state.selectedFile === file) {
      this.onAccept();
    } else {
      this.setState({
        selectedFile: file
      });
    }
  }

  onAccept(event) {
    if (event !== undefined) {
      event.preventDefault();
    }
    const {onAccept} = this.props;
    onAccept(this.state.selectedFile);
  }

  onCancel(event) {
    event.preventDefault();
    // Remove selection
    this.setState({
      selectedFile: undefined
    });

    const {onCancel} = this.props;
    onCancel();
  }

  render() {
    const {files, filesTotalCount, page, selectedFile} = this.state;
    const {pageLimit} = this.props;

    return <div className="file-gallery">
      <div className="file-gallery__files-wrapper">
        <div className="file-gallery__search-box">
          <SearchBox onQueryUpdated={this.boundOnSearchQueryUpdated}/>
        </div>

        {files.map((file) =>
          <div
            className="file-gallery__file-wrapper"
            key={`file-${file.id}`}>
            <FilePreview
              file={file}
              onSelected={this.onFileSelected.bind(this, file)}
              isSelected={file === selectedFile}/>
          </div>
        )}
      </div>
      <div>
        <div className="file-gallery__pagination">
          <Pagination
            activePage={page}
            hideDisabled={true}
            itemsCountPerPage={pageLimit}
            onChange={this.boundOnPageChange}
            pageRangeDisplayed={FileGallery.PAGINATION_RANGE_DISPLAYED}
            totalItemsCount={filesTotalCount}
          />
        </div>
        <div className="file-gallery__controls">
          <button
            className="button"
            onClick={this.boundOnCancel}>
            Cancelar
          </button>
          {selectedFile !== undefined &&
          <button
            className="button button--secondary"
            onClick={this.boundOnAccept}>
            Aceptar
          </button>}
        </div>
      </div>
    </div>;
  }
}

export default FileGallery;
