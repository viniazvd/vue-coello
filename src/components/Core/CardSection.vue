<template>
  <div
    class="card-section"
    :style="{
      'margin-top': marginTop + 'px',
      'margin-bottom': marginBottom + 'px'
    }"
  >
    <div :class="`icon fas fa-${icon} fa-lg`"></div>
    <div class="title">{{ title }}</div>

    <button
      v-if="button"
      class="action"
      @click="$emit('click:button')"
    >
      {{ button }}
    </button>
  </div>
</template>

<script>
export default {
  name: 'card-section',

  props: {
    marginTop: {
      type: Number,
      default: 0
    },
    marginBottom: {
      type: Number,
      default: 0
    },
    icon: String,
    title: String,
    button: String
  }
}
</script>

<style lang="scss">
.card-section {
  display: flex;
  align-items: center;

  & > .icon { margin-right: 10px; }

  & > .title {
    font-size: 16px;
    font-weight: 600;
    line-height: 20px;
  }

  & > .action {
    margin-left: auto;
  }
}
</style>
