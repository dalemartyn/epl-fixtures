<script lang="ts">
  import { onMount, tick } from 'svelte';
  import Layout from './lib/Layout.svelte';
  import Trophy from './lib/Trophy.svelte';
  import Navigation from './lib/Navigation.svelte';
  import Gameweek from './lib/Gameweek.svelte';

	import type { GameweekData } from './lib/types';

  let gameweeks: GameweekData[] = [];
  let currentGameweekElement: Element | null = null;

  onMount(async () => {
    // const res = await fetch(`https://bqeptisrxl.execute-api.eu-west-2.amazonaws.com/default/get-all-fixtures`);
		const res = await fetch(`/.netlify/functions/get-all-fixtures`);
    const data = await res.json();

    // Type assertion to tell TypeScript what the data is
    gameweeks = data as GameweekData[];

		await tick();

    currentGameweekElement = document.querySelector('[data-current-gameweek]');
    showCurrentGameweek('auto');
  });

  function showGameweek(gameweek: number) {
    const element = document.querySelector(`[data-gameweek="${gameweek}"]`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  function showCurrentGameweek(behavior: ScrollBehavior = 'auto') {
    if (currentGameweekElement) {
      currentGameweekElement.scrollIntoView({ behavior });
			console.log('current');
    } else {
			console.log('no current');
		}
  }
</script>

<Layout>
  <div slot="sidebar">
    <Trophy showCurrentGameweek={showCurrentGameweek} />
    <Navigation gameweeks={gameweeks} showGameweek={showGameweek} />
  </div>
  <div slot="main">
    {#if gameweeks.length}
      {#each gameweeks as gameweek}
        <Gameweek {...gameweek} />
      {/each}
    {/if}
  </div>
</Layout>

<style>
  :global(body) {
    font-family: 'IA Writer Mono', monospace;
    background: #000;
    color: #fff;
    font-size: 14px;
    margin: 0;
  }
</style>
