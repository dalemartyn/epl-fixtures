<script>
  export let gameweek;
  export let current_gameweek;
  export let fixtures;

  function time(fixture) {
    return new Date(fixture.kickoff_time).toLocaleTimeString('en-GB', { timeStyle: 'short' });
  }
</script>

<section data-gameweek={gameweek} data-current-gameweek={current_gameweek || null}>
  <h2>Gameweek {gameweek}</h2>
  <table>
    {#each fixtures as fixture}
      <tr>
        <td class="fixture__team">{fixture.team_h.name}</td>
        <td class="fixture__score">
          {#if fixture.finished}
            {fixture.team_h.score}-{fixture.team_a.score}
          {:else}
            v
          {/if}
        </td>
        <td class="fixture__team">{fixture.team_a.name}</td>
        <td class="fixture__time">{time(fixture)}</td>
        <td class="fixture__broadcaster">{fixture.broadcaster||''}</td>
      </tr>
    {/each}
  </table>
</section>

<style>
  section {
    scroll-margin-top: 20px;
  }

  h2 {
    font-size: inherit;
    font-weight: inherit;
    margin: 0;
  }

  table {
    border-collapse: collapse;
    margin-bottom: 20px;
    width: 100%;
  }

  td {
    padding: 0;
  }

  .fixture__team {
    width: 32.5%;
  }

  .fixture__score {
    width: 10%;
    text-align: center;
  }

  .fixture__time {
    width: 12.5%;
  }

  .fixture__broadcaster {
    width: 12.5%;
  }
</style>
