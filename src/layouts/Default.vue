<template>
  <main class="container mt-4" role="main">
    <slot/>
    <div class="footer">
      <p class="brand-secondary">
        Made with ❤️ &nbsp; by
        <a class="link" href="//e9ine.com" target="_blank" rel="noopener">e9ine</a>
      </p>
    </div>
  </main>
</template>

<style>
body {
  font-family: Muli,-apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif;
  margin: 0;
  padding: 0;
  line-height: 1.5;
  min-height: 100vh;
}

.footer {
  padding-top: calc(30em / 4);
  text-align: center;
  font-size: 1em;
}
</style>
