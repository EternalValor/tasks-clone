<template>
  <div id="app">
    <Header />
  </div>
</template>

<script>
import Header from './components/Header';
export default {
  name: 'App',
  components: {
    Header
  }
};
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Roboto:400,500&display=swap');
@import 'common';

:root {
  --black: #202124;
  --white: #ffffff;
  --gray: #5f6368;
  --gray-2: #80868b;
  --border-color: #f1f3f4;
}

#app {
  position: relative;
  background: var(--white);
  width: 640px;
  height: 90vh;
  margin: 5vh auto;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  overflow: hidden;

  @media (max-width: 670px) {
    width: 100vw;
    height: 100vh;
    margin: 0;
    border-radius: 0px;
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
  font-size: 62.5%;
  color: var(--black);
}

body {
  font-family: 'Roboto', sans-serif;
  font-display: auto;
  font-weight: 400;
  line-height: 1.6;
  background: #dadada;
}
</style>
