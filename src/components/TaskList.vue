<template>
  <div class="task-list">
    <Tasks :tasks="todo" />
    <CompletedTasks :completed="completed" />
  </div>
</template>
<script>
import Tasks from './Tasks';
import CompletedTasks from './CompletedTasks';
export default {
  name: 'TaskList',
  components: {
    Tasks,
    CompletedTasks
  },
  props: {
    todo: Array,
    completed: Array
  }
};
</script>
<style lang="scss" scoped>
.task-list {
  flex: 1;
}
</style>
