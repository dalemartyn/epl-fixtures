import getBroadcastSchedule from './get-broadcast-schedule';
import getFixtures from './get-fixtures';
import getGameweek from './get-gameweek';
import getYoutubePlaylist from './get-youtube-playlist';
import teams from './teams';

interface Fixture {
  code: string;
  team_h: { id: number };
  team_a: { id: number };
  finished: boolean;
  [key: string]: any; // For other dynamic properties
}

interface Matchday {
  fixtures: Fixture[];
}

interface GameweekData {
  gameweek: number;
  matchdays: Matchday[];
  start_date: string;
  end_date: string;
  current_gameweek: boolean
}

interface YoutubeItem {
  game: string;
  id: string;
}

async function getFixturesWithBroadcastersByGameweek(gameweek: number): Promise<GameweekData> {
  const data = await getFixtures(gameweek);
  const schedule = await getBroadcastSchedule(data.start_date, data.end_date);

  data.matchdays.forEach((matchday: Matchday) => {
    matchday.fixtures = matchday.fixtures.map((fixture) => {
      return {
        ...fixture,
        broadcaster: schedule[fixture.code]
      };
    });
  });

  return data;
}

async function getFixturesWithBroadcasters(): Promise<GameweekData> {
  const gameweek = await getGameweek();
  return getFixturesWithBroadcastersByGameweek(gameweek);
}

async function getAllFixtures() {
  const weeks = Array(38).fill(null).map((_, i) => 38 - i);
  const [
    gameweek,
    youtubePlaylist,
    ...gameweeks
  ] = await Promise.all([
    getGameweek(),
    getYoutubePlaylist(),
    ...weeks.map((gameweek) => getFixturesWithBroadcastersByGameweek(gameweek))
  ]);

  const gameweeksWithCurrentWeek = addCurrentGameweek(gameweek, gameweeks);

  const gameweeksWithYoutube = addYoutubeIds(youtubePlaylist, gameweeksWithCurrentWeek);

  return gameweeksWithYoutube;
}

function addCurrentGameweek(gameweek: string, gameweeks: GameweekData[]): GameweekData[] {
  return gameweeks.map((g) => {
    if (g.gameweek === +gameweek) {
      g.current_gameweek = true;
    }
    return g;
  });
}

function addYoutubeIds(youtubePlaylist: YoutubeItem[], gameweeks: GameweekData[]): GameweekData[] {
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

function getYoutubeId(fixture: Fixture, youtubePlaylist: YoutubeItem[]): string | null {
  const team_h = teams[fixture.team_h.id];
  const team_a = teams[fixture.team_a.id];
  const regex = new RegExp(`(${team_h.regex})\\s\\d+-\\d+\\s(${team_a.regex})`);

  for (const item of youtubePlaylist) {
    if (item.game.match(regex)) {
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
