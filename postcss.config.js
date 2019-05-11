module.exports = {
  plugins: [
    require('postcss-modules'),
    require('autoprefixer')({
      browsers: ['last 2 versions', 'dead', 'last 3 iOS versions', 'last 3 Android versions'],
    })
  ]
}
