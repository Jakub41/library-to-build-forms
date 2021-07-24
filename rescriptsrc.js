module.exports = [
    [
      'use-babel-config',
      {
        presets: ['react-app'],
        "plugins": [
            [
              "formatjs",
              {
                "idInterpolationPattern": "[sha512:contenthash:base64:6]",
                "ast": true
              }
            ]
          ],
      },
    ],
  ]