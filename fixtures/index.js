const getBroadcastSchedule = require('./get-broadcast-schedule');
const getFixtures = require('./get-fixtures');
const getGameweek = require('./get-gameweek');
const getYoutubePlaylist = require('./get-youtube-playlist');
const teams = require('./teams');

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
    youtubePlaylist,
    ...gameweeks
  ] = await Promise.all([
    getGameweek(),
    getYoutubePlaylist(),
    ...weeks.map((gameweek) => getFixturesWithBroadcastersByGameweek(gameweek))
  ]);

  const gameweeksWithCurrentWeek = addCurrentGameweek(gameweek, gameweeks);

  const gameweeksWithYoutube = addYoutubeIds(youtubePlaylist, gameweeksWithCurrentWeek);

  return gameweeksWithYoutube;
}

function addCurrentGameweek(gameweek, gameweeks) {
  return gameweeks.map((g) => {
    if (g.gameweek === +gameweek) {
      g.current_gameweek = true;
    };
    return g;
  });
}

function addYoutubeIds(youtubePlaylist, gameweeks) {
  return gameweeks.map((gameweek) => {
    gameweek.matchdays.forEach((matchday) => {
      matchday.fixtures = matchday.fixtures.map((fixture) => {
        if (fixture.finished) {
          return {
            ...fixture,
            youtube: getYoutubeId(fixture, youtubePlaylist)
          };
        }
        return fixture;
      });
    });
    return gameweek;
  });
}

function getYoutubeId(fixture, youtubePlaylist) {
  const team_h = teams[fixture.team_h.id];
  const team_a = teams[fixture.team_a.id];
  const regex = new RegExp(`(${team_h.regex})\\s\\d+-\\d+\\s(${team_a.regex})`);

  for (item of youtubePlaylist) {
    if (item.game.match(regex)) {
      return item.id;
    }
  }

  return null;
}

module.exports = {
  getFixturesWithBroadcastersByGameweek,
  getFixturesWithBroadcasters,
  getAllFixtures
};
