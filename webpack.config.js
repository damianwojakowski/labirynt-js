var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: "./src/main.ts",
    watch: true,
    plugins: [
        new CopyWebpackPlugin([
            { from: './src/template', to: './build'}
        ])
    ],
    output: {
        filename: "./build/bundle.js"
    },
    resolve: {
        extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
    },
    module: {
        loaders: [
            // all files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'
            { test: /\.tsx?$/, loader: "ts-loader" }
        ]
    }
};
