<template>
  <div class="edit">
    <EditHeader />
    <EditForm />
  </div>
</template>
<script>
import EditHeader from '../components/EditHeader';
import EditForm from '../components/EditForm';

export default {
  name: 'Edit',
  components: {
    EditHeader,
    EditForm
  }
};
</script>
<style lang="scss" scoped>
.edit {
  position: absolute;
  z-index: 150;
  height: 100%;
  width: 100%;
  right: 0;
  background: var(--white);
  border-left: 1px solid var(--border-color);
  transition: all 0.4s cubic-bezier(0.35, 1, 0.35, 1);
  box-shadow: 4px 0 6px rgba(0, 0, 0, 0.5);

  &--hidden {
    right: -110%;
    border-right: 1px solid var(--border-color);
    transition: all 0.4s cubic-bezier(0.35, 1, 0.35, 1);
  }
}
</style>
