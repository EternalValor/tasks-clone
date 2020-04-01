<template>
  <div class="task-list">
    <Tasks
      :tasks="todo"
      @completeTask="completeTask"
      @deleteTask="deleteTask"
      @addTask="$emit('addTask')"
    />
    <CompletedTasks :completed="completed" @deleteTask="deleteTask" />
  </div>
</template>
<script>
import Tasks from "./Tasks";
import CompletedTasks from "./CompletedTasks";
export default {
  name: "TaskList",
  components: {
    Tasks,
    CompletedTasks
  },
  props: {
    todo: Array,
    completed: Array
  },
  methods: {
    completeTask(id) {
      this.$emit("completeTask", id);
    },
    deleteTask(id) {
      this.$emit("deleteTask", id);
    }
  }
};
</script>
<style lang="scss" scoped>
.task-list {
  flex: 1;
}
</style>