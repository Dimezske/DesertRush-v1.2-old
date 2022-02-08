module.exports = {
    module: {
      rules: [
        {
          test: /\.(png|mp3|jpg|jpeg|m4a|ttf|otf|woff|woff2|gif|svg|mp4|wav|gif)$/i,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 8192,
              },
            },
            {
              test: /\.json$/,
              loader: 'json-loader'
            }
          ],
        },
      ],
    },
  };