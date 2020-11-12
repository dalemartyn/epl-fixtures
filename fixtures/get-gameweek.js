const fetch = require('node-fetch');

module.exports = function getGameweek() {
  return fetch("https://www.premierleague.com")
    .then((res) => res.text())
    .then((html) => {
      return html.match(/<div class="week">Matchweek ([\d,]+)<\/div>/)[1];
    })
}
