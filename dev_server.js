const { resolve } = require('path');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.dev');
const npm_config = require('./package.json');
const PORT = process.env.PORT || 3000;

new WebpackDevServer(webpack(config), {
    contentBase: resolve(__dirname, 'dist'),
    publicPath: '/',
    hot: false,
    historyApiFallback: true,
    quiet: false,
    noInfo: false,
    proxy: npm_config.proxy,
    stats: {
        assets: false,
        colors: true,
        version: false,
        hash: false,
        timings: true,
        children: false,
        modules: false,
        chunks: false,
        chunkModules: false
    }
}).listen(PORT, 'localhost', function(err){
    if(err){
        console.log(err);
    }

    console.log('\x1b[36m%s\x1b[33m%s\x1b[0m', 'Dev server running at ', 'localhost:' + PORT);
    console.log('\x1b[32m%s\x1b[0m', '\nWebpack compiling...\n');
});
