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
          dropDownOpen ? 'header__drop-down__list--open' : '',
        ]"
      >
        <div
          class="header__drop-down__list-item"
          v-for="list in lists"
          :key="list"
          @click="$store.dispatch('changeList', list)"
        >
          <span>{{ list }}</span>
          <Icon
            v-if="list === currentList"
            className="list-check"
            name="check"
          />
        </div>
        <div class="header__drop-down__list-item" @click="toggleModal">
          <span>Create new list</span>
        </div>
      </div>
    </div>
    <div v-if="modalOpen" class="modal-container">
      <div class="modal-background" @click="toggleModal"></div>
      <div class="modal">
        <h4 class="modal__title">Create new list</h4>
        <div
          class="modal__input-container"
          :class="[modalInputFocused && 'modal__input-container--focused']"
        >
          <input
            type="text"
            class="modal__input"
            placeholder="Enter name"
            v-model="newListName"
            ref="modalInput"
            @focus="modalInputFocused = true"
            @blur="modalInputFocused = false"
            @keydown.enter="createList"
          />
        </div>
        <span v-if="errored" class="modal__error-message"
          >* List already exists</span
        >
        <div class="modal__buttons">
          <div class="modal__button" role="button" @click="toggleModal">
            Cancel
          </div>
          <div
            class="modal__button modal__button--blue"
            role="button"
            @click="createList"
          >
            Save
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Icon from './Icon';
import { mapState, mapGetters } from 'vuex';

export default {
  name: 'Home',
  components: {
    Icon,
  },
  data: () => ({
    dropDownOpen: false,
    modalInputFocused: false,
    newListName: '',
    modalOpen: false,
    errored: false,
  }),
  computed: {
    ...mapState(['currentList']),
    ...mapGetters(['lists']),
  },
  methods: {
    toggleDropDown() {
      this.dropDownOpen = !this.dropDownOpen;
    },
    toggleModal() {
      this.modalOpen = !this.modalOpen;
      this.$nextTick(() => {
        if (this.modalOpen) this.$refs.modalInput.focus();
      });
    },
    createList() {
      if (this.lists.indexOf(this.newListName) !== -1) {
        this.errored = true;
      } else {
        this.$store.dispatch('addList', this.newListName);
        this.$store.dispatch('changeList', this.newListName);
        this.modalOpen = false;
        this.newListName = '';
        this.errored = false;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.list-check {
  fill: var(--gray-2);
}

.header {
  border-bottom: 1px solid var(--border-color);
  padding-top: 1.1rem;

  @media (max-width: 620px) {
    padding-top: 2.5rem;
  }

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
      z-index: 10;
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
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.75rem 2.8rem;
      border-bottom: 1px solid var(--border-color);
      font-weight: 400;
      font-size: 2rem;
      cursor: pointer;

      &:hover {
        background-color: #f0f0f0;
      }

      span {
        display: block;
        padding: 0.75rem 0;
      }
    }
  }
}

.modal-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-background {
  position: absolute;
  z-index: 99;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.45);
  animation: fade-in 0.1s ease-out forwards;
}

.modal {
  position: relative;
  z-index: 100;
  width: 80%;
  padding: 3.6rem 3rem 2.4rem 3rem;
  background: var(--white);
  border-radius: 8px;
  font-size: 2rem;
  animation: zoom-in 0.2s ease-out forwards;

  &__title {
    font-weight: 500;
    margin-bottom: 1.8rem;
  }

  &__input-container {
    position: relative;
    margin-bottom: 1.4rem;

    &::before {
      content: '';
      display: block;
      position: absolute;
      bottom: -1px;
      width: 100%;
      height: 1px;
      background-color: var(--gray-2);
    }

    &::after {
      content: '';
      display: block;
      position: absolute;
      bottom: -1px;
      left: 50%;
      transform: translateX(-50%);
      width: 0%;
      height: 2px;
      background-color: var(--gray-2);
      transition: width 0.1s ease-in-out;
    }

    &--focused {
      &::after {
        content: '';
        width: 100%;
        background-color: var(--blue);
      }
    }
  }

  &__input {
    width: 100%;
    padding: 1.1rem 1.5rem;
    background-color: var(--gray-blue);
    font-size: 2rem;
    outline: none;
    border: none;
  }

  &__error-message {
    color: var(--red);
    font-size: 1.75rem;
    font-weight: 500;
  }

  &__buttons {
    display: flex;
    justify-content: flex-end;
  }

  &__button {
    font-weight: 500;
    letter-spacing: 1px;
    cursor: pointer;

    &:not(:last-child) {
      margin-right: 2rem;
    }

    &--blue {
      color: var(--blue);
    }
  }
}

@keyframes fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes zoom-in {
  0% {
    transform: scale(0.3);
  }
  100% {
    transform: scale(1);
  }
}
</style>
