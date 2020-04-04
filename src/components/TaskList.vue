<template>
  <div class="task-list">
    <Tasks :tasks="todo" />
    <CompletedTasks :completed="completed" />
  </div>
</template>
<script>
import Tasks from './Tasks';
import CompletedTasks from './CompletedTasks';
import { mapGetters } from 'vuex';
export default {
  name: 'TaskList',
  components: {
    Tasks,
    CompletedTasks
  },
  computed: mapGetters(['todo', 'completed'])
};
</script>
<style lang="scss" scoped>
.task-list {
  flex: 1;
}
</style>
