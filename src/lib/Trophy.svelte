<script lang="ts">
  export let showCurrentGameweek: (behavior: ScrollBehavior) => void;
</script>

<h1>
  <span class="visually-hidden">EPL Fixtures</span>
  <button on:click={() => showCurrentGameweek('smooth')} aria-label="Go to current gameweek">  <img src="/img/trophy.svg" alt="" class="trophy" />
  </button>
</h1>

<style>
h1 {
  margin: 0;
}

.trophy {
  display: block;
  margin-bottom: 20px;
}

button {
  appearance: none;
  border: none;
  background-color: transparent;
  padding: 0;
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