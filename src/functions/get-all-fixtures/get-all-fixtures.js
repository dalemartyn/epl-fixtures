const {
  getAllFixtures
} = require('../../../fixtures');

exports.handler = async function(event) {

  try {
    const data = await getAllFixtures();

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
