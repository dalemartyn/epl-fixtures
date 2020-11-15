const fetch = require('node-fetch');
const { chain } = require('lodash');
const teams = require('./teams');

module.exports = async function getFixtures(gameweek = 1) {
  const apiFixtures = await getFixturesJson(gameweek);

  const fixtures = apiFixtures.map((f) => createFixture(f, teams));
  const matchdays = chain(fixtures)
    .groupBy('date')
    .toPairs()
    .map(([date, fixtures]) => ({
      date,
      human_date: humanDate(date),
      weekday: weekday(date),
      fixtures
    }))
    .sortBy('date')
    .value();

  return {
    gameweek,
    matchdays
  };
}

function humanDate(isoDateTime) {
  return new Date(isoDateTime).toLocaleDateString('en-GB', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

function weekday(isoDateTime) {
  return new Date(isoDateTime).toLocaleDateString('en-GB', {
    weekday: 'short',
  });
}

function getFixturesJson(gameweek = 1) {
  return fetch(`https://draft.premierleague.com/api/event/${gameweek}/fixtures`)
    .then((res) => res.json())
}

function getTeam(i, teams) {
  const {
    name,
    short_name,
    id
  } = teams[i];

  return {
    name,
    short_name,
    id
  };
}

function createFixture(fixture, teams) {
  const {
    team_h,
    team_a,
    team_h_score,
    team_a_score,
    kickoff_time,
    started,
    finished,
    minutes,
    code
  } = fixture;
  return {
    team_h: {
      ...getTeam(team_h, teams),
      score: team_h_score
    },
    team_a: {
      ...getTeam(team_a, teams),
      score: team_a_score
    },
    kickoff_time,
    started,
    finished,
    minutes,
    code,
    date: kickoff_time.split('T')[0],
    time: new Date(fixture.kickoff_time).toLocaleTimeString('en-GB', { timeStyle: 'short' })
  };
}
