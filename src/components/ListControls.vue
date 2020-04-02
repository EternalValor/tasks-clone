<template>
  <div class="list-controls contain">
    <div role="button" class="add-button" @click="handleAdd">
      <span>+</span> Add a Task
    </div>
    <div class="menu">
      <Icon class="icon" name="dots-vertical" />
    </div>
  </div>
</template>
<script>
import Icon from './Icon';

export default {
  name: 'ListControls',
  components: {
    Icon
  },
  methods: {
    handleAdd() {
      this.$store.dispatch('addTask');
    }
  }
};
</script>
<style lang="scss" scoped>
.icon {
  height: 3rem;
  width: 3rem;
}
.list-controls {
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
}
</style>
