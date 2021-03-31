// import { configure } from '@storybook/react'
// import '../css/tailwind.css'
const path = require('path');
// configure(require.context('../stories', true, /\.stories\.tsx?$/), module)
module.exports = {
  stories: [
    '../stories/**/*.stories.mdx',
    '../stories/**/*.stories.@(js|jsx|ts|tsx)',
    '../components/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  typescript: {
    reactDocgen: 'none',
  },
  addons: [
    // '@storybook/addon-links',
    // '@storybook/addon-essentials',
    {
      name: '@storybook/addon-postcss',
      options: {
        postcssLoaderOptions: {
          implementation: require('postcss'),
        },
      },
    },
  ],
  webpackFinal: (config) => {
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      loader: require.resolve('babel-loader'),
      options: {
        presets: [['react-app', { flow: false, typescript: true }]],
      },
    })
    config.module.rules.push({
      test: /\\.css$/,
      loaders: [
        {
          loader: 'postcss-loader',
          options: {
            sourceMap: true,
            config: {
              path: './',
            },
          },
        },
      ],
      include: path.resolve(__dirname, '../'),
    })
    config.resolve.extensions.push('.ts', '.tsx')
    return config
  }
}
