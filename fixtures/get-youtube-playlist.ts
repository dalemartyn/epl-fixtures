import dotenv from 'dotenv';

dotenv.config();

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY as string;
const YOUTUBE_PLAYLIST_ID = 'PLISuFiQTdKDWttg3bD_4o2E-T5ud5vawr';
const MISSING_FIXTURES: Array<{ game: string; id: string }> = [];

interface YoutubeItem {
  snippet: {
    title: string;
    resourceId: {
      videoId: string;
    };
  };
}

interface PlaylistItem {
  game: string;
  id: string;
}

export default async function getYoutubePlaylist(): Promise<PlaylistItem[]> {
  let page = await getYoutubePlaylistPageJson();
  let items: YoutubeItem[] = page.items;

  while (page.nextPageToken) {
    page = await getYoutubePlaylistPageJson(page.nextPageToken);
    items = items.concat(page.items);
  }

  return items
    .map((item) => {
      const game = item.snippet.title.split('|')[1]?.trim() ?? '';
      return {
        game,
        id: item.snippet.resourceId.videoId,
      };
    })
    .concat(MISSING_FIXTURES);
}

async function getYoutubePlaylistPageJson(pageToken?: string) {
  const endpoint = 'https://www.googleapis.com/youtube/v3/playlistItems';
  const url = new URL(endpoint);
  const params = url.searchParams;

  params.set('playlistId', YOUTUBE_PLAYLIST_ID);
  params.set('key', YOUTUBE_API_KEY);
  params.set('part', 'snippet');
  params.set('maxResults', '50');

  if (pageToken) {
    params.set('pageToken', pageToken);
  }

  const res = await fetch(url.toString(), {
    method: 'GET',
  });
  return res.json();
}
