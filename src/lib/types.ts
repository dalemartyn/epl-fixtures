export interface GameweekData {
    gameweek: number;
    date: string;
    current_gameweek?: boolean; // Make current_gameweek optional
    matchdays: {
        weekday: string;
        fixtures: {
            team_h: { name: string; score?: number };
            team_a: { name: string; score?: number };
            kickoff_time: string;
            finished: boolean;
            youtube?: string;
            broadcaster?: string;
        }[];
    }[];
}
