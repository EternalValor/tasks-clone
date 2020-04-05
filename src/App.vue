<template>
  <div id="app">
    <Edit :class="[editing.list === null && 'edit--hidden']" />
    <Home />
    <Undo />
  </div>
</template>

<script>
import Home from './views/Home';
import Edit from './views/Edit';
import Undo from './components/Undo';
import { mapState } from 'vuex';

export default {
  name: 'App',
  components: {
    Home,
    Edit,
    Undo,
  },
  computed: mapState(['editing']),
};
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500&display=swap');
@import 'common';

:root {
  --black: #202124;
  --white: #ffffff;
  --gray: #5f6368;
  --gray-2: #80868b;
  --gray-3: #ccc;
  --gray-4: #e6e6e6;
  --blue: #4285f4;
  --gray-blue: #f1f3f4;
  --red: #d93025;
  --border-color: #e6e6e6;
  --box-shadow: 0 8px 10px 1px rgba(0, 0, 0, 0.14),
    0 3px 14px 2px rgba(0, 0, 0, 0.12), 0 5px 5px -3px rgba(0, 0, 0, 0.2);
}

#app {
  position: relative;
  background: var(--white);
  width: 64rem;
  height: 90vh;
  margin: 5vh auto;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  overflow-x: hidden;
  overflow-y: scroll;

  @media (max-width: 620px) {
    width: 100vw;
    height: 100vh;
    margin: 0;
    border-radius: 0px;
  }

  &::-webkit-scrollbar {
    width: 6px;
  }
  & {
    scrollbar-width: thin;
    scrollbar-color: var(--gray-3) transparent;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: var(--gray-3);
    border-radius: 60px;
  }
}

* {
  margin: 0;
  padding: 0;
}

*,
*::before,
*::after {
  box-sizing: inherit;
}

html {
  box-sizing: border-box;
  font-size: 50%;
  color: var(--black);

  @media (max-width: 620px) {
    font-size: 41.66%;
  }
}

body {
  font-family: 'Roboto', sans-serif;
  font-display: auto;
  font-weight: 400;
  line-height: 1.6;
  background: #dadada;
}
</style>
