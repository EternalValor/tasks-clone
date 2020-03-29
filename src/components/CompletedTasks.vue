<template>
  <div class="completed-list" :class="[open ? 'completed-list--open' : '']">
    <div class="completed-banner contain" @click="open = !open">
      <span>Completed ({{ completed.length }})</span>
      <Icon class="chevron" :name="open ? 'chevron-up' : 'chevron-down'" />
    </div>
    <div v-if="open">
      <div v-for="task in completed" :key="task.id" class="task contain">
        <div class="task-mark" @click="$emit('removeTask', task.id)">
          <div class="task-mark-circle" />
          <Icon class="completed-check" name="check" />
        </div>
        <div class="task-content">
          <div class="task-text">
            <div class="completed-title">{{ task.title }}</div>
            <div class="task-detail">{{ task.detail }}</div>
          </div>
          <div class="edit-task-container">
            <Icon class="edit-task" name="trash-can-outline" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Icon from "./Icon";

export default {
  name: "CompletedTasks",
  components: {
    Icon
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

.completed-title {
  font-size: 2.1rem;
  line-height: 1.2;
  text-decoration: line-through;
}
</style>
