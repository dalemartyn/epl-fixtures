const { getAllFixtures } = require('./fixtures');

getAllFixtures()
  .then((data) => {
    console.log(JSON.stringify(data, null, 2));
  });
