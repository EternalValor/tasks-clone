<template>
  <div class="task-list">
    <transition-group name="task">
      <div
        class="task contain"
        :class="[task.id === editing ? 'task--focused' : '']"
        v-for="task in tasks"
        :key="task.id"
        @click="handleTaskClick(task.id)"
        @contextmenu.prevent="toggleContextMenu(task.id)"
      >
        <div class="task-mark" @click="$emit('completeTask', task.id)">
          <div class="task-mark-circle" />
          <Icon class="task-mark-check" name="check" />
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
            <Icon class="edit-task" name="pencil-outline" />
          </div>
        </div>
        <div
          v-if="contextMenu === task.id"
          class="task__context-menu-container"
          @click="handleContextMenuClick"
          @contextmenu.prevent="handleContextMenuClick"
        >
          <div class="task__context-menu">
            <div class="task__context-menu__option" data-type="delete" :data-id="task.id">Delete</div>
            <div class="task__context-menu__option">Move to another list</div>
          </div>
        </div>
      </div>
    </transition-group>
  </div>
</template>
<script>
import Icon from "./Icon";
import eb from "../eventBus";

export default {
  name: "TaskList",
  data: () => ({
    editing: -1,
    contextMenu: -1
  }),
  components: {
    Icon
  },
  props: {
    tasks: Array
  },
  computed: {},
  mounted() {
    eb.$on("add-task", this.handleAddTask);
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
      this.$nextTick(() => {
        this.editing = this.tasks[0].id;
        this.$refs[this.editing][0].focus();
      });
    },
    handleEnterKey(id) {
      this.editing = -1;
      this.$refs[id][0].blur();
    },
    toggleContextMenu(id) {
      this.contextMenu = id;
    },
    handleContextMenuClick(e) {
      if (e.srcElement.dataset.type === "delete")
        this.$emit("deleteTask", e.srcElement.dataset.id);
      e.stopPropagation();
      this.contextMenu = -1;
    }
  },
  destroyed() {
    eb.$off("add-task", this.handleAddTask);
  }
};
</script>
<style lang="scss">
.task-mark {
  margin-right: 3.2rem;
  width: 3rem;
  height: 100%;
  cursor: pointer;
}

.task-detail {
  font-size: 1.6rem;
  color: var(--gray);
}

.task-text {
  padding: 2rem 0;
  flex: 1;
}

.task-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding-right: 2.5rem;
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
</style>
<style lang="scss" scoped>
.task-mark {
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

.task__context-menu-container {
  position: absolute;
  left: 4rem;
  top: 50%;

  &::before {
    content: "";
    position: fixed;
    z-index: 19;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
  }
}

.task__context-menu {
  position: relative;
  z-index: 20;
  min-width: 27rem;
  background: var(--white);
  padding: 1.5rem 0;
  border-radius: 4px;
  box-shadow: 0 8px 10px 1px rgba(0, 0, 0, 0.14),
    0 3px 14px 2px rgba(0, 0, 0, 0.12), 0 5px 5px -3px rgba(0, 0, 0, 0.2);

  &__option {
    font-size: 2rem;
    padding: 1.25rem 2.4rem;
    cursor: pointer;

    &:hover {
      background-color: var(--gray-2);
    }
  }
}

.task-mark-check {
  fill: var(--blue);
  display: none;
}
</style>
