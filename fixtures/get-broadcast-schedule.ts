interface BroadcastSchedule {
  [fixtureCode: string]: string;
}

interface BroadcastApiData {
	content: Array<{ fixture: { altIds: { opta: string } };
	broadcasters: Array<{ abbreviation: string }> }>
}

export default function getBroadcastSchedule(startDate: string, endDate: string): Promise<BroadcastSchedule> {
  return fetch(getFixturesUrl(startDate, endDate), {
    headers: {
      origin: "https://www.premierleague.com",
    },
  })
    .then((res) => res.json())
    .then(({ content: items }: BroadcastApiData) => {
      const schedule: BroadcastSchedule = {};

			items.forEach((item) => {
        const fixtureCode = item.fixture.altIds.opta.replace('g', '');
        const broadcaster = item.broadcasters[0].abbreviation;
        schedule[fixtureCode] = broadcaster;
      });

      return schedule;
    });
}

function getFixturesUrl(startDate: string, endDate: string): string {
  const baseUrl = `https://footballapi.pulselive.com/football/broadcasting-schedule/fixtures`;
  const path = `?comps=1&pageSize=100&page=0&altIds=true&startDate=${startDate}&endDate=${endDate}`;
  return baseUrl + path;
}
