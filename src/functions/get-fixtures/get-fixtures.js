const { getFixturesWithBroadcasters } = require('../../../fixtures');

exports.handler = function(event, context, callback) {

  getFixturesWithBroadcasters()
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
