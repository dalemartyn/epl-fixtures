export default function getGameweek(): Promise<string> {
  return fetch("https://draft.premierleague.com/api/game")
    .then((res) => res.json())
    .then((json) => {
			if (json.current_event_finished) {
				return json.next_event;
			}

			return json.current_event;
    });
}
