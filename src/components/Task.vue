<template>
  <div
    class="task contain"
    :class="[editing ? 'task--focused' : '']"
    @click="!task.completed && handleTaskClick(task.id)"
    @contextmenu.prevent="toggleContextMenu(task.id)"
  >
    <div
      class="task-mark"
      @click.stop="!task.completed && $store.dispatch('completeTask', task.id)"
    >
      <div v-if="!task.completed">
        <div class="task-mark-circle" />
        <Icon class="task-mark-check" name="check" />
      </div>
      <Icon v-else class="task-mark-check task-mark-check--show" name="check" />
    </div>
    <div class="content">
      <div class="content__text">
        <input
          v-if="!task.completed"
          class="title"
          v-model="task.title"
          :ref="`${task.id}`"
          @blur="handleBlur"
          @keydown.enter="handleEnterKey(task.id)"
        />
        <div v-else class="completed-title">{{ task.title }}</div>
        <div class="details">{{ task.details }}</div>
      </div>
      <div
        class="task-action-container"
        @click.stop="
          task.completed
            ? $store.dispatch('deleteTask', task.id)
            : $store.dispatch('toggleEditing', task.id)
        "
      >
        <Icon
          v-if="!task.completed"
          class="task-action"
          name="pencil-outline"
        />
        <Icon v-else class="task-action" name="trash-can-outline" />
      </div>
    </div>
    <div
      v-if="contextMenu && !task.completed"
      class="context-menu-container"
      @click="handleContextMenuClick"
      @contextmenu.prevent="handleContextMenuClick"
    >
      <div class="context-menu">
        <div class="context-menu__option" data-type="delete" :data-id="task.id">
          Delete
        </div>
        <div class="context-menu__option">Move to another list</div>
      </div>
    </div>
  </div>
</template>
<script>
import Icon from './Icon';
import { mapState } from 'vuex';

export default {
  name: 'Task',
  data: () => ({
    editing: false,
    contextMenu: false
  }),
  props: {
    task: Object,
    newest: Boolean
  },
  computed: mapState(['currentList']),
  components: {
    Icon
  },
  methods: {
    handleTaskClick() {
      this.editing = true;
      this.$refs[this.task.id].focus();
    },
    handleBlur() {
      this.editing = false;
    },
    handleEnterKey() {
      this.editing = false;
      this.$refs[this.task.id].blur();
    },
    toggleContextMenu() {
      this.contextMenu = !this.contextMenu;
    },
    handleContextMenuClick(e) {
      if (e.srcElement.dataset.type === 'delete')
        this.$store.dispatch('deleteTask', this.task.id);
      e.stopPropagation();
      this.contextMenu = false;
    }
  },
  mounted() {
    if (this.newest) {
      this.editing = true;
      this.$refs[this.task.id].focus();
    }
  }
};
</script>
<style lang="scss" scoped>
.task {
  position: relative;
  display: flex;
  align-items: center;
  transition: all 0.1s ease-in;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    height: 1px;
    background-color: var(--border-color);
    width: 100%;
  }

  &--focused {
    top: -2px;
    background-color: var(--gray-blue);

    &::after {
      left: 50%;
      height: 2px;
      transform: translateX(-50%);
      background-color: var(--blue);
      animation: taskFocus 0.2s ease-in forwards;
    }

    &:hover {
      box-shadow: none !important;

      &::after {
        display: block !important;
      }
    }
  }

  &:hover {
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.25);

    &::after {
      display: none;
    }

    & .task-action {
      display: block;
    }
  }

  &-enter,
  &-leave-to {
    opacity: 0;
    transform: translateY(-20px);
  }
  &-leave-active {
    position: absolute;
    width: 100%;
  }
}

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

  &--show {
    display: block;
  }
}

.content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding-right: 2.5rem;

  &__text {
    padding: 2rem 0;
    flex: 1;
  }
}

.title {
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

.completed-title {
  font-size: 2.1rem;
  line-height: 1.2;
  text-decoration: line-through;
}

.details {
  font-size: 1.6rem;
  color: var(--gray);
}

.task-action-container {
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

.task-action {
  display: none;
  fill: var(--gray);
  width: 3rem;
  height: 3rem;
}

.context-menu-container {
  position: absolute;
  left: 4rem;
  top: 50%;

  &::before {
    content: '';
    position: fixed;
    z-index: 19;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
  }
}

.context-menu {
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
      background-color: var(--gray-3);
    }
  }
}

@keyframes taskFocus {
  0% {
    width: 0%;
  }
  100% {
    width: 100%;
  }
}
</style>
