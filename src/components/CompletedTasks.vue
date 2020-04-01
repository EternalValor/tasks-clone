<template>
  <div class="completed-list" :class="[open ? 'completed-list--open' : '']">
    <div class="completed-banner contain" @click="open = !open">
      <span>Completed ({{ completed.length }})</span>
      <Icon class="chevron" :name="open ? 'chevron-up' : 'chevron-down'" />
    </div>
    <div v-if="open">
      <Task
        v-for="task in completed"
        :key="task.id"
        :task="task"
        @deleteTask="$emit('deleteTask', task.id)"
      />
    </div>
  </div>
</template>
<script>
import Icon from "./Icon";
import Task from "./Task";

export default {
  name: "CompletedTasks",
  components: {
    Icon,
    Task
  },
  data: () => ({
    open: false
  }),
  props: {
    completed: Array
  }
};
</script>
<style lang="scss" scoped>
.completed-list {
  position: sticky;
  width: 100%;
  top: calc(100% - 7rem);
  background: var(--white);
  margin-top: 1.5rem;
  border-top: 1px solid var(--border-color);

  &--open {
    top: 0px;
  }
}

.completed-banner {
  height: 7rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;

  span {
    font-size: 2.1rem;
    color: var(--gray-2);
  }
}

.chevron {
  width: 3rem;
  height: 3rem;
  margin-right: 2.5rem;
  fill: var(--gray-2);
}

.completed-check {
  fill: var(--blue);
}
</style>
