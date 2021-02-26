//controllers/user/create.js

module.exports = {
  friendlyName: 'Create',

  description: 'Create user.',

  inputs: {
    name: {
      type: 'string',
      required: true,
    },
  },

  exits: {
    success: {
      description: 'User JSON object',
    },
  },

  fn: async function (inputs) {
    const maxLength = 79;
    const name = inputs.name.trim().substring(0, maxLength);
    const user = await User.create({ name }).fetch();

    // All done.
    return user;
  },
};
