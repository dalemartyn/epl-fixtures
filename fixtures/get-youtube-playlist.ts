import dotenv from 'dotenv';

import type { GameHighlights } from './types';

dotenv.config();

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY as string;
const YOUTUBE_PLAYLIST_ID = 'PLISuFiQTdKDWc1PjlgqIAm1Bzc38MoLa6';

interface PlaylistItem {
  snippet: {
    title: string;
    resourceId: {
      videoId: string;
    };
  };
}

export default async function getYoutubePlaylist(): Promise<GameHighlights[]> {
  let page = await getYoutubePlaylistPageJson();
  let items: PlaylistItem[] = page.items;

  while (page.nextPageToken) {
    page = await getYoutubePlaylistPageJson(page.nextPageToken);
    items = items.concat(page.items);
  }

  return items
    .map((item) => {
      const title = item.snippet.title.split('|')[1]?.trim() ?? '';
      return {
        title,
        id: item.snippet.resourceId.videoId,
      };
    })
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
