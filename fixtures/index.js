const getBroadcastSchedule = require('./get-broadcast-schedule');
const getFixtures = require('./get-fixtures');
const getGameweek = require('./get-gameweek');

function getFixturesWithBroadcastersByGameweek(gameweek) {
  return getFixtures(gameweek)
    .then((data) => {
      const [startDate, endDate] = getStartAndEndDates(data.fixtures);
      return getBroadcastSchedule(startDate, endDate)
        .then((schedule) => {
          data.fixtures = data.fixtures.map((fixture) => {
            return {
              ...fixture,
              broadcaster: schedule[fixture.code]
            }
          });
          return data;
        });
    });
}

function getFixturesWithBroadcasters() {
  return getGameweek().then((gameweek) => {
    return getFixturesWithBroadcastersByGameweek(gameweek);
  });
}

function getStartAndEndDates(fixtures) {
  const startDate = fixtures[0].kickoff_time.split('T')[0];
  const endDate = fixtures[fixtures.length - 1].kickoff_time.split('T')[0];
  return [startDate, endDate]
}

async function getAllFixtures() {
  const weeks = Array(38).fill(null).map((_, i) => 38 - i);
  const [
    gameweek,
    ...gameweeks
  ] = await Promise.all([
    getGameweek(),
    ...weeks.map((gameweek) => getFixturesWithBroadcastersByGameweek(gameweek))
  ]);

  return gameweeks.map((g) => {
    if (g.gameweek === +gameweek) {
      g.current_gameweek = true;
    };
    return g;
  });
}

module.exports = {
  getFixturesWithBroadcastersByGameweek,
  getFixturesWithBroadcasters,
  getAllFixtures
};
