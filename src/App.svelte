<script>
  import { onMount, tick } from 'svelte';
  import Layout from './Layout.svelte';
  import Navigation from './Navigation.svelte';
  import Gameweek from './Gameweek.svelte';

  let gameweeks = [];

  onMount(async () => {
    const res = await fetch(`/.netlify/functions/get-all-fixtures`);
    gameweeks = await res.json();
    await tick();
    showCurrentGameweek();
  });

  function showGameweek(gameweek) {
    const element = document.querySelector(`[data-gameweek="${gameweek}"]`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  function showCurrentGameweek() {
    const element = document.querySelector('[data-current-gameweek]');
    if (element) {
      element.scrollIntoView({ behavior: 'auto' });
    }
  }
</script>

<Layout><div slot="sidebar">
    <Navigation {gameweeks} {showGameweek} />
  </div><div slot="main">
    {#if gameweeks.length}
      {#each gameweeks as {gameweek, matchdays, current_gameweek}}
        <Gameweek {gameweek} {matchdays} {current_gameweek} />
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
