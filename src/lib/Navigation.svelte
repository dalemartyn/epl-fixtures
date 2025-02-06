<script>
  export let gameweeks;
  export let showGameweek;

  function formatNumber(n) {
    return n < 10 ? `0${n}` : n;
  }
</script>

{#if gameweeks}
<div class="gameweeks">
  {#each gameweeks as {gameweek}}
    <button on:click={() => showGameweek(gameweek)}>
      {formatNumber(gameweek)}
    </button>
  {/each}
</div>
{/if}

<style>
.gameweeks {
  display: grid;
  grid-template-columns: repeat(2, 25px);
  grid-auto-flow: dense;
  gap: 5px;
  margin-inline-end: auto; /* Use logical property */
}

button {
  appearance: none;
  padding: 1px 2px;
  margin: 0;
  border: none;
  background: none;
  color: inherit;
  font-family: inherit;
  font-size: inherit;
  cursor: pointer;
  font-weight: bold;
}

button:nth-child(odd) {
  grid-column: 2;
}
</style>
