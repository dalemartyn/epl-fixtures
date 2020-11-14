const getFixtures = require('./fixtures/get-fixtures');

getFixtures(1)
  .then((data) => {
    console.log(JSON.stringify(data, null, 2));
  });
