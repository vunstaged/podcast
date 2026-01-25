const path = require('path')

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        '@images': path.resolve(__dirname, 'src/images')
      }
    }
  })
}
