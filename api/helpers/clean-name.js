//helpers/clean-name.js
module.exports = {
  sync: true,

  friendlyName: 'Clean name',

  description: 'Helper that removes whitespaces',

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

  fn: function (inputs, exits) {
    let name = inputs.name;
    const maxLength = sails.config.custom.nameMaxLength;
    name = name.trim().substring(0, maxLength);

    return exits.success(name);
  },
};
