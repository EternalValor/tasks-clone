<template>
  <div class="task-list">
    <ListControls />
    <transition-group name="task">
      <Task
        v-for="task in tasks"
        :key="task.id"
        :task="task"
        :newest="task.id === tasks[0].id && task.title === ''"
      />
    </transition-group>
  </div>
</template>
<script>
import Task from './Task';
import ListControls from './ListControls';

export default {
  name: 'Tasks',
  props: {
    tasks: Array
  },
  components: {
    Task,
    ListControls
  }
};
</script>
