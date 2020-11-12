const getBroadcastSchedule = require('./get-broadcast-schedule');
const getFixtures = require('./get-fixtures');
const getGameweek = require('./get-gameweek');

function getFixturesWithBroadcastersByGameweek(gameweek) {
  return getFixtures(gameweek)
    .then((fixtures) => {
      const [startDate, endDate] = getStartAndEndDates(fixtures);
      return getBroadcastSchedule(startDate, endDate)
        .then((schedule) => {
          return fixtures.map((fixture) => {
            return {
              ...fixture,
              broadcaster: schedule[fixture.code]
            }
          });
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

module.exports = {
  getFixturesWithBroadcastersByGameweek,
  getFixturesWithBroadcasters
};
