import { getTeamById } from './teams';
import type { TeamId, Fixture } from './types';

export type ApiFixture = {
	id: number;
	started: boolean;
	stats: string[];
	code: number;
	finished: boolean;
	finished_provisional: boolean;
	kickoff_time: string;
	minutes: number;
	provisional_start_time: boolean;
	team_a_score: number | null;
	team_h_score: number | null;
	pulse_id: number;
	event: number;
	team_a: TeamId;
	team_h: TeamId;
};

export default async function getFixturesForGameweek(gameweek: number = 1): Promise<Fixture[]> {
	const apiFixtures = await getApiFixturesForGameweek(gameweek);

	return apiFixtures.map((f) => createFixture(f));
}

async function getApiFixturesForGameweek(gameweek: number = 1): Promise<ApiFixture[]> {
	const res = await fetch(`https://draft.premierleague.com/api/event/${gameweek}/fixtures`);

	return res.json();
}

function createFixture(fixture: ApiFixture): Fixture {
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
			...getTeamById(team_h),
			score: team_h_score
		},
		team_a: {
			...getTeamById(team_a),
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
