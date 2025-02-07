type TeamId = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20;

interface Team {
	name: string;
	short_name: string;
	id: TeamId;
}

interface TeamWithScore extends Team {
	score: number | null;
}

interface Fixture {
	team_h: TeamWithScore;
	team_a: TeamWithScore;
	kickoff_time: string;
	started: boolean;
	finished: boolean;
	minutes: number;
	code: number;
	date: string;
	time: string;
}

interface Matchday {
	date: string;
	human_date: string;
	weekday: string;
	fixtures: Fixture[];
}

interface Gameweek {
	gameweek: number;
	matchdays: Matchday[];
	start_date: string;
	end_date: string;
	date: string;
	current_gameweek?: boolean;
}

interface GameHighlights {
	title: string;
	id: string;
}

export type {
	TeamId,
	Team,
	TeamWithScore,
	Fixture,
	Matchday,
	Gameweek,
	GameHighlights
};
