'use strict';

var chai = require('chai');
var assert = chai.assert;
var File = require('vinyl');
var accents = require('./');

function processFile(process, contents, callback) {
  var file = new File({
    contents: new Buffer(contents)
  });

  process.write(file);
  process.once('data', function (file) {
    assert.isTrue(file.isBuffer());
    callback(file);
  });
}


describe('gulp-html-accents unit tests', function () {
  var input = '<p>Olá! Tudo bem com você?</p>';

  it('module exports a function', function () {
    assert.typeOf(accents, 'function');
  });

  it('encode using default options', function (done) {
    var expectedOutput = '<p>Ol&#xE1;! Tudo bem com voc&#xEA;?</p>';

    processFile(accents(), input, function (file) {
      var processedOutput = file.contents.toString('utf8');

      assert.equal(processedOutput, expectedOutput);

      done();
    });
  });

  it('encode unsafe HTML characters', function (done) {
    var expectedOutput = '&#x3C;p&#x3E;Ol&#xE1;! Tudo bem com voc&#xEA;?&#x3C;/p&#x3E;';

    processFile(accents({ allowUnsafeSymbols: false }), input, function (file) {
      var processedOutput = file.contents.toString('utf8');

      assert.equal(processedOutput, expectedOutput);

      done();
    });
  });

  it('encode using name references when possible', function (done) {
    var expectedOutput = '<p>Ol&aacute;! Tudo bem com voc&ecirc;?</p>';

    processFile(accents({ useNamedReferences: true }), input, function (file) {
      var processedOutput = file.contents.toString('utf8');

      assert.equal(processedOutput, expectedOutput);

      done();
    });
  });

  it('encode every character', function (done) {
    var expectedOutput = '&#x3C;&#x70;&#x3E;&#x4F;&#x6C;&#xE1;&#x21;&#x20;&#x54;&#x75;&#x64;&#x6F;&#x20;&#x62;&#x65;&#x6D;&#x20;&#x63;&#x6F;&#x6D;&#x20;&#x76;&#x6F;&#x63;&#xEA;&#x3F;&#x3C;&#x2F;&#x70;&#x3E;';

    processFile(accents({ encodeEverything: true }), input, function (file) {
      var processedOutput = file.contents.toString('utf8');

      assert.equal(processedOutput, expectedOutput);

      done();
    });
  });
});
