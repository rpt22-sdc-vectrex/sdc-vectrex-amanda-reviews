module.exports = {
  entry: `${__dirname}/client/components/ReviewsWidget.jsx`,
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env'],
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  externals: {
    react: 'React',
  },
  output: {
    filename: 'bundle.js',
    path: `${__dirname}/public`,
    library: 'ReviewsWidget',
    libraryExport: 'default',
  },
};
