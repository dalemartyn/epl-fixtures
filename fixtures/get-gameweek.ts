import { chain } from 'lodash';
import getFixturesForGameweek from './get-gameweek-fixtures';

import type {
	Matchday,
	Gameweek
} from './types';

export default async function getFixtures(gameweek: number = 1): Promise<Gameweek> {
	const fixtures = await getFixturesForGameweek(gameweek);

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
	}

	if (start.month === end.month) {
		return `${start.day}-${end.day} ${end.month} ${end.year}`;
	}

	if (start.year === end.year) {
		return `${start.day} ${start.month}-${end.day} ${end.month} ${end.year}`;
	}

	return `${start.day} ${start.month} ${start.year}-${end.day} ${end.month} ${end.year}`;
}
