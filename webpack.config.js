import 'babel-polyfill';

const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const configurePlugins = (opts = {}) => {
  const plugins = [
    // Give modules a deterministic name for better long-term caching:
    // https://github.com/webpack/webpack.js.org/issues/652#issuecomment-273023082
    // new webpack.NamedModulesPlugin(),

    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: process.env.NODE_ENV
      }
    })
  ];

  if (process.env.NODE_ENV === 'production') {
    if (opts.runtimeName === 'runtime') {
      plugins.push(
        new UglifyJSPlugin({
          uglifyOptions: {
            ecma: 6,
            mangle: {
              // Works around a Safari 10 bug:
              // https://github.com/mishoo/UglifyJS2/issues/1753
              safari10: true
            }
          }
        })
      );
    }

    if (opts.runtimeName === 'runtime-legacy') {
      // plugins.push(new webpack.optimize.UglifyJsPlugin());
      plugins.push(
        new UglifyJSPlugin({
          uglifyOptions: {
            ecma: 5,
            mangle: {
              safari10: true
            }
          }
        })
      );
    }
    plugins.push(new webpack.optimize.AggressiveMergingPlugin());
  }

  return plugins;
};

const configureBabelLoader = browserlist => {
  return {
    test: /\.js$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      options: {
        babelrc: false,
        presets: [
          [
            'env',
            {
              debug: false,
              modules: false,
              useBuiltIns: true,
              targets: {
                browsers: browserlist
              }
            }
          ]
        ]
      }
    }
  };
};

const baseConfig = {
  output: {
    filename: '[name].js'
  },
  devtool: 'cheap-module-source-map',
  resolve: {
    extensions: ['.js'],
    modules: ['src/static/scripts', 'node_modules']
  }
};

const modernConfig = Object.assign({}, baseConfig, {
  entry: {
    bundle: './src/static/scripts/index.js'
  },
  module: {
    rules: [
      configureBabelLoader([
        // The last two versions of each browser, excluding versions
        // that don't support <script type="module">
        'last 2 Chrome versions',
        'not Chrome < 60',
        'last 2 Safari versions',
        'not Safari < 10.1',
        'last 2 iOS versions',
        'not iOS < 10.3',
        'last 2 Firefox versions',
        'not Firefox < 54',
        'last 2 Edge versions',
        'not Edge < 15'
      ])
    ]
  },
  plugins: configurePlugins({ runtimeName: 'runtime' })
});

const legacyConfig = Object.assign({}, baseConfig, {
  entry: {
    'bundle-legacy': './src/static/scripts/index.js'
  },
  module: {
    rules: [configureBabelLoader(['> 1%', 'last 2 versions'])]
  },
  plugins: configurePlugins({ runtimeName: 'runtime-legacy' })
});

module.exports = [modernConfig, legacyConfig];
