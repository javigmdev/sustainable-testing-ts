import {
  ColumnWidth,
  WrappableText,
} from '../../core/14-kata-word-wrap/wordWrap';

describe('The Word Wrap', () => {
  describe('The Word Wrap', () => {
    it('empty text does not need to be wrapped', () => {
      expect(WrappableText.create('').wordWrap(ColumnWidth.create(5))).toEqual({
        text: '',
      });
      expect(
        WrappableText.create(null).wordWrap(ColumnWidth.create(5)),
      ).toEqual({ text: '' });
      expect(
        WrappableText.create(undefined).wordWrap(ColumnWidth.create(5)),
      ).toEqual({ text: '' });
    });
    it('small text does not need to be wrapped', () => {
      expect(
        WrappableText.create('hello').wordWrap(ColumnWidth.create(5)),
      ).toEqual({ text: 'hello' });
    });
    it('words are wrapped when do not fit the column width', () => {
      expect(
        WrappableText.create('longword').wordWrap(ColumnWidth.create(4)),
      ).toEqual({ text: 'long\nword' });
      expect(
        WrappableText.create('reallylongword').wordWrap(ColumnWidth.create(4)),
      ).toEqual({ text: 'real\nlylo\nngwo\nrd' });
    });
    it('spaces are preferred for wrapping', () => {
      expect(
        WrappableText.create('abc def').wordWrap(ColumnWidth.create(4)),
      ).toEqual({ text: 'abc\ndef' });
      expect(
        WrappableText.create('abc def ghi').wordWrap(ColumnWidth.create(4)),
      ).toEqual({ text: 'abc\ndef\nghi' });
      expect(
        WrappableText.create(' abcd').wordWrap(ColumnWidth.create(4)),
      ).toEqual({ text: '\nabcd' });
    });
    it('does not allow for negative column width', () => {
      expect(() =>
        WrappableText.create('hello').wordWrap(ColumnWidth.create(-5)),
      ).toThrow('Negative column width is not allowed');
    });
  });
});
