const through = require('through2');
const { PluginError } = require('gulp-util');
const { name } = require('./package.json');

/**
 * An accent's structure to provide finder and replacer.
 * @typedef {Object} Accent
 * @property {string} literal
 * @property {string} entity
 * @property {(string|undefined)} expression
 */

/**
 * Default accents.
 * @type {Array.<Accent>}
 */
const accents = require('./accents.json');

/**
 * Find an accent by accent expression or literal and replace to entity.
 * @param {string} text
 * @param {Array.<Accent>} accents
 */
function replaceAccents(text, accents) {
  let finder = new RegExp(`(${
    accents
      .map(accent => (accent.expression) ? accent.expression : accent.literal)
      .join('|')
  })`, 'g');

  return text.replace(finder, matched => {
    return accents.find(accent => accent.literal === matched).entity || matched;
  });
}

/**
 * Plugin settings.
 * @typedef Options
 * @type {Object}
 * @property {Array.<Accent>} accents
 * @property {boolean} append Append custom dictionary values to default one.
 */

/**
 * Replaces file's accents to HTML Entities.
 * @example
 * '<h1>Idéias</h1>' => '<h1>Id&#xE9;ias</h1>'
 * @param {Options} options
 */
function gulpHtmlAccents(options = {}) {
  options = options || {};

  options.append = (typeof options.append === 'boolean') ? options.append : true;
  options.accents = (Array.isArray(options.accents)) ? options.accents : [];

  if (!options.append) {
    
  }


  options.accents = (options.replace) ? options.accents : [].concat(accents, options.accents || []);

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
        file.contents = new Buffer(replaceAccents(contents.toString('utf8'), options.accents));
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
