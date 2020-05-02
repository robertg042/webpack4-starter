# Webpack starter kit configured for multi-page website

## usage

### include new page to the project

```diff
  const entries = {
    main: path.resolve(PATHS.src, 'index.js'),
    about: path.resolve(PATHS.pages, 'about', 'about.js'),
+   new: path.resolve(PATHS.pages, 'new', 'new.js'),
  };
```

or

```diff
plugins: [
  // ...
  new CleanWebpackPlugin(['dist']),
  new HtmlWebpackPlugin({
    filename: 'index.html',
    template: path.resolve(PATHS.src, 'index.html'),
    inject: true,
    chunks: ['main'],
  }),
  ...pagesHtmlPlugins,
+ new HtmlWebpackPlugin({
+   filename: 'pages/new.html',
+   template: path.resolve(PATHS.pages, 'new', 'new.html'),
+   chunks: ['new'],
+ }),
  // ...
],
```

### async bundle import

example:

```js
setTimeout(() => {
  import('../../shared/js/jsAsync');
}, 1000);
```

### code execution only in development:

```js
if (process.env.NODE_ENV === 'development') {
  // executes only if webpack mode === 'development'
  // ...
}
```

### gsap

```js
import gsap from 'gsap';

const el = document.getElementById('shrink-me');
gsap.to(el, { duration: 1, scale: 0.1, ease: 'power2.easeIn' });
```

### fontawesome icons

```js
import { library, dom } from '@fortawesome/fontawesome-svg-core';
import { faGrinTongueWink } from '@fortawesome/free-regular-svg-icons';

library.add(faGrinTongueWink);

dom.i2svg();
```

### google fonts

in scss file, e.g. `shared/styles/base.scss`:

```scss
@import url('https://fonts.googleapis.com/css?family=Lato');
```

### how to use webp images with jpg/png fallbacks

```html
<picture>
  <source type="image/webp" srcset="./assets/cat.webp" />
  <img src="./assets/cat.jpg" alt="A cat" />
</picture>
```

## Troubleshooting

### errors with gsap or other library?

The [treeshaking](https://webpack.js.org/guides/tree-shaking/) that webpack is utilizing can strip down vital components of a library because they are not directly referenced in the app's code. It may be helpful to include them in verbosely.

In case of Greensock (version 2.x) it could look like this:

```js
import { TimelineLite, CSSPlugin, AttrPlugin } from 'gsap/all';

//without this line, CSSPlugin and AttrPlugin may get dropped by your bundler...
const plugins = [CSSPlugin, AttrPlugin];

var tl = new TimelineLite();
tl.to('.myClass', 1, { x: 100, attr: { width: 300 } });
```

[source](https://greensock.com/docs/NPMUsage)

### known issues
- I can't get HMR to work for js
- also I have no idea how to make html-loader create relative paths for images and the like. This means setting of publicPath is necessary for nested html paths
- `purgecss-webpack-plugin` breaks style sourcemaps

## useful links:

- [webpack official guides](https://webpack.js.org/guides/)
- [webpack official concepts' page](https://webpack.js.org/concepts/)
- [Webpack book](https://survivejs.com/webpack/developing/getting-started/) - great tutorial on which this kit is based
- [font awesome svg library API](https://fontawesome.com/how-to-use/with-the-api/setup/getting-started)

## TODO

A list of things missing:

- testing
- ... a lot more I haven't thought of
