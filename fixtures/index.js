const getBroadcastSchedule = require('./get-broadcast-schedule');
const getFixtures = require('./get-fixtures');
const getGameweek = require('./get-gameweek');

function getFixturesWithBroadcastersByGameweek(gameweek) {
  return getFixtures(gameweek)
    .then((data) => {
      const startDate = data.matchdays[0].date;
      const endDate = data.matchdays[data.matchdays.length - 1].date;
      return getBroadcastSchedule(startDate, endDate)
        .then((schedule) => {
          data.matchdays.forEach((matchday) => {
            matchday.fixtures = matchday.fixtures.map((fixture) => {
              return {
                ...fixture,
                broadcaster: schedule[fixture.code]
              }
            });
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
