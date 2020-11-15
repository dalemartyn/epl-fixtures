const { getAllFixtures } = require('./fixtures');

getAllFixtures()
  .then((data) => {
    console.log(JSON.stringify(data, null, 2));
  });

// const getYoutubePlaylist = require('./fixtures/get-youtube-playlist');

// getYoutubePlaylist()
//   .then((data) => {
//     console.log(JSON.stringify(data, null, 2));
//   });
