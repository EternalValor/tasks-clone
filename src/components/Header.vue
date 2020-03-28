<template>
  <div class="header contain">
    <h2 class="header__title">TASKS</h2>
    <div class="header__drop-down" @click="toggleDropDown">
      <div class="header__select-container">
        <div class="header__select">
          <span class="header__drop-down__selected">{{ currentList }}</span>
          <span class="filled-arrow-down"></span>
        </div>
      </div>
      <div
        :class="[
          'header__drop-down__list',
          dropDownOpen ? 'header__drop-down__list--open' : ''
        ]"
      >
        <div
          class="header__drop-down__list-item"
          v-for="list in lists"
          :key="list"
          @click="() => (currentList = list)"
        >
          <span>{{ list }}</span>
        </div>
        <div class="header__drop-down__list-item">
          <span>Create new list</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Home',
  data: () => ({
    lists: ['My Tasks', 'Your Tasks'],
    currentList: '',
    dropDownOpen: false
  }),
  created() {
    if (this.lists[0]) this.currentList = this.lists[0];
    else this.currentList = 'My Tasks';
  },
  methods: {
    toggleDropDown() {
      this.dropDownOpen = !this.dropDownOpen;
    }
  }
};
</script>
<style lang="scss" scoped>
.header {
  border-bottom: 1px solid var(--border-color);
  padding-top: 1.1rem;

  &__title {
    color: var(--gray-2);
    font-size: 1.5rem;
    font-weight: 500;
    margin-bottom: 0.3rem;
  }

  &__select-container {
    display: inline-block;
    cursor: pointer;
  }

  &__select {
    display: flex;
    align-items: center;
  }

  &__drop-down {
    position: relative;
    font-size: 2.4rem;
    font-weight: 500;
    color: var(--gray);
    padding-bottom: 1.75rem;

    &__selected {
      margin-right: 0.8rem;
    }

    &__list {
      position: absolute;
      top: 50%;
      visibility: hidden;
      opacity: 0;
      left: -2.8rem;
      min-width: 30rem;
      background: var(--white);
      box-shadow: 0 8px 10px 1px rgba(0, 0, 0, 0.14),
        0 3px 14px 2px rgba(0, 0, 0, 0.12), 0 5px 5px -3px rgba(0, 0, 0, 0.2);
      border-radius: 5px;

      &--open {
        visibility: visible;
        opacity: 1;
        top: 100%;
        transition: 0.1s ease-in-out;
      }
    }

    &__list-item {
      padding: 0.75rem 0;
      border-bottom: 1px solid var(--border-color);
      font-weight: 300;
      font-size: 2rem;
      cursor: pointer;

      span {
        display: block;
        padding: 0.75rem 2.8rem;

        &:hover {
          background-color: #f0f0f0;
        }
      }
    }
  }
}
</style>
