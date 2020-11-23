const fetch = require('node-fetch');
const { chain } = require('lodash');
const teams = require('./teams');
const getGameweek = require('./get-gameweek');

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

  const start_date = matchdays[0].date;
  const end_date = matchdays[matchdays.length - 1].date;

  const date = getGameweekDates(start_date, end_date);

  return {
    gameweek,
    matchdays,
    start_date,
    end_date,
    date
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

function getDayMonthAndYear(isoDateTime) {
  const date = new Date(isoDateTime);
  const day = date.toLocaleDateString('en-GB', { day: 'numeric' });
  const month = date.toLocaleDateString('en-GB', { month: 'long' });
  const year = date.toLocaleDateString('en-GB', { year: 'numeric' });

  return { day, month, year };
}

function getGameweekDates(startDate, endDate) { 
  const start = getDayMonthAndYear(startDate);
  const end = getDayMonthAndYear(endDate);

  if (start.month === end.month && start.day === end.day) {
    return `${end.day} ${end.month} ${end.year}`;
  } else if (start.month === end.month) {
    return `${start.day}-${end.day} ${end.month} ${end.year}`;
  } else if (start.year === end.year) {
    return `${start.day} ${start.month}-${end.day} ${end.month} ${end.year}`;
  } else {
    return `${start.day} ${start.month} ${start.year}-${end.day} ${end.month} ${end.year}`;
  }
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
    finished_provisional: finished,
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
