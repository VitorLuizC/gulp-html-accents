import he from 'he';
import through from 'through2';
import { PluginError } from 'gulp-util';

var name = "gulp-html-accents";

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
  var defaultOptions = {
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
function gulpHtmlAccents(options) {
  if ( options === void 0 ) options = {};

  options = (options instanceof Object) ? options : {};

  /**
   * Replaces buffer file's accents to HTML Entities.
   * @param {{ contents: Buffer }} file
   * @param {string} encode
   * @param {function} done
   */
  function replaceFileAccents(file, encode, done) {
    var contents = file.contents;

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

export default gulpHtmlAccents;
