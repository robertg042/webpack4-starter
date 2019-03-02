const imagemin = require('imagemin');
const webp = require('imagemin-webp');

imagemin(['src/assets/*.{jpg,png}'], 'converted-images', {
  use: [webp({ quality: 75 })],
});
