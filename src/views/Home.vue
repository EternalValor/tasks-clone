<template>
  <div class="home">
    <Header />
    <TaskList />
  </div>
</template>
<script>
import Header from '../components/Header';
import TaskList from '../components/TaskList';

export default {
  name: 'Home',
  components: {
    Header,
    TaskList
  }
};
</script>
<style lang="scss" scoped>
.home {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
}
</style>
