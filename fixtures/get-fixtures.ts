import { chain } from 'lodash';
import teams from './teams';

interface Team {
  name: string;
  short_name: string;
  id: number;
}

interface Fixture {
  team_h: Team;
  team_a: Team;
  team_h_score: number;
  team_a_score: number;
  kickoff_time: string;
  started: boolean;
  finished: boolean;
  minutes: number;
  code: string;
  date: string;
  time: string;
}

interface Matchday {
  date: string;
  human_date: string;
  weekday: string;
  fixtures: Fixture[];
}

interface FixturesResponse {
  gameweek: number;
  matchdays: Matchday[];
  start_date: string;
  end_date: string;
  date: string;
}

export default async function getFixtures(gameweek: number = 1): Promise<FixturesResponse> {
  const apiFixtures = await getFixturesJson(gameweek);

  const fixtures: Fixture[] = apiFixtures.map((f: any) => createFixture(f, teams));
  const matchdays: Matchday[] = chain(fixtures)
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

function humanDate(isoDateTime: string): string {
  return new Date(isoDateTime).toLocaleDateString('en-GB', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

function weekday(isoDateTime: string): string {
  return new Date(isoDateTime).toLocaleDateString('en-GB', {
    weekday: 'short',
  });
}

function getDayMonthAndYear(isoDateTime: string): { day: string; month: string; year: string } {
  const date = new Date(isoDateTime);
  const day = date.toLocaleDateString('en-GB', { day: 'numeric' });
  const month = date.toLocaleDateString('en-GB', { month: 'long' });
  const year = date.toLocaleDateString('en-GB', { year: 'numeric' });

  return { day, month, year };
}

function getGameweekDates(startDate: string, endDate: string): string {
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

async function getFixturesJson(gameweek: number = 1): Promise<any[]> {
  const res = await fetch(`https://draft.premierleague.com/api/event/${gameweek}/fixtures`);
  return res.json();
}

function getTeam(i: number, teams: any[]): Team {
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

function createFixture(fixture: any, teams: any[]): Fixture {
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
    time: new Date(kickoff_time).toLocaleTimeString('en-GB', { timeStyle: 'short' })
  };
}
