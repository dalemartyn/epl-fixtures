import { Handler } from '@netlify/functions';
import { getAllFixtures } from '../../../fixtures';

const headers = {
  'content-type': 'application/json',
  'access-control-allow-origin': 'https://fixtures.dalestillman.com',
};

export const handler: Handler = async () => {
  try {
    const data = await getAllFixtures();

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(data, null, 2),
    };
  } catch (err) {
    throw err;
    console.error(err);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ msg: (err as Error).message }),
    };
  }
};
