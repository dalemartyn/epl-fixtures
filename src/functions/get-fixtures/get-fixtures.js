const {
  getFixturesWithBroadcasters,
  getFixturesWithBroadcastersByGameweek
} = require('../../../fixtures');

exports.handler = function(event, context, callback) {
  let getFixtures;
  if (event.body) {
    console.log(event.body);
    const body = JSON.parse(event.body);
    const gameweek = body.gameweek;
    getFixtures = getFixturesWithBroadcastersByGameweek.bind(null, gameweek);
  } else {
    getFixtures = getFixturesWithBroadcasters;
  }
  
  getFixtures()
    .then(sendResponse)
    .catch(onError);

  function sendResponse(data) {
    callback(null, {
      statusCode: 200,
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(data, null, 2)
    });
  }

  function onError(err) {
    console.log(err, err.stack);
    callback(err);
  }
}
