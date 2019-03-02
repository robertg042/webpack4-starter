/*
* PostCSS is a tool for transforming styles with JS plugins.
* These plugins can lint your CSS, support variables and mixins, transpile future CSS syntax, inline images, and more.
* https://github.com/postcss/postcss
*/
module.exports = {
  plugins: [
    /*
    * PostCSS Normalize lets you use the parts of normalize.css you need from your browserslist.
    */
    require('postcss-normalize')(),
    /*
    * Adds vendor prefixes to css attributes
    * https://github.com/postcss/autoprefixer
    */
    require('autoprefixer')()
  ]
};
