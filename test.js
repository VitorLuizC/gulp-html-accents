const { assert } = require('chai');
const File = require('vinyl');
const accents = require('./dist/gulp-html-accents.common.js');

function processFile(process, contents, callback) {
  let file = new File({
    contents: new Buffer(contents)
  });

  process.write(file);
  process.once('data', file => {
    assert.isTrue(file.isBuffer());
    callback(file);
  });
}


describe('gulp-html-accents unit tests', () => {
  let input = '<p>Olá! Tudo bem com você?</p>';

  it('module exports a function', () => {
    assert.typeOf(accents, 'function');
  });

  it('encode using default options', done => {
    let expectedOutput = '<p>Ol&#xE1;! Tudo bem com voc&#xEA;?</p>';

    processFile(accents(), input, file => {
      let processedOutput = file.contents.toString('utf8');

      assert.equal(processedOutput, expectedOutput);

      done();
    });
  });

  it('encode unsafe HTML characters', done => {
    let expectedOutput = '&#x3C;p&#x3E;Ol&#xE1;! Tudo bem com voc&#xEA;?&#x3C;/p&#x3E;';

    processFile(accents({ allowUnsafeSymbols: false }), input, file => {
      let processedOutput = file.contents.toString('utf8');

      assert.equal(processedOutput, expectedOutput);

      done();
    });
  });

  it('encode using name references when possible', done => {
    let expectedOutput = '<p>Ol&aacute;! Tudo bem com voc&ecirc;?</p>';

    processFile(accents({ useNamedReferences: true }), input, file => {
      let processedOutput = file.contents.toString('utf8');

      assert.equal(processedOutput, expectedOutput);

      done();
    });
  });

  it('encode every character', done => {
    let expectedOutput = '&#x3C;&#x70;&#x3E;&#x4F;&#x6C;&#xE1;&#x21;&#x20;&#x54;&#x75;&#x64;&#x6F;&#x20;&#x62;&#x65;&#x6D;&#x20;&#x63;&#x6F;&#x6D;&#x20;&#x76;&#x6F;&#x63;&#xEA;&#x3F;&#x3C;&#x2F;&#x70;&#x3E;';

    processFile(accents({ encodeEverything: true }), input, file => {
      let processedOutput = file.contents.toString('utf8');

      assert.equal(processedOutput, expectedOutput);

      done();
    });
  });
});
