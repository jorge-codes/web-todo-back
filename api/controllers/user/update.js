module.exports = {
  friendlyName: 'Update',

  description: 'Update user.',

  inputs: {
    id: {
      type: 'number',
      required: true,
      description: 'user id',
    },
    name: {
      type: 'string',
      required: true,
    },
  },

  exits: {
    success: {
      description: 'User JSON object',
    },
    notFound: {
      responseType: 'notFound',
      description: 'Invalid user id',
    },
  },

  fn: async function (inputs, exits) {
    const id = inputs.id;
    const name = sails.helpers.cleanName(inputs.name);
    const user = await User.updateOne({ id }).set({ name });

    if (!user) {
      exits.notFound();
    }

    // All done.
    return exits.success(user);
  },
};
