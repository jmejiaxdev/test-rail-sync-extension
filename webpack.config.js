const path = require('path');

const extensionConfig = {
  mode: 'development',
  target: 'node',
  entry: './src/extension.ts',
  output: {
    filename: 'extension.js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'commonjs2',
  },
  externals: {
    vscode: 'commonjs vscode',
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: 'ts-loader',
      },
    ],
  },
};

const webviewConfig = {
  mode: 'development',
  target: 'web',
  entry: './src/index.tsx',
  output: {
    filename: 'webview.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: 'ts-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};

module.exports = [extensionConfig, webviewConfig];
