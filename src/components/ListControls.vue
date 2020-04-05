<template>
  <div class="list-controls contain">
    <div role="button" class="add-button" @click="handleAdd">
      <span>+</span> Add a Task
    </div>
    <div
      class="menu"
      :class="[dropDownOpen && 'menu--open']"
      @click="dropDownOpen = !dropDownOpen"
    >
      <Icon class="icon" name="dots-vertical" />
      <div class="drop-down" :class="[dropDownOpen && 'drop-down--open']">
        <div
          class="drop-down__item"
          :class="[lists.length === 1 && 'drop-down__item--disabled']"
          @click="$store.dispatch('deleteCurrentList')"
        >
          Delete list
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Icon from './Icon';
import { mapGetters } from 'vuex';

export default {
  name: 'ListControls',
  data: () => ({
    dropDownOpen: false,
  }),
  computed: mapGetters(['lists']),
  components: {
    Icon,
  },
  methods: {
    handleAdd() {
      this.$store.dispatch('addTask');
    },
  },
};
</script>
<style lang="scss" scoped>
.icon {
  height: 3rem;
  width: 3rem;
}
.list-controls {
  position: relative;
  display: flex;
  justify-content: space-between;
  padding-top: 1.25rem;
  padding-bottom: 1.25rem;
}

.add-button {
  position: relative;
  left: -1.5rem;
  font-size: 2.1rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  color: var(--gray);
  border-radius: 1000px;
  width: 85%;
  cursor: pointer;

  &:hover {
    background-color: var(--gray-blue);
  }

  span {
    font-size: 3.6rem;
    font-weight: 300;
    color: var(--blue);
    margin: 0 1.5rem;
  }
}

.menu {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 7rem;
  height: 7rem;
  border-radius: 50%;
  transition: 0.075s ease-in;
  cursor: pointer;

  &:hover {
    background: rgba(124, 134, 139, 0.06);
  }

  &:active {
    background-color: rgba(124, 134, 139, 0.16);
  }

  &::after {
    content: '';
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: -2;
    cursor: default;
  }

  &--open {
    &::after {
      display: block;
      z-index: 7;
    }
  }
}

.drop-down {
  width: 90%;
  padding: 1.25rem 0;
  position: absolute;
  z-index: -2;
  top: -1rem;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 8px;
  background: var(--white);
  box-shadow: var(--box-shadow);
  font-size: 2.1rem;
  opacity: 0;
  transition: all 0.1s ease-in;

  &--open {
    z-index: 10;
    top: 1rem;
    opacity: 1;
    transition: all 0.1s ease-out;

    &::after {
      z-index: 9;
    }
  }

  &__item {
    padding: 1rem 1.75rem;
    cursor: pointer;

    &:hover {
      background-color: var(--gray-4);
    }

    &:active {
      background-color: var(--gray-3);
    }

    &--disabled {
      color: var(--gray-2);
      cursor: default;

      &:hover {
        background-color: var(--white);
      }

      &:active {
        background-color: var(--white);
      }
    }
  }
}
</style>
