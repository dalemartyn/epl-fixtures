<script>
  import { onMount } from 'svelte';

  let fixtures = [];

  onMount(async () => {
    const res = await fetch(`/.netlify/functions/get-fixtures`);
    fixtures = await res.json();
    console.log(fixtures);
  });
</script>

<div class="photos">
  {#each fixtures as fixture}
    <div>
      <span>{fixture.team_h.name}</span>
      v
      <span>{fixture.team_a.name}</span>

      {#if fixture.broadcaster}
        <span>{fixture.broadcaster}</span>
      {/if}
    </div>
  {:else}
    <p>loading...</p>
  {/each}
</div>

<style>

</style>
