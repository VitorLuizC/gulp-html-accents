# gulp-html-accents

[![Greenkeeper badge](https://badges.greenkeeper.io/VitorLuizC/gulp-html-accents.svg)](https://greenkeeper.io/)
[![Build Status](https://travis-ci.org/VitorLuizC/gulp-html-accents.svg?branch=master)](https://travis-ci.org/VitorLuizC/gulp-html-accents)

Replace accents with HTML Entities using [he module](https://www.npmjs.com/package/he).

```html
<p>Olá, tudo bem com você?</p>
```

encodes to

```html
<p>Ol&#xE1;, tudo bem com voc&#xEA;?</p>
```

## Usage
Like any other _gulp-plugin_.

```js
const gulp = require('gulp');
const accents = require('gulp-html-accents');

gulp.task('process:html', () => {
  gulp.src('./src/index.html')
    .pipe(accents())
    .pipe(gulp.dest('./dist'));
});
```

## Options
gulp-html-accents uses he.encode to encode and it's options.
<br>
## [```he.encode```](https://github.com/mathiasbynens/he#heencodetext-options)