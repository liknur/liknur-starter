import MiniCssExtractPlugin from 'mini-css-extract-plugin';

export default function (buildMode) {
  const isProduction = buildMode === 'production';
  return {
    module: {
      rules: [{
          test: /\.module\.s?css$/,
          use: [
            isProduction ? MiniCssExtractPlugin.loader : {
              loader: 'style-loader',
            },
            {
              loader: 'css-loader',
              options: {
                modules: {
                  localIdentName: '[name]__[local]___[hash:base64:5]',
                  exportOnlyLocals: false,
                  exportLocalsConvention: 'camelCaseOnly',
                  namedExport: false,
                },
                importLoaders: 1,
              },
            },
            {
              loader: 'sass-loader',
            },
          ]
        },
        {
          test: /\.s?css$/,
          exclude: /\.module\.s?css$/,
          use: [
            isProduction ? MiniCssExtractPlugin.loader : { loader: 'style-loader'},
            'css-loader',
            'sass-loader',
          ],
        },
      ]
      },
    plugins: [
      ...(isProduction ? [new MiniCssExtractPlugin({
        filename: '[name].[contenthash].css', 
        chunkFilename: '[id].[contenthash].css',
        experimentalUseImportModule: false
      })] : []),
    ]
    }
  };

