const fetch = require('node-fetch');

module.exports = function getBroadcastSchedule(startDate, endDate) {
  return fetch(getFixturesUrl(startDate, endDate), {
      "headers": {
        "origin": "https://www.premierleague.com",
      },
    })
    .then((res) => res.json())
    .then(({ content: items }) => {
      const schedule = {};
      items.forEach((item) => {
        schedule[item.fixture.altIds.opta.replace('g', '')] = item.broadcasters[0].abbreviation;
      });
      return schedule;
    });
}

function getFixturesUrl(startDate, endDate) {
  const baseUrl = `https://footballapi.pulselive.com/football/broadcasting-schedule/fixtures`;
  const path = `?comps=1&pageSize=100&page=0&altIds=true&startDate=${startDate}&endDate=${endDate}`;
  return baseUrl + path;
}
