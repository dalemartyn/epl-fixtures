export default function getGameweek(): Promise<string> {
  return fetch("https://draft.premierleague.com/api/game")
    .then((res) => res.json())
    .then((json) => {
      return json.next_event;
    });
}