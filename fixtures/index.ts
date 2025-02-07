import getBroadcastSchedule from './get-broadcast-schedule';
import getGameweek from './get-gameweek';
import getCurrentGameweekNumber from './get-current-gameweek-number';
import getYoutubePlaylist from './get-youtube-playlist';
import teams from './teams';
import type { Gameweek, Fixture, GameHighlights } from './types';

async function getFixturesWithBroadcastersByGameweek(gameweek: number): Promise<Gameweek> {
  const data = await getGameweek(gameweek);
  const schedule = await getBroadcastSchedule(data.start_date, data.end_date);

  data.matchdays.forEach((matchday) => {
    matchday.fixtures = matchday.fixtures.map((fixture) => {
      return {
        ...fixture,
        broadcaster: schedule[fixture.code]
      };
    });
  });

  return data;
}

async function getFixturesWithBroadcasters(): Promise<Gameweek> {
  const gameweekNumber = await getCurrentGameweekNumber();

  return getFixturesWithBroadcastersByGameweek(gameweekNumber);
}

async function getAllFixtures() {
  const weeks = Array.from({ length: 38 }, (_, i) => 38 - i);
  const [
    gameweek,
    youtubePlaylist,
    ...gameweeks
  ] = await Promise.all([
    getCurrentGameweekNumber(),
    getYoutubePlaylist(),
    ...weeks.map((gameweek) => getFixturesWithBroadcastersByGameweek(gameweek))
  ]);

  const gameweeksWithCurrentWeek = addCurrentGameweek(gameweek, gameweeks);

  const gameweeksWithYoutube = addYoutubeIds(youtubePlaylist, gameweeksWithCurrentWeek);

  return gameweeksWithYoutube;
}

function addCurrentGameweek(gameweek: number, gameweeks: Gameweek[]): Gameweek[] {
  return gameweeks.map((g) => {
    if (g.gameweek === gameweek) {
      g.current_gameweek = true;
    }
    return g;
  });
}

function addYoutubeIds(youtubePlaylist: GameHighlights[], gameweeks: Gameweek[]): Gameweek[] {
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

function getYoutubeId(fixture: Fixture, youtubePlaylist: GameHighlights[]): string | null {
  const team_h = teams[fixture.team_h.id];
  const team_a = teams[fixture.team_a.id];
  const regex = new RegExp(`(${team_h.regex})\\s\\d+-\\d+\\s(${team_a.regex})`);

  for (const item of youtubePlaylist) {
    if (item.title.match(regex)) {
      return item.id;
    }
  }

  return null;
}

export {
  getFixturesWithBroadcastersByGameweek,
  getFixturesWithBroadcasters,
  getAllFixtures
};
