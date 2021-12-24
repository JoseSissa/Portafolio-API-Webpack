const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const miniCssExtractPlugin = require('mini-css-extract-plugin');
const copyPlugin = require('copy-webpack-plugin');
const dotEnv = require('dotenv-webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    // ->Cuál es el punto de entrada de nuestra aplicación
    entry : './src/index.js',
    // Hacia donde va a enviar lo que prepara webpack
    output : {
        // Detecta y nos dice donde se encuentra nuesto proyecto (directorio) y poderlo usar.
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[contenthash].js',
        assetModuleFilename: 'assets/images/[hash][ext]'
    },
    // Las extensiones con las que vamos a trabajar en el proyecto.
    resolve: {
        extensions: ['.js'],
        alias: {
            // Aqui se definen los alias para evitar escribir rutas largas
            '@utils': path.resolve(__dirname, 'src/utils/'),
            '@templates': path.resolve(__dirname, 'src/templates/'),
            '@styles': path.resolve(__dirname, 'src/styles/'),
            '@images': path.resolve(__dirname, 'src/assets/images/'),
        }
    },
    // Para que webpack y babel trabajen de la mano
    module: {
        rules: [
            {
                // Test declara que extensión de archivos aplicara el loader
                test: /\.m?js$/,
                // Exclude permite omitir archivos o carpetas especificas de la configuración anterior.
                exclude: /node_modules/,
                // Use declaramos a webpack que use babel
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.css$/i,
                use: [miniCssExtractPlugin.loader,
                'css-loader'
                ],
            },
            {
                // Para las imágenes
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource'
            },
            {
                // Para las fuentes
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: "asset/resource",
                generator: {
                    filename: 'assets/fonts/[hash][ext]'
                }
            }
        ]
    },
    plugins: [
        new htmlWebpackPlugin({
            inject: true,
            template: './public/index.html',
            filename: 'index.html'
        }),
        new miniCssExtractPlugin(),
        new copyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, "src", "assets/images"),
                    to: "assets/images"
                }
            ]
        }),
        new dotEnv(),
        // Para limpiar el código por cada instancia.
        new CleanWebpackPlugin(),
    ],
    // Minifica los archivos css
    optimization: {
        minimize: true
    }
};