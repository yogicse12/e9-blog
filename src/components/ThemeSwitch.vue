<template>
  <button id="themeSwitch" @click="toggleTheme()" aria-label="Switch theme between light and dark">
    <transition name="theme">
      <moon-icon v-if="theme == 'bright'" class="moon" />
    </transition>
    <transition name="theme">
      <sun-icon v-if="theme == 'dark'" class="sun" />
    </transition>
  </button>
</template>

<script>
import { MoonIcon, SunIcon } from 'vue-feather-icons'

export default {
  components: {
    MoonIcon,
    SunIcon
  },
  data() {
    return {
      theme: ''
    }
  },
  methods: {
    setTheme: function() {
      let self = this
      const body = document.querySelector('body');
      const theme = localStorage.getItem('theme')
      if (theme === null || theme === 'bright') {
        localStorage.setItem('theme', 'bright')
        self.theme = 'bright'
      } else {
        body.setAttribute('data-theme', 'dark');
        self.theme = theme;
      }
    },
    toggleTheme: function() {
      debugger
      let self = this
      const body = document.querySelector('body')
      if (body.getAttribute('data-theme') === 'dark') {
        localStorage.setItem('theme', 'bright');
        body.setAttribute('data-theme', null);
        self.theme = 'bright';
      } else {
        localStorage.setItem('theme', 'dark');
        body.setAttribute('data-theme', 'dark');
        body.classList.add('dark')
        self.theme = 'dark'
      }
    }
  },
  mounted () {
    this.setTheme()
  }
}
</script>

<style lang="scss" scoped>
button {
  background: none;
  border: 0;
  padding: 0;
  transition: color .15s ease-in-out;
  cursor: pointer;
  width: 48px;
  height: 48px;
  position: relative;

  &:focus {
    outline: none;
  }
  color: var(--font-color);
}

svg {
  position: absolute;
  top: 12px;
  left: 12px;
}

.theme-enter-active, .theme-leave-active {
  transition: transform .25s ease-in-out, opacity .25s ease-in-out;
}
.theme-enter, .theme-leave-to /* .fade-leave-active below version 2.1.8 */ {
  transform: translateY(20px) scale(.5);
  opacity: 0;
}
</style>


