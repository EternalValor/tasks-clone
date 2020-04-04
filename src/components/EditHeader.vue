<template>
  <div class="edit-header contain">
    <span class="icon-container" @click="$store.dispatch('toggleEditing')">
      <Icon className="icon" name="arrow-left" />
    </span>
    <span class="icon-container" @click="handleDelete">
      <Icon className="icon" name="trash-can-outline" />
    </span>
  </div>
</template>
<script>
import Icon from './Icon';
import { mapState } from 'vuex';

export default {
  name: 'EditHeader',
  components: {
    Icon
  },
  computed: mapState(['editing']),
  methods: {
    handleDelete() {
      this.$store.dispatch('deleteTask', this.editing.id);
      this.$store.dispatch('toggleEditing');
    }
  }
};
</script>
<style lang="scss" scoped>
.edit-header {
  height: 9.375rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--border-color);
}

.icon-container {
  display: inline-block;
  padding: 1.5rem;
  border-radius: 50%;
  cursor: pointer;

  &:hover {
    background: rgba(186, 200, 207, 0.16);
  }

  &:active {
    background: rgba(124, 134, 139, 0.16);
  }
}

.icon {
  fill: var(--gray);
}
</style>
