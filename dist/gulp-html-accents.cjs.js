/*!
 * gulp-html-accents v3.4.1
 * (c) 2017-present Vitor Luiz Cavalcanti <vitorluizc@outlook.com>
 * Released under the MIT License.
 */
'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var he = _interopDefault(require('he'));
var through = _interopDefault(require('through2'));
var PluginError = _interopDefault(require('plugin-error'));

/**
 * Concat custom options with default ones.
 * @param {import('he').EncodeOptions} options
 * @returns {import('he').EncodeOptions}
 */

var resolveOptions = function (options) {
  if ( options === void 0 ) options = {};

  return Object.assign({
  strict: false,
  decimal: false,
  encodeEverything: false,
  allowUnsafeSymbols: true,
  useNamedReferences: false
}, options);
};
/**
 * Replaces file's accents to HTML Entities.
 * @example
 * '<h1>Idéias</h1>' => '<h1>Id&#xE9;ias</h1>'
 * @param {import('he').EncodeOptions} [options]
 */


var gulpHtmlAccents = function (options) {
  if ( options === void 0 ) options = {};

  return through.obj(function (file, _, done) {
    if (file.contents instanceof Buffer) {
      try {
        var contents = he.encode(file.contents.toString('utf8'), resolveOptions(options));
        file.contents = Buffer.from(contents);
      } catch (err) {
        throw new PluginError('gulp-html-accents', err);
      }
    }

    this.push(file);
    done();
  });
};

module.exports = gulpHtmlAccents;
