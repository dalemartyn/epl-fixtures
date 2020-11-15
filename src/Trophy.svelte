<script>
  export let showCurrentGameweek;
</script>

<h1>
  <span class="visually-hidden">EPL Fixtures</span>
  <img src="/img/trophy.svg" alt="" class="trophy" on:click={() => showCurrentGameweek('smooth')} />
</h1>

<style>
h1 {
  margin: 0;
}

.trophy {
  display: block;
  margin-bottom: 20px;
  cursor: pointer;
}

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
</style>
