<div class="layout">
  <div class="layout__sidebar">
    <div class="sidebar">
      <slot name="sidebar" />
    </div>
  </div>
  <div class="layout__main">
    <slot name="main" />
  </div>
</div>

<style>
.layout {
  --columns: 6;
  --column-width: 60px;
  --gap: 60px;
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
  padding-top: 60px;
  padding-bottom: 60px;
  position: sticky;
  top: 0;
}

.layout__main {
  padding-top: 60px;
  grid-column: 2 / -1;
}
</style>
