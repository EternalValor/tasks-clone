<template>
  <div class="edit-form contain">
    <div class="input-container" data-input="titleInput">
      <input
        class="input"
        type="text"
        name="title"
        v-model="editingTask.title"
        placeholder="Enter title"
        ref="titleInput"
        @change="handleChange"
        @focus="handleInputToggle"
        @blur="handleInputToggle"
      />
    </div>
    <div class="input-container" data-input="detailsInput">
      <textarea
        class="input input--textarea"
        rows="4"
        type="textarea"
        name="details"
        v-model="editingTask.details"
        placeholder="Add details"
        @change="handleChange"
        @focus="handleInputToggle"
        @blur="handleInputToggle"
      />
    </div>
    <div class="change-list-input-container">
      <Icon className="icon" name="format-list-bulleted" />
      <div class="change-list-input">
        <div class="input change-list-input__current" @click="toggleListMenu">
          {{ editing.list }}
          <Icon className="menu-down" name="menu-down" />
        </div>
        <div
          class="change-list-input__menu"
          :class="[listMenuOpen && 'change-list-input__menu--open']"
          @click="toggleListMenu"
        >
          <div
            v-for="list in Object.keys(lists)"
            :key="list"
            class="change-list-input__menu-item"
            @click="$store.dispatch('moveTask', { newList: list, ...editing })"
          >
            <Icon
              v-if="list === editing.list"
              className="icon icon--item"
              name="check"
            />{{ list }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters } from 'vuex';
import Icon from './Icon';

export default {
  name: 'EditForm',
  data: () => ({
    listMenuOpen: false,
  }),
  components: {
    Icon,
  },
  computed: {
    ...mapState(['lists', 'editing']),
    ...mapGetters(['editingTask']),
  },
  methods: {
    handleInputToggle(e) {
      e.srcElement.parentElement.classList.toggle('input-container--focused');
    },
    handleChange(e) {
      this.$store.dispatch('editTask', {
        name: e.target.name,
        value: this.editingTask[e.target.name],
        ...this.editing,
      });
    },
    toggleListMenu() {
      this.listMenuOpen = !this.listMenuOpen;
    },
  },
  watch: {
    editing: function (val) {
      if (val.list !== null) {
        setTimeout(() => this.$refs.titleInput.focus(), 400);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.edit-form {
  padding-top: 2.4rem;
  position: relative;
}

.input-container {
  position: relative;
  margin-bottom: 1.4rem;
  width: 100%;

  &::after {
    content: '';
    display: block;
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 0%;
    height: 2px;
    background: var(--blue);
    transition: width 0.15s ease-in;
  }

  &--focused {
    &::after {
      width: 100%;
    }
  }
}

.input {
  font-size: 2.1rem;
  font-weight: 500;
  width: 100%;
  padding: 1.8rem 1.2rem 1.2rem;
  outline: none;
  border: none;
  background: var(--gray-blue);

  &--textarea {
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    resize: none;
    &::-webkit-scrollbar {
      display: none;
    }
  }
}

.change-list-input-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.icon {
  fill: var(--gray);
  width: 3rem;
  height: 3rem;

  &--item {
    position: absolute;
    left: 2rem;
  }
}

.menu-down {
  fill: var(--black);
  width: 4rem;
  height: 4rem;
}

.change-list-input {
  position: relative;
  width: calc(100% - 6rem);

  &__current {
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;

    &:active {
      background-color: var(--gray-3);
    }
  }

  &__menu {
    position: absolute;
    z-index: -1;
    top: 0;
    width: 100%;
    background: var(--white);
    font-size: 2.1rem;
    opacity: 0;
    box-shadow: var(--box-shadow);
    border-radius: 8px;
    overflow: hidden;
    transition: opacity 0.1s ease-in;

    &--open {
      z-index: 155;
      opacity: 1;

      &::after {
        content: '';
        position: fixed;
        display: block;
        width: 100vw;
        height: 100vh;
        left: 0;
        top: 0;
        z-index: 153;
      }
    }
  }

  &__menu-item {
    position: relative;
    z-index: 154;
    display: flex;
    align-items: center;
    padding: 1.8rem 1.2rem;
    padding-left: 7rem;
    transition: all 0.05s ease-in-out;
    cursor: pointer;

    &:hover {
      background-color: var(--gray-3);
    }

    &:active {
      background-color: var(--gray-2);
    }
  }
}
</style>
