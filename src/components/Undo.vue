<template>
  <div
    class="undo-container"
    :class="
      archive.index !== -1 || archive.undone ? 'undo-container--show' : ''
    "
  >
    <div class="undo-box" :class="archive.index !== -1 && 'undo-box--show'">
      <div class="undo-box__text">1 deleted</div>
      <div class="undo-box__button" @click="$store.dispatch('undoDelete')">
        Undo
      </div>
    </div>
    <div
      class="undo-box undo-box--action-completed"
      :class="archive.undone && 'undo-box--show'"
    >
      <div class="undo-box__text">Action Complete</div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex';

export default {
  name: 'Undo',
  computed: mapState(['archive']),
  updated() {
    console.log('archive = ', this.archive);
  },
};
</script>
<style lang="scss" scoped>
.undo-container {
  position: fixed;
  bottom: 5vh;
  width: 64rem;
  height: 7.2rem;
  z-index: -2;
  overflow: hidden;
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;

  &--show {
    z-index: 10;
  }

  @media (max-width: 620px) {
    width: 100vw;
    bottom: 0;
    border-bottom-right-radius: 0px;
    border-bottom-left-radius: 0px;
  }
}

.undo-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  bottom: 0;
  transform: translateY(100%);
  height: 7.2rem;
  width: 100%;
  padding: 0 4.5rem;
  font-size: 1.7rem;
  color: var(--white);
  background: var(--black);
  transition: all 0.15s ease-in;

  &--show {
    transform: translateY(0);
  }

  &--action-completed {
    transition-delay: 0.15s;
  }

  &__button {
    color: #6ba5ed;
    font-weight: 500;
    padding: 1.25rem 2.4rem;
    margin-right: -2.4rem;
    transition: all 0.1s ease-in-out;
    cursor: pointer;

    &:hover {
      background: rgba(107, 165, 237, 0.149);
    }
  }
}
</style>
