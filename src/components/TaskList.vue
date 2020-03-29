<template>
  <div class="task-list">
    <transition-group name="task">
      <div
        class="task contain"
        :class="[task.id === editing ? 'task--focused' : '']"
        v-for="task in tasks"
        :key="task.id"
        @click="handleTaskClick(task.id)"
      >
        <div class="task-mark">
          <div class="task-mark-circle" />
          <Icon className="task-mark-check" name="check" />
        </div>
        <div class="task-content">
          <div class="task-text">
            <input
              class="task-title"
              v-model="task.title"
              :ref="task.id"
              @blur="handleBlur"
              @keydown.enter="handleEnterKey(task.id)"
            />
            <div class="task-detail">{{ task.detail }}</div>
          </div>
          <div class="edit-task-container">
            <Icon className="edit-task" name="pencil-outline" />
          </div>
        </div>
      </div>
    </transition-group>
  </div>
</template>
<script>
import Icon from './Icon';
import eb from '../eventBus';

export default {
  name: 'TaskList',
  data: () => ({
    editing: -1
  }),
  components: {
    Icon
  },
  props: {
    tasks: Array
  },
  computed: {},
  mounted() {
    eb.$on('add-task', this.handleAddTask);
  },
  methods: {
    handleTaskClick(id) {
      this.editing = id;
      this.$refs[id] && this.$refs[id][0] && this.$refs[id][0].focus();
    },
    handleBlur() {
      this.editing = -1;
    },
    handleAddTask() {
      this.editing = this.tasks[0].id;
      this.$nextTick(() => {
        this.$refs[this.editing][0].focus();
      });
    },
    handleEnterKey(id) {
      this.editing = -1;
      this.$refs[id][0].blur();
    }
  },
  destroyed() {
    eb.$off('add-task', this.handleAddTask);
  }
};
</script>
<style lang="scss"></style>
<style lang="scss" scoped>
.task-mark {
  margin-right: 3.2rem;
  width: 3rem;
  height: 100%;
  cursor: pointer;

  &:hover .task-mark-circle {
    display: none;
  }

  &:hover .task-mark-check {
    display: block;
  }
}

.task-mark-circle {
  width: 3rem;
  height: 3rem;
  border: 2px solid var(--gray);
  border-radius: 50%;
}

.task-mark-check {
  fill: var(--blue);
  display: none;
}

.task-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding-right: 2.75rem;
}

.task-text {
  padding: 2rem 0;
  flex: 1;
}

.task-title {
  font-size: 2.1rem;
  font-weight: 500;
  line-height: 1.2;
  width: 100%;
  padding-right: 1rem;
  background: transparent;
  outline: none;
  border: none;
  cursor: default;

  &:focus {
    cursor: text;
  }
}

.task-detail {
  font-size: 1.6rem;
  color: var(--gray);
}

.edit-task-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  transition: 0.1s ease-in;
  cursor: pointer;

  &:active {
    background: rgba(124, 134, 139, 0.16);
  }
}

.edit-task {
  display: none;
  fill: var(--gray);
  width: 3rem;
  height: 3rem;
}

.list-complete-item {
  transition: all 1s;
}
</style>
