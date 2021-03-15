module.exports = {
  friendlyName: 'Test',

  description: 'Test test.',

  inputs: {},

  exits: {},

  fn: async function () {
    // All done.
    const response = { message: 'It works!' };
    return response;
  },
};
