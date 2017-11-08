const he = require('he');
const through = require('through2');
const { PluginError } = require('gulp-util');
const { name } = require('./package.json');

/**
 * Encodes HTML file contents using he module.
 * @param {string} text
 * @param {he.EncodeOptions} options
 * @returns {string}
 */
function encodeHtmlAccents(text, options) {

  /**
   * Default encode options.
   * @type {he.EncodeOptions}
   */
  const defaultOptions = {
    strict: false,
    allowUnsafeSymbols: true,
    encodeEverything: false,
    decimal: false,
    useNamedReferences: false
  };

  options = Object.assign({}, defaultOptions, options);

  return he.encode(text, options);
}

/**
 * Replaces file's accents to HTML Entities.
 * @example
 * '<h1>Idéias</h1>' => '<h1>Id&#xE9;ias</h1>'
 * @param {he.EncodeOptions} options
 */
function gulpHtmlAccents(options = {}) {
  options = (options instanceof Object) ? options : {};

  /**
   * Replaces buffer file's accents to HTML Entities.
   * @param {{ contents: Buffer }} file
   * @param {string} encode
   * @param {function} done
   */
  function replaceFileAccents(file, encode, done) {
    let { contents } = file;

    if (contents instanceof Buffer) {
      try {
        file.contents = new Buffer(encodeHtmlAccents(contents.toString('utf8'), options));
      } catch (err) {
        throw new PluginError(name, err);
      }
    }

    this.push(file);
    done();
  }

  return through.obj(replaceFileAccents);
}

module.exports = gulpHtmlAccents;
