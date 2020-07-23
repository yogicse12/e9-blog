<template>
  <main class="container mt-4" role="main">
    <slot/>
    <div class="footer">
      <p class="brand-secondary">
        Built with
        <a class="link" href="//gridsome.org" target="_blank">Gridsome</a>
        & Made with ❤️ by
        <a class="link" href="//e9ine.com" target="_blank">e9ine</a>
      </p>
    </div>
  </main>
</template>

<style>
body {
  font-family: Lora,-apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif;
  margin: 0;
  padding: 0;
  line-height: 1.5;
  min-height: 100vh;
  background: #f4f8fb;
}

.footer {
  padding-top: calc(30em / 4);
  text-align: center;
  font-size: 1em;
}
</style>
