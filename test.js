const { assert } = require('chai');
const File = require('vinyl');
const accents = require('./');

describe('gulp-html-accents unit tests', () => {
  it('module exports a function', () => {
    assert.typeOf(accents, 'function');
  });

  it('encode only accents to HTML Entities', done => {
    const processed = accents({
      dictionary: {'?': '&#x3F;'},
      append: true
    });
    const contents = {
      input: `
      <p>
        Olá!
        Tudo bem com você?
      </p>`,
      output: `
      <p>
        Ol&#xE1;!
        Tudo bem com voc&#xEA;&#x3F;
      </p>`
    };
    const file = new File({
      contents: new Buffer(contents.input)
    });

    processed.write(file);
    processed.once('data', file => {
      assert(file.isBuffer());
      assert.equal(file.contents.toString('utf8'), contents.output);
      done();
    });
  });
});
