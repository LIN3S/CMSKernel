/*
 * This file is part of the CMS Kernel library.
 *
 * Copyright (c) 2017-2018 LIN3S <info@lin3s.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 *
 * @author Mikel Tuesta <mikel@lin3s.com>
 */

import {join, resolve} from 'path';
import getWebpackExternals from './webpack.externals';

const include = join(__dirname, 'js');
const
  outputPath = './../../Symfony/Bundle/Resources/public/';

export default {
  entry: './js/event-bus-js/init.js',
  externals: getWebpackExternals(),
  output: {
    path: `${outputPath}/js`,
    publicPath: '/',
    filename: 'event-bus-js-init.min.js',
    libraryTarget: 'window'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: include
      }
    ]
  },
  devtool: 'source-map'
};
