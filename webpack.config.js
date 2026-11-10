
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    // Archivo principal de entrada
    entry: './src/js/index.js',

    // Configuración de salida
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        clean: true
    },

    // Configuración de procesamiento de archivos
    module: {
        rules: [
            {
                // Identificar archivos JavaScript
                test: /\.js$/,

                // Excluir las dependencias
                exclude: /node_modules/,

                // Procesar JavaScript mediante Babel
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                // Identificar archivos CSS
                test: /\.css$/i,

                // Procesar los estilos
                use: ['style-loader', 'css-loader']
            }
        ]
    },

    // Plugins
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html'
        })
    ],

    // Configuración del servidor
    devServer: {
        static: {
            directory: path.resolve(__dirname, 'dist')
        },
        port: 8080,
        open: true,
        hot: true
    },

    // Modo de desarrollo
    mode: 'development'
};
