<script>
  import { onMount } from 'svelte';

  let fixtures = [];

  let gameweeks = Array(38).fill(null).map((_, i) => i + 1);

  onMount(async () => {
    const res = await fetch(`/.netlify/functions/get-fixtures`);
    fixtures = await res.json();
  });

  function time(fixture) {
    return new Date(fixture.kickoff_time).toLocaleTimeString('en-GB', { timeStyle: 'short' });
  }

  async function showGameweek(gameweek) {
    const res = await fetch('/.netlify/functions/get-fixtures', {
      'method': 'POST',
      'headers': {
        'Content-Type': 'application/json'
      },
      'body': JSON.stringify({
        'gameweek': gameweek
      })
    });
    fixtures = await res.json();
  }

  function formatNumber(n) {
    return n < 10 ? `0${n}` : n;
  }
</script>

{#if fixtures.length}
  <table>
    {#each fixtures as fixture}
      <tr>
        <td>{fixture.team_h.name}</td>
        <td>v</td>
        <td>{fixture.team_a.name}</td>
        <td>{time(fixture)}</td>
        
        {#if fixture.broadcaster}
          <td>{fixture.broadcaster}</td>
        {/if}
    </tr>
    {/each}
  </table>

  {#each gameweeks as gameweek}
    <button on:click={() => showGameweek(gameweek)}>{formatNumber(gameweek)}</button>
  {/each}
{/if}

<style>
:global(body) {
  background: #000;
  color: #fff;
  font-family: monospace;
}
</style>
