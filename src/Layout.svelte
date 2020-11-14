<div class="layout">
  <div class="layout__sidebar">
    <div class="sidebar">
      <h1>
        <span class="visually-hidden">EPL Fixtures</span>
        <img src="/img/trophy.svg" alt="" class="trophy" />
      </h1>
      <slot name="sidebar" />
    </div>
  </div>
  <div class="layout__main">
    <slot name="main" />
  </div>
</div>

<style>
.layout {
  --columns: 4;
  --column-width: 120px;
  --gap: 20px;
  max-width: calc(var(--columns) * var(--column-width) + (var(--columns) - 1) * var(--gap));
  margin-left: auto;
  margin-right: auto;
  display: grid;
  grid-template-columns: repeat(var(--columns), var(--column-width));
  gap: var(--gap);
  padding-left: 20px;
  padding-right: 20px;
}

.sidebar {
  padding-top: 20px;
  padding-bottom: 20px;
  position: sticky;
  top: 0;
}

.layout__main {
  padding-top: 20px;
  padding-bottom: 20px;
  grid-column: 2 / -1;
}

.trophy {
  display: block;
  margin-bottom: 20px;
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
