const fetch = require('node-fetch');
const { keyBy } = require('lodash');

module.exports = async function getFixtures(gameweek = 1) {
  const [fixtures, teams] = await Promise.all([getFixturesJson(gameweek), getTeams()]);

  return {
    gameweek,
    fixtures: fixtures.map((f) => createFixture(f, teams))
  };
}

function getFixturesJson(gameweek = 1) {
  return fetch(`https://draft.premierleague.com/api/event/${gameweek}/fixtures`)
    .then((res) => res.json())
}

function getTeams() {
  return fetch(`https://draft.premierleague.com/api/bootstrap-static`)
    .then((res) => res.json())
    .then((data) => {
      return keyBy(data.teams, 'id');
    });
}

function getTeam(i, teams) {
  const team = teams[i];

  return {
    ...team
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
    code
  };
}
