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
import {getOutputPath, getWebpackExternals} from './webpack.build.config';

const
  include = join(__dirname, './../js'),
  outputPath = join(__dirname, getOutputPath());

export default {
  entry: `${include}/event-bus-js/init.js`,
  externals: getWebpackExternals(),
  output: {
    path: `${outputPath}/js`,
    publicPath: '/',
    filename: 'event-bus-js-init.min.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: include,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      }
    ]
  },
  devtool: 'source-map'
};
