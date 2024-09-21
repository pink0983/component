/* eslint-env node */
module.exports = {
  plugins: [
    require('postcss-each-variables'),
    require('postcss-nested'),
    // require('postcss-color-mix')
    
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    require('postcss-each')({
      plugins: {
        beforeEach: [
          require('postcss-for'),
          require('postcss-color-mix')
        ]
      }
    }),
  ]
}