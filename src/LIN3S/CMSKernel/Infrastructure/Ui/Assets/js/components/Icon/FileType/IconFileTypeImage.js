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

import {React} from './../../../bundle.dependencies';
import {reactPropTypeOneOf} from './../../../bundle.util';
import {FileModel} from './../../../bundle.model';

class IconFileTypeImage extends React.Component {

  static propTypes = {
    cssClass: React.PropTypes.string,
    type: reactPropTypeOneOf('type', [
      FileModel.TYPE.IMAGE_JPG,
      FileModel.TYPE.IMAGE_PNG,
      FileModel.TYPE.IMAGE_SVG,
      FileModel.TYPE.IMAGE
    ])
  };

  static defaultProps = {
    cssClass: '',
    type: FileModel.TYPE.IMAGE
  };

  render() {
    const {cssClass, type} = this.props;
    const iconCssClass = `icon ${cssClass}`;

    return <svg
      className={iconCssClass}
      version="1.1"
      viewBox="0 0 58 58">

      {type === FileModel.TYPE.IMAGE_JPG &&
      <g>
        <path d="M50.949,12.187l-5.818-5.818l-5.047-5.048l0,0l-0.77-0.77C38.964,0.201,38.48,0,37.985,0H8.963
          C7.777,0,6.5,0.916,6.5,2.926V39v16.537V56c0,0.837,0.842,1.653,1.838,1.91c0.05,0.013,0.098,0.032,0.15,0.042
          C8.644,57.983,8.803,58,8.963,58h40.074c0.16,0,0.319-0.017,0.475-0.048c0.052-0.01,0.101-0.029,0.152-0.043
          C50.659,57.652,51.5,56.837,51.5,56v-0.463V39V13.978C51.5,13.211,51.407,12.644,50.949,12.187z M47.935,12H39.5V3.565l4.248,4.249
          L47.935,12z M8.963,2h28.595C37.525,2.126,37.5,2.256,37.5,2.391V14h11.608c0.135,0,0.265-0.025,0.391-0.058
          c0,0.015,0.001,0.021,0.001,0.036v12.693l-8.311-7.896c-0.195-0.185-0.445-0.284-0.725-0.274c-0.269,0.01-0.521,0.127-0.703,0.325
          l-9.795,10.727l-4.743-4.743c-0.369-0.369-0.958-0.392-1.355-0.055L8.5,37.836V2.926C8.5,2.709,8.533,2,8.963,2z M8.963,56
          c-0.071,0-0.135-0.026-0.198-0.049C8.609,55.877,8.5,55.721,8.5,55.537V41h41v14.537c0,0.184-0.11,0.34-0.265,0.414
          C49.172,55.975,49.108,56,49.037,56H8.963z M10.218,39l14.245-12.124L34.776,37.19c0.391,0.391,1.023,0.391,1.414,0
          s0.391-1.023,0-1.414l-4.807-4.807l9.168-10.041l8.949,8.501V39H10.218z"/>
        <path d="M19.069,23.638c3.071,0,5.569-2.498,5.569-5.569S22.14,12.5,19.069,12.5S13.5,14.998,13.5,18.069
          S15.998,23.638,19.069,23.638z M19.069,14.5c1.968,0,3.569,1.601,3.569,3.569s-1.601,3.569-3.569,3.569S15.5,20.037,15.5,18.069
          S17.101,14.5,19.069,14.5z"/>
        <path d="M19.354,51.43c-0.019,0.446-0.171,0.764-0.458,0.95s-0.672,0.28-1.155,0.28c-0.191,0-0.396-0.022-0.615-0.068
          s-0.429-0.098-0.629-0.157c-0.201-0.06-0.385-0.123-0.554-0.191c-0.169-0.068-0.299-0.135-0.39-0.198l-0.697,1.107
          c0.182,0.137,0.405,0.26,0.67,0.369c0.264,0.109,0.54,0.207,0.827,0.294s0.565,0.15,0.834,0.191
          c0.269,0.041,0.503,0.062,0.704,0.062c0.401,0,0.791-0.039,1.169-0.116c0.378-0.077,0.713-0.214,1.005-0.41
          c0.292-0.196,0.524-0.456,0.697-0.779c0.173-0.323,0.26-0.723,0.26-1.196v-7.848h-1.668V51.43z"/>
        <path d="M28.767,44.744c-0.333-0.273-0.709-0.479-1.128-0.615c-0.419-0.137-0.843-0.205-1.271-0.205h-2.898V54h1.641v-3.637h1.217
          c0.528,0,1.012-0.077,1.449-0.232s0.811-0.374,1.121-0.656c0.31-0.282,0.551-0.631,0.725-1.046c0.173-0.415,0.26-0.877,0.26-1.388
          c0-0.483-0.103-0.918-0.308-1.306S29.099,45.018,28.767,44.744z M28.145,48.073c-0.101,0.278-0.232,0.494-0.396,0.649
          s-0.344,0.267-0.54,0.335c-0.196,0.068-0.395,0.103-0.595,0.103h-1.504v-3.992h1.23c0.419,0,0.756,0.066,1.012,0.198
          c0.255,0.132,0.453,0.296,0.595,0.492c0.141,0.196,0.234,0.401,0.28,0.615c0.045,0.214,0.068,0.403,0.068,0.567
          C28.295,47.451,28.245,47.795,28.145,48.073z"/>
        <path d="M35.76,49.926h1.709v2.488c-0.073,0.101-0.187,0.178-0.342,0.232c-0.155,0.055-0.317,0.098-0.485,0.13
          c-0.169,0.032-0.337,0.055-0.506,0.068c-0.169,0.014-0.303,0.021-0.403,0.021c-0.328,0-0.641-0.077-0.937-0.232
          c-0.296-0.155-0.561-0.392-0.793-0.711s-0.415-0.729-0.547-1.23c-0.132-0.501-0.203-1.094-0.212-1.777
          c0.009-0.702,0.082-1.294,0.219-1.777s0.326-0.877,0.567-1.183c0.241-0.306,0.515-0.521,0.82-0.649
          c0.305-0.128,0.626-0.191,0.964-0.191c0.301,0,0.592,0.06,0.875,0.178c0.282,0.118,0.533,0.31,0.752,0.574l1.135-1.012
          c-0.374-0.364-0.798-0.638-1.271-0.82c-0.474-0.183-0.984-0.273-1.531-0.273c-0.593,0-1.144,0.111-1.654,0.335
          c-0.511,0.224-0.955,0.549-1.333,0.978c-0.378,0.429-0.675,0.964-0.889,1.606c-0.214,0.643-0.321,1.388-0.321,2.235
          s0.107,1.595,0.321,2.242c0.214,0.647,0.51,1.185,0.889,1.613c0.378,0.429,0.82,0.752,1.326,0.971s1.06,0.328,1.661,0.328
          c0.301,0,0.604-0.022,0.909-0.068c0.305-0.046,0.602-0.123,0.889-0.232s0.561-0.248,0.82-0.417s0.494-0.385,0.704-0.649v-3.896
          H35.76V49.926z"/>
      </g>}

      {type === FileModel.TYPE.IMAGE_PNG &&
      <g>
        <path d="M50.95,12.187l-0.771-0.771L40.084,1.321L39.313,0.55C38.964,0.201,38.48,0,37.985,0H8.963C7.777,0,6.5,0.916,6.5,
          2.926V39 v16.537V56c0,0.837,0.842,1.653,1.838,1.91c0.05,0.013,0.098,0.032,0.15,0.042C8.644,57.983,8.803,58,8.963,58h40.074
          c0.16,0,0.319-0.017,0.475-0.048c0.052-0.01,0.1-0.029,0.15-0.042C50.658,57.653,51.5,56.837,51.5,56v-0.463V39V13.978
          C51.5,13.211,51.408,12.645,50.95,12.187z M47.935,12H39.5V3.565L47.935,12z M11.5,2c0,0.552,0.448,1,1,1s1-0.448,1-1h2
          c0,0.552,0.448,1,1,1s1-0.448,1-1h2c0,0.552,0.448,1,1,1s1-0.448,1-1h2c0,0.552,0.448,1,1,1s1-0.448,1-1h2c0,0.552,0.448,1,1,1
          s1-0.448,1-1h2c0,0.552,0.448,1,1,1s1-0.448,1-1h2c0,0.552,0.448,1,1,1s1-0.448,1-1h0.058C37.525,2.126,37.5,2.256,37.5,2.391V6v4
          v4h2c0,0.552,0.448,1,1,1s1-0.448,1-1h2c0,0.552,0.448,1,1,1s1-0.448,1-1h2c0,0.552,0.448,1,1,1s1-0.448,1-1
          c0-0.02-0.01-0.037-0.011-0.057c0.003-0.001,0.007-0.001,0.01-0.002c0,0.015,0.001,0.021,0.001,0.036V14v4v4v4v0.67l-0.163-0.155
          C49.431,26.362,49.5,26.193,49.5,26c0-0.552-0.448-1-1-1c-0.211,0-0.395,0.08-0.557,0.191l-0.648-0.615
          C47.415,24.411,47.5,24.219,47.5,24c0-0.552-0.448-1-1-1c-0.238,0-0.447,0.095-0.618,0.233l-0.627-0.596
          C45.401,22.463,45.5,22.246,45.5,22c0-0.552-0.448-1-1-1c-0.264,0-0.501,0.107-0.68,0.275l-0.607-0.577
          C43.39,20.518,43.5,20.272,43.5,20c0-0.552-0.448-1-1-1c-0.291,0-0.547,0.129-0.73,0.327l-0.581-0.552
          c-0.013-0.012-0.029-0.016-0.042-0.027C41.359,18.565,41.5,18.302,41.5,18c0-0.552-0.448-1-1-1s-1,0.448-1,1
          c0,0.306,0.145,0.57,0.361,0.753c-0.031,0.027-0.071,0.042-0.099,0.073l-0.5,0.548C39.078,19.151,38.811,19,38.5,19
          c-0.552,0-1,0.448-1,1c0,0.344,0.184,0.632,0.448,0.812l-0.613,0.671C37.159,21.199,36.859,21,36.5,21c-0.552,0-1,0.448-1,1
          c0,0.39,0.23,0.72,0.556,0.884l-0.647,0.708C35.253,23.245,34.906,23,34.5,23c-0.552,0-1,0.448-1,1c0,0.44,0.288,0.802,0.683,0.936
          l-0.735,0.805C33.332,25.318,32.96,25,32.5,25c-0.552,0-1,0.448-1,1c0,0.492,0.362,0.882,0.83,0.966l-0.85,0.931
          C31.425,27.396,31.016,27,30.5,27c-0.552,0-1,0.448-1,1c0,0.544,0.436,0.982,0.976,0.995l-0.509,0.558l-4.743-4.743
          c-0.369-0.369-0.958-0.392-1.355-0.055l-6.412,5.457C17.473,30.142,17.5,30.075,17.5,30c0-0.552-0.448-1-1-1s-1,0.448-1,1
          c0,0.552,0.448,1,1,1c0.015,0,0.027-0.008,0.042-0.008l-1.063,0.904C15.425,31.395,15.015,31,14.5,31c-0.552,0-1,0.448-1,1
          c0,0.461,0.318,0.832,0.743,0.948l-0.815,0.694C13.283,33.268,12.925,33,12.5,33c-0.552,0-1,0.448-1,1
          c0,0.369,0.209,0.678,0.507,0.851l-0.697,0.593C11.129,35.183,10.842,35,10.5,35c-0.552,0-1,0.448-1,1
          c0,0.284,0.121,0.538,0.311,0.72L8.5,37.836V35c0.552,0,1-0.448,1-1c0-0.552-0.448-1-1-1v-2c0.552,0,1-0.448,1-1
          c0-0.552-0.448-1-1-1v-2c0.552,0,1-0.448,1-1c0-0.552-0.448-1-1-1v-2c0.552,0,1-0.448,1-1c0-0.552-0.448-1-1-1v-2
          c0.552,0,1-0.448,1-1c0-0.552-0.448-1-1-1v-2c0.552,0,1-0.448,1-1c0-0.552-0.448-1-1-1v-2c0.552,0,1-0.448,1-1c0-0.552-0.448-1-1-1
          V7c0.552,0,1-0.448,1-1c0-0.552-0.448-1-1-1V3c0.552,0,1-0.448,1-1H11.5z M8.963,56c-0.071,0-0.135-0.026-0.198-0.049
          C8.609,55.877,8.5,55.721,8.5,55.537V41h41v14.537c0,0.184-0.109,0.339-0.265,0.414C49.172,55.974,49.108,56,49.037,56H8.963z
          M10.218,39l14.134-12.03C24.403,26.978,24.448,27,24.5,27c0.025,0,0.047-0.013,0.071-0.014L34.776,37.19
          c0.391,0.391,1.023,0.391,1.414,0s0.391-1.023,0-1.414l-4.807-4.807l9.168-10.041L49.5,29.43V39H10.218z"/>
        <path d="M22.042,44.744c-0.333-0.273-0.709-0.479-1.128-0.615c-0.419-0.137-0.843-0.205-1.271-0.205h-2.898V54h1.641v-3.637h1.217
          c0.528,0,1.012-0.077,1.449-0.232s0.811-0.374,1.121-0.656c0.31-0.282,0.551-0.631,0.725-1.046c0.173-0.415,0.26-0.877,0.26-1.388
          c0-0.483-0.103-0.918-0.308-1.306S22.375,45.018,22.042,44.744z M21.42,48.073c-0.101,0.278-0.232,0.494-0.396,0.649
          c-0.164,0.155-0.344,0.267-0.54,0.335c-0.196,0.068-0.395,0.103-0.595,0.103h-1.504v-3.992h1.23c0.419,0,0.756,0.066,1.012,0.198
          c0.255,0.132,0.453,0.296,0.595,0.492c0.141,0.196,0.234,0.401,0.28,0.615c0.045,0.214,0.068,0.403,0.068,0.567
          C21.57,47.451,21.52,47.795,21.42,48.073z"/>
        <polygon points="30.648,50.869 26.697,43.924 25.029,43.924 25.029,54 26.697,54 26.697,47.055 30.648,54 32.316,54 32.316,43.924
          30.648,43.924"/>
        <path d="M38.824,49.926h1.709v2.488c-0.073,0.101-0.187,0.178-0.342,0.232c-0.155,0.055-0.317,0.098-0.485,0.13
          c-0.169,0.032-0.337,0.055-0.506,0.068c-0.169,0.014-0.303,0.021-0.403,0.021c-0.328,0-0.641-0.077-0.937-0.232
          c-0.296-0.155-0.561-0.392-0.793-0.711s-0.415-0.729-0.547-1.23c-0.132-0.501-0.203-1.094-0.212-1.777
          c0.009-0.702,0.082-1.294,0.219-1.777s0.326-0.877,0.567-1.183c0.241-0.306,0.515-0.521,0.82-0.649
          c0.305-0.128,0.626-0.191,0.964-0.191c0.301,0,0.592,0.06,0.875,0.178c0.282,0.118,0.533,0.31,0.752,0.574l1.135-1.012
          c-0.374-0.364-0.798-0.638-1.271-0.82c-0.474-0.183-0.984-0.273-1.531-0.273c-0.593,0-1.144,0.111-1.654,0.335
          c-0.511,0.224-0.955,0.549-1.333,0.978c-0.378,0.429-0.675,0.964-0.889,1.606c-0.214,0.643-0.321,1.388-0.321,2.235
          s0.107,1.595,0.321,2.242c0.214,0.647,0.51,1.185,0.889,1.613c0.378,0.429,0.82,0.752,1.326,0.971s1.06,0.328,1.661,0.328
          c0.301,0,0.604-0.022,0.909-0.068c0.305-0.046,0.602-0.123,0.889-0.232s0.561-0.248,0.82-0.417s0.494-0.385,0.704-0.649v-3.896
          h-3.336V49.926z"/>
        <circle cx="10.5" cy="4" r="1"/>
        <circle cx="14.5" cy="4" r="1"/>
        <circle cx="18.5" cy="4" r="1"/>
        <circle cx="22.5" cy="4" r="1"/>
        <circle cx="26.5" cy="4" r="1"/>
        <circle cx="30.5" cy="4" r="1"/>
        <circle cx="34.5" cy="4" r="1"/>
        <circle cx="36.5" cy="6" r="1"/>
        <circle cx="32.5" cy="6" r="1"/>
        <circle cx="28.5" cy="6" r="1"/>
        <circle cx="24.5" cy="6" r="1"/>
        <circle cx="20.5" cy="6" r="1"/>
        <circle cx="16.5" cy="6" r="1"/>
        <circle cx="12.5" cy="6" r="1"/>
        <circle cx="10.5" cy="8" r="1"/>
        <circle cx="14.5" cy="8" r="1"/>
        <circle cx="18.5" cy="8" r="1"/>
        <circle cx="22.5" cy="8" r="1"/>
        <circle cx="26.5" cy="8" r="1"/>
        <circle cx="30.5" cy="8" r="1"/>
        <circle cx="34.5" cy="8" r="1"/>
        <circle cx="36.5" cy="10" r="1"/>
        <circle cx="32.5" cy="10" r="1"/>
        <circle cx="28.5" cy="10" r="1"/>
        <circle cx="24.5" cy="10" r="1"/>
        <circle cx="20.5" cy="10" r="1"/>
        <circle cx="16.5" cy="10" r="1"/>
        <circle cx="12.5" cy="10" r="1"/>
        <circle cx="10.5" cy="12" r="1"/>
        <circle cx="22.5" cy="12" r="1"/>
        <circle cx="26.5" cy="12" r="1"/>
        <circle cx="30.5" cy="12" r="1"/>
        <circle cx="34.5" cy="12" r="1"/>
        <circle cx="36.5" cy="14" r="1"/>
        <circle cx="32.5" cy="14" r="1"/>
        <circle cx="28.5" cy="14" r="1"/>
        <circle cx="24.5" cy="14" r="1"/>
        <circle cx="26.5" cy="16" r="1"/>
        <circle cx="30.5" cy="16" r="1"/>
        <circle cx="34.5" cy="16" r="1"/>
        <circle cx="38.5" cy="16" r="1"/>
        <circle cx="42.5" cy="16" r="1"/>
        <circle cx="44.5" cy="18" r="1"/>
        <circle cx="48.5" cy="22" r="1"/>
        <circle cx="46.5" cy="20" r="1"/>
        <circle cx="48.5" cy="18" r="1"/>
        <circle cx="46.5" cy="16" r="1"/>
        <circle cx="36.5" cy="18" r="1"/>
        <circle cx="32.5" cy="18" r="1"/>
        <circle cx="28.5" cy="18" r="1"/>
        <circle cx="24.5" cy="18" r="1"/>
        <circle cx="26.5" cy="20" r="1"/>
        <circle cx="30.5" cy="20" r="1"/>
        <circle cx="34.5" cy="20" r="1"/>
        <circle cx="32.5" cy="22" r="1"/>
        <circle cx="28.5" cy="22" r="1"/>
        <circle cx="24.5" cy="22" r="1"/>
        <circle cx="10.5" cy="24" r="1"/>
        <circle cx="22.5" cy="24" r="1"/>
        <circle cx="26.5" cy="24" r="1"/>
        <circle cx="30.5" cy="24" r="1"/>
        <circle cx="28.5" cy="26" r="1"/>
        <circle cx="20.5" cy="26" r="1"/>
        <circle cx="16.5" cy="26" r="1"/>
        <circle cx="12.5" cy="26" r="1"/>
        <circle cx="10.5" cy="28" r="1"/>
        <circle cx="14.5" cy="28" r="1"/>
        <circle cx="18.5" cy="28" r="1"/>
        <circle cx="12.5" cy="30" r="1"/>
        <circle cx="10.5" cy="32" r="1"/>

        <path d="M10.5,21c0.426,0,0.784-0.269,0.928-0.644c0.136,0.301,0.296,0.589,0.481,0.858C11.667,21.397,11.5,21.673,11.5,22
          c0,0.552,0.448,1,1,1c0.322,0,0.595-0.162,0.778-0.398c0.258,0.184,0.533,0.345,0.822,0.484C13.747,23.241,13.5,23.591,13.5,24
          c0,0.552,0.448,1,1,1s1-0.448,1-1c0-0.178-0.059-0.336-0.14-0.481c0.368,0.077,0.749,0.118,1.14,0.118s0.772-0.041,1.14-0.118
          C17.559,23.664,17.5,23.822,17.5,24c0,0.552,0.448,1,1,1s1-0.448,1-1c0-0.409-0.247-0.759-0.599-0.914
          c0.288-0.139,0.563-0.299,0.822-0.484C19.905,22.838,20.178,23,20.5,23c0.552,0,1-0.448,1-1c0-0.327-0.167-0.603-0.409-0.785
          c0.185-0.27,0.345-0.557,0.481-0.858C21.716,20.731,22.074,21,22.5,21c0.552,0,1-0.448,1-1c0-0.552-0.448-1-1-1
          c-0.205,0-0.385,0.077-0.543,0.182c0.073-0.36,0.112-0.732,0.112-1.114c0-0.441-0.057-0.868-0.154-1.28
          C22.081,16.913,22.277,17,22.5,17c0.552,0,1-0.448,1-1c0-0.552-0.448-1-1-1c-0.46,0-0.831,0.318-0.948,0.741
          c-0.148-0.321-0.326-0.625-0.53-0.909C21.303,14.654,21.5,14.356,21.5,14c0-0.552-0.448-1-1-1c-0.361,0-0.664,0.202-0.839,0.489
          c-0.298-0.207-0.617-0.385-0.954-0.531C19.156,12.86,19.5,12.479,19.5,12c0-0.552-0.448-1-1-1s-1,0.448-1,1
          c0,0.25,0.101,0.472,0.253,0.647C17.349,12.554,16.931,12.5,16.5,12.5s-0.849,0.054-1.253,0.147C15.399,12.472,15.5,12.25,15.5,12
          c0-0.552-0.448-1-1-1s-1,0.448-1,1c0,0.479,0.344,0.86,0.793,0.958c-0.337,0.146-0.655,0.324-0.954,0.531
          C13.164,13.202,12.861,13,12.5,13c-0.552,0-1,0.448-1,1c0,0.356,0.197,0.654,0.478,0.832c-0.204,0.284-0.381,0.589-0.53,0.909
          C11.331,15.318,10.96,15,10.5,15c-0.552,0-1,0.448-1,1c0,0.552,0.448,1,1,1c0.223,0,0.419-0.087,0.585-0.211
          c-0.097,0.412-0.154,0.839-0.154,1.28c0,0.381,0.039,0.754,0.112,1.114C10.885,19.077,10.705,19,10.5,19c-0.552,0-1,0.448-1,1
          C9.5,20.552,9.948,21,10.5,21z M16.5,14.5c1.968,0,3.569,1.601,3.569,3.569s-1.601,3.569-3.569,3.569s-3.569-1.601-3.569-3.569
          S14.532,14.5,16.5,14.5z"/>
      </g>}

      {type === FileModel.TYPE.IMAGE_SVG &&
      <g>
        <path d="M50.949,12.187l-1.361-1.361l-9.504-9.505c-0.001-0.001-0.001-0.001-0.002-0.001l-0.77-0.771
          C38.957,0.195,38.486,0,37.985,0H8.963C7.604,0,6.5,1.105,6.5,2.463V39v16.537C6.5,56.895,7.604,58,8.963,58h40.074
          c1.358,0,2.463-1.105,2.463-2.463V39V13.515C51.5,13.02,51.299,12.535,50.949,12.187z M47.935,12H39.5V3.565L47.935,12z
          M49.5,55.537c0,0.255-0.208,0.463-0.463,0.463H8.963C8.708,56,8.5,55.792,8.5,55.537V41h41V55.537z M8.5,39V2.463
          C8.5,2.208,8.708,2,8.963,2h28.595C37.525,2.126,37.5,2.256,37.5,2.391V14h11.608c0.135,0,0.265-0.025,0.392-0.058V39H8.5z"/>
        <path d="M19.205,52.756c-0.183,0-0.378-0.019-0.588-0.055s-0.419-0.084-0.629-0.144s-0.412-0.123-0.608-0.191
          s-0.357-0.139-0.485-0.212l-0.287,1.176c0.155,0.137,0.34,0.253,0.554,0.349s0.439,0.171,0.677,0.226s0.472,0.094,0.704,0.116
          s0.458,0.034,0.677,0.034c0.511,0,0.966-0.077,1.367-0.232s0.738-0.362,1.012-0.622s0.485-0.561,0.636-0.902
          s0.226-0.695,0.226-1.06c0-0.538-0.104-0.978-0.314-1.319s-0.472-0.627-0.786-0.854s-0.654-0.422-1.019-0.581
          s-0.702-0.323-1.012-0.492s-0.569-0.364-0.779-0.588s-0.314-0.518-0.314-0.882c0-0.146,0.036-0.299,0.109-0.458
          s0.173-0.303,0.301-0.431s0.273-0.234,0.438-0.321s0.337-0.139,0.52-0.157c0.328-0.027,0.597-0.032,0.807-0.014
          s0.378,0.05,0.506,0.096s0.226,0.091,0.294,0.137s0.13,0.082,0.185,0.109c0.009-0.009,0.036-0.055,0.082-0.137
          s0.101-0.185,0.164-0.308s0.132-0.255,0.205-0.396s0.137-0.271,0.191-0.39c-0.265-0.173-0.61-0.299-1.039-0.376
          s-0.853-0.116-1.271-0.116c-0.41,0-0.8,0.063-1.169,0.191s-0.692,0.313-0.971,0.554s-0.499,0.535-0.663,0.882
          s-0.246,0.743-0.246,1.189c0,0.492,0.104,0.902,0.314,1.23s0.474,0.613,0.793,0.854s0.661,0.451,1.025,0.629
          s0.704,0.355,1.019,0.533s0.576,0.376,0.786,0.595s0.314,0.483,0.314,0.793c0,0.511-0.148,0.896-0.444,1.155
          C20.187,52.626,19.761,52.756,19.205,52.756z"/>
        <polygon
          points="28.994,54.055 32.275,43.924 30.416,43.924 27.941,52.619 25.604,43.924 23.73,43.924 26.861,54.055 	"/>
        <path d="M35.358,52.77c0.378,0.429,0.82,0.752,1.326,0.971s1.06,0.328,1.661,0.328c0.301,0,0.604-0.022,0.909-0.068
          s0.602-0.123,0.889-0.232s0.561-0.248,0.82-0.417s0.494-0.385,0.704-0.649v-3.896h-3.336v1.121h1.709v2.488
          c-0.073,0.101-0.187,0.178-0.342,0.232s-0.316,0.098-0.485,0.13s-0.337,0.055-0.506,0.068s-0.303,0.021-0.403,0.021
          c-0.328,0-0.641-0.077-0.937-0.232s-0.561-0.392-0.793-0.711s-0.415-0.729-0.547-1.23s-0.203-1.094-0.212-1.777
          c0.009-0.702,0.082-1.294,0.219-1.777s0.326-0.877,0.567-1.183s0.515-0.521,0.82-0.649s0.627-0.191,0.964-0.191
          c0.301,0,0.593,0.06,0.875,0.178s0.533,0.31,0.752,0.574l1.135-1.012c-0.374-0.364-0.798-0.638-1.271-0.82
          s-0.984-0.273-1.531-0.273c-0.593,0-1.144,0.111-1.654,0.335s-0.955,0.549-1.333,0.978s-0.675,0.964-0.889,1.606
          s-0.321,1.388-0.321,2.235s0.107,1.595,0.321,2.242S34.98,52.341,35.358,52.77z"/>
        <path d="M40.5,19h-6v-4h-10v4h-6v-2h-6v6h6v-2h3.548c-4.566,2.636-7.548,7.588-7.548,13c0,0.552,0.447,1,1,1s1-0.448,1-1
          c0-5.246,3.229-9.999,8-11.995V25h10v-2.995c4.771,1.997,8,6.75,8,11.995c0,0.552,0.447,1,1,1s1-0.448,1-1
          c0-5.412-2.982-10.364-7.548-13H40.5v2h6v-6h-6V19z M16.5,21h-2v-2h2V21z M32.5,23h-6v-3.754V17h6v2.246V23z M42.5,19h2v2h-2V19z"
        />
      </g>}

      {type === FileModel.TYPE.IMAGE &&
      <g>
        <path d="M50.949,12.187l-5.818-5.818l-5.047-5.048l0,0l-0.77-0.77C38.964,0.201,38.48,0,37.985,0H8.963
          C7.777,0,6.5,0.916,6.5,2.926V39v16.537V56c0,0.837,0.842,1.653,1.838,1.91c0.05,0.013,0.098,0.032,0.15,0.042
          C8.644,57.983,8.803,58,8.963,58h40.074c0.16,0,0.319-0.017,0.475-0.048c0.052-0.01,0.101-0.029,0.152-0.043
          C50.659,57.652,51.5,56.837,51.5,56v-0.463V39V13.978C51.5,13.211,51.407,12.644,50.949,12.187z M47.935,12H39.5V3.565l4.248,4.249
          L47.935,12z M8.963,2h28.595C37.525,2.126,37.5,2.256,37.5,2.391V14h11.608c0.135,0,0.265-0.025,0.391-0.058
          c0,0.015,0.001,0.021,0.001,0.036v12.693l-8.311-7.896c-0.195-0.185-0.445-0.284-0.725-0.274c-0.269,0.01-0.521,0.127-0.703,0.325
          l-9.795,10.727l-4.743-4.743c-0.369-0.369-0.958-0.392-1.355-0.055L8.5,37.836V2.926C8.5,2.709,8.533,2,8.963,2z M8.963,56
          c-0.071,0-0.135-0.026-0.198-0.049C8.609,55.877,8.5,55.721,8.5,55.537V41h41v14.537c0,0.184-0.11,0.34-0.265,0.414
          C49.172,55.975,49.108,56,49.037,56H8.963z M10.218,39l14.245-12.124L34.776,37.19c0.391,0.391,1.023,0.391,1.414,0
          s0.391-1.023,0-1.414l-4.807-4.807l9.168-10.041l8.949,8.501V39H10.218z"/>
        <path d="M19.069,23.638c3.071,0,5.569-2.498,5.569-5.569S22.14,12.5,19.069,12.5S13.5,14.998,13.5,18.069
          S15.998,23.638,19.069,23.638z M19.069,14.5c1.968,0,3.569,1.601,3.569,3.569s-1.601,3.569-3.569,3.569S15.5,20.037,15.5,18.069
          S17.101,14.5,19.069,14.5z"/>
      </g>}
    </svg>;
  }

}

export default IconFileTypeImage;