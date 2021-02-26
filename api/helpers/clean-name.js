//helpers/clean-name.js
module.exports = {
  sync: true,

  friendlyName: 'Clean name',

  description: '',

  inputs: {
    name: {
      type: 'string',
      required: true,
    },
  },

  exits: {
    success: {
      description: 'All done.',
    },
  },

  fn: function (inputs) {
    const maxLength = sails.config.custom.nameMaxLength;
    let name = inputs.name === undefined ? '' : inputs.name;
    name = name.trim().substring(0, maxLength);

    // All done
    return name;
  },
};
