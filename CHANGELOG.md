# gulp-html-accents changelog

## 3.4.0
- improved code readability;
- fixed warning notice about `Buffer` usage;
- upgraded through2;
- upgraded bili;
  - used buble instead of babel;
- improved repository definitions;
- improved docs;

## 3.3.0
- upgraded bili;
  - added banner;
- added EditorConfig settings;

## 3.2.0
- bundle with bili;
  - exposed compiled ES module;
  - exposed compiled CommonJS module;
- added prepare script to bundle and test sources.

## 3.1.0
- set strict: false as default option since some characters break it.

## 3.0.0
- use he module instead of encoding with accents.json;
- removed **accents** option;
- removed **dictionary** option;
- added all [he.encode options](https://github.com/mathiasbynens/he#heencodetext-options)

## 2.0.0
- added support to special characters and regex-match using custom accents;
- added **accents** a simple array of accents to append or replace default accents;
- removed **dictionary** option;
- added left and right quotes characters.

## 1.1.1
- fixed unit test and an example;
- issue tracked! custom dictionary not working for RegExp special characters.

## 1.1.0
- **append** option to add custom dictionary values instead of replace default one;
- added better examples on README;
- added this CHANGELOG;
- added unit tests and Travis.

## 1.0.1
- fix main encoder function.

## 1.0.0
- **dictionary** option to use a custom dictionary;
- added portuguese + other accented characters;
- encodes accented characters (based on a dictionary) to HTML Entities.
