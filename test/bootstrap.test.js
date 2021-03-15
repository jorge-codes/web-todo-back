var sails = require('sails');

// Before running any tests...
before((done) => {
  process.env.NODE_ENV = 'test';
  sails.lift(
    {
      //Your Sails app's configuration files will be loaded automatically,
      // but you can also specify any other special overrides here for testing
      // purposes.

      // For example, we might want to skip the Grunt hook,
      // and disable all logs except errors and warnings:
      hooks: { grunt: false },
      log: { level: 'silent' },
    },
    (err) => {
      if (err) {
        return done(err);
      }

      // here you can load fixtures, etc.
      // (for example, you might want to create some records in the database)

      // this is just an example using promises, do not uncomment
      // User.create({ name: defaultName })
      //   .fetch()
      //   .then((user) => {
      //     defaultUser = { ...user };
      //     done();
      //   })
      //   .catch((error) => {
      //     return done(error);
      //   });

      return done();
    }
  );
});

// After all tests have finished...
after((done) => {
  // here you can clear fixtures, etc.
  // (e.g. you might want to destroy the records you created above)
  // console.log('\tshutting down sails...');
  // console.log(sails.hooks);
  sails.lower(done);
  // console.log('done');
});
