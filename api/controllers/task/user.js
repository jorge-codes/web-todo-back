//controllers/task/user.js
module.exports = {
  friendlyName: 'User',

  description: 'User task.',

  inputs: {
    id: {
      type: 'number',
      required: true,
      description: 'user id',
    },
  },

  exits: {
    success: {
      description: 'JSON object containing user name and its tasks (array)',
    },
    notFound: {
      responseType: 'notFound',
      description: 'Invalid user id',
    },
  },

  fn: async function (inputs, exits) {
    const id = inputs.id;

    const user = await User.findOne({ id });
    if (!user) {
      return exits.notFound();
    }

    const tasks = await Task.find({ user: id });
    const response = {
      user: {
        name: user.name,
      },
      tasks,
    };

    // All done.
    return exits.success(response);
  },
};
