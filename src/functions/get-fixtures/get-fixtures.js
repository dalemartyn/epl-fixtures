const {
  getFixturesWithBroadcasters,
  getFixturesWithBroadcastersByGameweek
} = require('../../../fixtures');

exports.handler = async function(event) {

  try {
    let data;
    if (event.body) {
      const { gameweek } = JSON.parse(event.body);
      data = await getFixturesWithBroadcastersByGameweek(gameweek);
    } else {
      data = await getFixturesWithBroadcasters();
    }
    return {
      statusCode: 200,
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(data, null, 2)
    };
  } catch (err) {
    console.log(err);
    return {
      statusCode: 500,
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ msg: err.message })
    };
  }
}
