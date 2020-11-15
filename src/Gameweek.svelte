<script>
  export let gameweek;
  export let date;
  export let current_gameweek;
  export let matchdays;
</script>

<section data-gameweek={gameweek} data-current-gameweek={current_gameweek || null}>
  <h2>
    Gameweek {gameweek}
    <span class="date">{date}</span>
  </h2>
  <table>
    {#each matchdays as {weekday, fixtures}}
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
          <td class="fixture__time">{weekday} {fixture.time}</td>
          <td class="fixture__broadcaster">
            {#if fixture.finished}
              <a href="https://www.youtube.com/watch?v={fixture.youtube}" target="_blank">Highlights</a>
            {:else}
              {fixture.broadcaster||''}
            {/if}
          </td>
        </tr>
      {/each}
    {/each}
  </table>
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
    width: 100%;
  }

  td,
  th {
    padding: 1px 0 0;
  }

  th {
    text-align: left;
    text-transform: uppercase;
    font-weight: normal;
    color: rgba(255, 255, 255, .6);
  }

  .fixture__team {
    width: 25%;
  }

  .fixture__score {
    width: 15%;
    text-align: center;
  }

  .fixture__time {
    width: 17.5%;
  }

  .fixture__broadcaster {
    width: 17.5%;
  }
  
  a {
    color: inherit;
  }

  .date {
    font-weight: normal;
  }
</style>
