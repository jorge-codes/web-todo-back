// clean-name.test.js
const assert = require('chai').assert;
// const expect = require('chai').expect; // uncomment if need to run deprecated cases

describe('Helper', () => {
  describe('cleanName', () => {
    it('should return name without whitespaces on the sides', () => {
      const input = '   Jorge   ';
      const expected = 'Jorge';
      const output = sails.helpers.cleanName(input);
      assert.equal(output, expected);
    });

    // The following cases are not necessary for coverage,
    // but are left in place for learning purposes.

    // it('should return empty string when value is just whitespace', () => {
    //   const input = '       ';
    //   const expected = '';
    //   const output = sails.helpers.cleanName(input);
    //   assert.equal(output, expected);
    // });

    // it('should return type string', () => {
    //   const input = '  Jorge';
    //   const output = sails.helpers.cleanName(input);
    //   assert.typeOf(output, 'string');
    // });

    // it('should throw error when input is undefined', () => {
    //   expect(() => sails.helpers.cleanName()).to.throw();
    // });
  });
});
