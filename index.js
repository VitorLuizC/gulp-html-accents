import he from 'he';
import through from 'through2';
import PluginError from 'plugin-error';

/**
 * Concat custom options with default ones.
 * @param {import('he').EncodeOptions} options
 * @returns {import('he').EncodeOptions}
 */
const resolveOptions = (options = {}) => ({
  strict: false,
  decimal: false,
  encodeEverything: false,
  allowUnsafeSymbols: true,
  useNamedReferences: false,
  ...options
});

/**
 * Replaces file's accents to HTML Entities.
 * @example
 * '<h1>Idéias</h1>' => '<h1>Id&#xE9;ias</h1>'
 * @param {import('he').EncodeOptions} [options]
 */
const gulpHtmlAccents = (options = {}) => {
  return through.obj(function (file, _, done) {
    if (file.contents instanceof Buffer) {
      try {
        const contents = he.encode(file.contents.toString('utf8'), resolveOptions(options));
        file.contents = Buffer.from(contents);
      } catch (err) {
        throw new PluginError('gulp-html-accents', err);
      }
    }

    this.push(file);
    done();
  });
};

export default gulpHtmlAccents;
