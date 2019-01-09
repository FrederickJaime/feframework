const args = require('yargs').argv;

import path    from 'path'
import webpack from 'webpack'
import process from 'process'
import { NONAME } from 'dns';

const isProduction = args.env === 'production';



let config = {
    //mode: isProduction ? 'production' : 'development',
    mode: 'none',
    entry: './src/js/main.js',


    output: {
        filename: './dist/js/sxm.phoenix.js',
        path: path.resolve(__dirname, '../../assets')
    },

    context: path.resolve(__dirname, '../../assets'),

    plugins: isProduction ? [ new webpack.optimize.UglifyJsPlugin() ] : []
}


function scripts() {

    return new Promise(resolve => webpack(config, (err, stats) => {

        if(err) console.log('Webpack', err)

        console.log(stats.toString({ /* stats options */ }))

        resolve()
    }))
}



module.exports = { config, scripts }
