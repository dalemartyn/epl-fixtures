<script>
  import { onMount, tick } from 'svelte';
  import Layout from './Layout.svelte';
  import Trophy from './Trophy.svelte';
  import Navigation from './Navigation.svelte';
  import Gameweek from './Gameweek.svelte';

  let gameweeks = [];

  onMount(async () => {
    const res = await fetch(`https://bqeptisrxl.execute-api.eu-west-2.amazonaws.com/default/get-all-fixtures`);
    // const res = await fetch(`/.netlify/functions/get-all-fixtures`);
    gameweeks = await res.json();
    await tick();
    showCurrentGameweek('auto');
  });

  function showGameweek(gameweek) {
    const element = document.querySelector(`[data-gameweek="${gameweek}"]`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  function showCurrentGameweek(behavior) {
    const element = document.querySelector('[data-current-gameweek]');
    if (element) {
      element.scrollIntoView({ behavior });
    }
  }
</script>

<Layout><div slot="sidebar">
    <Trophy {showCurrentGameweek} />
    <Navigation {gameweeks} {showGameweek} />
  </div><div slot="main">
    {#if gameweeks.length}
      {#each gameweeks as gameweek}
        <Gameweek {...gameweek} />
      {/each}
    {/if}
  </div></Layout>

<style>
:global(body) {
  font-family: 'IA Writer Mono', monospace;
  background: #000;
  color: #fff;
  font-size: 14px;
  margin: 0;
}
</style>
