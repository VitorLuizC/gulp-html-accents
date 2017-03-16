# gulp-html-accents
[![Build Status](https://travis-ci.org/VitorLuizC/gulp-html-accents.svg?branch=master)](https://travis-ci.org/VitorLuizC/gulp-html-accents)

Replace accents with HTML Entities.

So, ```<p>Olá, tudo bem com você?</p>``` encodes to
```<p>Ol&#xE1;, tudo bem com voc&#xEA;?</p>```.

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
- ```append (boolean | default = true)``` - Append custom dictionary pairs (keys
and values) to default one instead of replacing it;
- ```dictionary (Object.<string, string> | default = {})``` - A custom
dictionary to replace or append its values to default one.

> The property name(aka "key") is the character to be matched and the value is
> the which text replaces it.

Ex.
```js
  ...
  .pipe(accents({
    dictionary: {
      '?': '&#x3F;'
    }
  }))
```
