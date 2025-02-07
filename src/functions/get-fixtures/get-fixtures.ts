import { getFixturesWithBroadcasters, getFixturesWithBroadcastersByGameweek } from '../../../fixtures/index';
import type { Handler } from '@netlify/functions';

interface EventBody {
  gameweek: number;
}

const handler: Handler = async (event) => {
  try {
    let data;
    if (event.body) {
      const { gameweek }: EventBody = JSON.parse(event.body);
      data = await getFixturesWithBroadcastersByGameweek(gameweek);
    } else {
      data = await getFixturesWithBroadcasters();
    }

    return {
      statusCode: 200,
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(data, null, 2),
    };
  } catch (err: any) {
    console.log(err);

    return {
      statusCode: 500,
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ msg: err.message }),
    };
  }
};

export { handler };
