const {encode} = require('./001-caesar');

const {expect} = require('chai');

describe('caesar', () => {

  describe('encode', () => {

    it('should be a function', () => {
      expect(encode).to.be.a('function');
    });

    it('should encode capital English letters', () => {
      // Arrange
      const shift = 1
      const input = 'ABC'
      const expected = 'BCD'

      // Act
      const actual = encode(shift, input)

      // Assert
      expect(actual).to.equal(expected);
    });

    it('should encode lower-case English letters', () => {
      // Arrange
      const shift = 1
      const input = 'abc'
      const expected = 'bcd'

      // Act
      const actual = encode(shift, input)

      // Assert
      expect(actual).to.equal(expected);
    });

  });

  describe.skip('decode', () => {

  });

});
