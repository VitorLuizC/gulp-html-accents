const through = require('through2');
const { PluginError } = require('gulp-util');
const { name } = require('./package.json');
const dictionary = require('./dictionary.json');


/**
 * An object in which the key is the character to be found and value the HTML Entity that replaces it.
 * @typedef {Object.<string, string>} Dictionary
 */

/**
 * Build a RegExp to find dictionary keys.
 * @param {Dictionary} dictionary
 * @returns {RegExp}
 */
const buildRegExp = dictionary => new RegExp(`(${Object.keys(dictionary).join('|')})`, 'g');

/**
 * Plugin settings.
 * @typedef Options
 * @type {Object}
 * @property {Dictionary} dictionary
 * @property {boolean} append Append custom dictionary values to default one
 */

/**
 * Default plugin options.
 * @type {Options}
 */
const defaultOptions = {
  dictionary: {},
  append: true
};

/**
 * Find dictionary key and replace by its value.
 * @param {string} text
 * @param {Options} options
 */
const replace = (text, options) => {
  let finder = buildRegExp(options.dictionary);

  /**
   * Replace character matched by dictionary value.
   * @param {string} character
   * @returns {string}
   */
  let replacer = character => options.dictionary[character];

  return text.replace(finder, replacer);
};

/**
 * Replaces characters with accents by HTML Entity.
 * @param {Options} options
 */
module.exports = (options = {}) => {
  options = Object.assign({}, defaultOptions, options);

  if (options.append)
    options.dictionary = Object.assign({}, dictionary, options.dictionary);

  return through.obj(function (chunck, encode, done) {
    if (chunck.contents instanceof Buffer) {
      let text = chunck.contents.toString();
      try {
        chunck.contents = new Buffer(replace(text, options));
      } catch (err) {
        throw new PluginError(name, err);
      }
    }

    this.push(chunck);

    return done();
  });
};

module.exports.replace = replace;
