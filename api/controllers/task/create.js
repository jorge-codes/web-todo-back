//controllers/task/create.js

module.exports = {
  friendlyName: 'Create',

  description: 'Create task.',

  inputs: {
    user: {
      type: 'number',
      required: true,
      description: 'user id',
    },
    description: {
      type: 'string',
      required: true,
    },
  },

  exits: {
    success: {
      description: 'Task JSON object',
    },
    notFound: {
      responseType: 'notFound',
      description: 'Invalid user id',
    },
  },

  fn: async function (inputs, exits) {
    const id = inputs.user;
    const description = sails.helpers.cleanName(inputs.description);
    const state = sails.config.enums.taskState.INCOMPLETE; //by default

    const user = await User.findOne({ id: id });
    if (!user) {
      return exits.notFound();
    }

    const task = await Task.create({
      description,
      state,
      user: id,
    }).fetch();

    // // All done.
    return exits.success(task);
  },
};
