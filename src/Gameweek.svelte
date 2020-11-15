<script>
  export let gameweek;
  export let current_gameweek;
  export let matchdays;
</script>

<section data-gameweek={gameweek} data-current-gameweek={current_gameweek || null}>
  <h2>Gameweek {gameweek}</h2>
  {#each matchdays as {human_date, fixtures}}
    <table>
      <tr>
        <th colspan="5">{human_date}</th>
      </tr>
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
          <td class="fixture__time">{fixture.time}</td>
          <td class="fixture__broadcaster">{fixture.broadcaster||''}</td>
        </tr>
      {/each}
    </table>
  {/each}
</section>

<style>
  section {
    scroll-margin-top: 60px;
    margin-bottom: 80px;
  }

  h2 {
    font-size: inherit;
    font-weight: bold;
    margin: 0 0 20px;
  }

  table {
    border-collapse: collapse;
    margin-bottom: 10px;
    width: 100%;
  }

  td,
  th {
    padding: 1px 0 0;
  }

  th {
    text-align: left;
    font-weight: normal;
    color: rgba(255, 255, 255, .6);
  }

  .fixture__team {
    width: 27.5%;
  }

  .fixture__score {
    width: 20%;
    text-align: center;
  }

  .fixture__time {
    width: 10%;
  }

  .fixture__broadcaster {
    width: 15%;
  }
</style>
