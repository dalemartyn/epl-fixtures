require('dotenv').config();

const fetch = require('node-fetch');

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const YOUTUBE_PLAYLIST_ID = 'PLISuFiQTdKDWaRI8fQH2XBCHdM__dATrO';
const MISSING_FIXTURES = [
  {
    game: 'Man City 2-0 Newcastle',
    id: 'cH-IXgOZFSc'
  },
  {
    game: 'Sheffield Utd 0-1 Everton',
    id: 'LYb3lpyzuMI'
  },
  {
    game: 'Brighton 1-2 Southampton',
    id: '_WI9lJchSp4'
  }
];

module.exports = async function getYoutubePlaylist() {

  let page = await getYoutubePlaylistPageJson();
  let items = page.items;

  while (page.nextPageToken) {
    page = await getYoutubePlaylistPageJson(page.nextPageToken);
    items = items.concat(page.items);
  }

  return items.map((item) => ({
    game: item.snippet.title.split('|')[1].trim(),
    id: item.snippet.resourceId.videoId
  })).concat(MISSING_FIXTURES);
};

function getYoutubePlaylistPageJson(pageToken) {
    const endpoint = 'https://www.googleapis.com/youtube/v3/playlistItems';

  const url = new URL(endpoint);
  const params = url.searchParams;

  params.set('playlistId', YOUTUBE_PLAYLIST_ID);
  params.set('key', YOUTUBE_API_KEY);
  params.set('part', 'snippet');
  params.set('maxResults', 50);

  if (pageToken) {
    params.set('pageToken', pageToken);
  }

  return fetch(url, {
      method: 'GET',
    })
    .then(res => res.json());
} 
