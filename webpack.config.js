var config = {
  entry: './index.js',
  output: {
     path:'/',
     filename: 'index.js',
      publicPath: "/"
  },
  devServer: {
     inline: true,
     port: 8545
  },
  module: {
     loaders: [
        {
           test: /\.jsx?$/,
           exclude: /node_modules/,
           loader: 'babel-loader',
           query: {
              presets: ['es2015', 'react']
           }
        }
     ]
  }
}