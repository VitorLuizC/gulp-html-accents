# gulp-html-accents
[![Build Status](https://travis-ci.org/VitorLuizC/gulp-html-accents.svg?branch=master)](https://travis-ci.org/VitorLuizC/gulp-html-accents)

Replace accents with HTML Entities.

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
- `append`: (boolean | default = true) Append custom accents, instead of replace
default ones
- `accents`: (Accent[]) Custom accents.
  Ex.
  ```js
  gulpHtmlAccents(accents: [
    {
      literal: '?', // literal character.

      expression: '\\\?', // RegExp character (optional). Used to fix special
                          // characters issues on RegExp, like ? which break it.

      entity: '&#x3F;' // HTML Entity to replace character
    }
  ])
  ```
