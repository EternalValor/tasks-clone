// AppIcon.vue
<template>
  <svg :class="'icon ' + className" viewBox="0 0 24 24">
    <path :d="path" />
  </svg>
</template>

<script>
import icons from '../assets/icons.json';

export default {
  name: 'AppIcon',
  props: {
    name: String,
    className: String
  },
  computed: {
    path() {
      return icons[this.name];
    }
  }
};
</script>
<style lang="css" scoped>
.icon {
  width: 24px;
  height: 24px;
}
</style>
