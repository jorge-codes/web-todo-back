//constrollers/task/update.js

module.exports = {
  friendlyName: 'Update',

  description: 'Update task.',

  inputs: {
    id: {
      type: 'number',
      required: true,
      description: 'task id',
    },
    description: {
      type: 'string',
      required: false,
      description: 'task description',
    },
    state: {
      type: 'boolean',
      required: false,
      description: 'task state',
    },
  },

  exits: {
    success: {
      description: 'Task JSON object',
    },
    notFound: {
      responseType: 'notFound',
      description: 'Invalid task id',
    },
  },

  fn: async function (inputs, exits) {
    const id = inputs.id;

    const task = await Task.findOne({ id });
    if (!task) {
      return exits.notFound();
    }

    let description =
      inputs.description !== undefined ? inputs.description : task.description;
    description = sails.helpers.cleanName(description);
    const state = inputs.state !== undefined ? inputs.state : task.state;

    const taskUpdated = await Task.updateOne({ id }).set({
      description,
      state,
    });

    // All done.
    return exits.success(taskUpdated);
  },
};
