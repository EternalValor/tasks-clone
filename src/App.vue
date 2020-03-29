<template>
  <div id="app">
    <Header />
    <ListControls @add-task="addTask" />
    <TaskList :tasks="tasks" />
  </div>
</template>

<script>
import Header from './components/Header';
import ListControls from './components/ListControls';
import TaskList from './components/TaskList';

export default {
  name: 'App',
  data: () => ({
    count: 0,
    tasks: []
  }),
  components: {
    Header,
    ListControls,
    TaskList
  },
  methods: {
    addTask() {
      this.count = this.count + 1;
      return this.tasks.unshift({ id: this.count + 1, title: '', details: '' });
    }
  }
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
  --blue: #4285f4;
  --gray-blue: #f1f3f4;
  --border-color: #f1f3f4;
}

#app {
  position: relative;
  background: var(--white);
  width: 64rem;
  height: 90vh;
  margin: 5vh auto;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  overflow: hidden;

  @media (max-width: 620px) {
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
