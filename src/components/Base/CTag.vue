<template>
  <span
    class="tag"
    :style="{
      background: tag.color,
      padding: `${size}px 8px`
    }">
    {{ tag.type }}
  </span>
</template>

<script>
export default {
  name: 'c-tag',

  props: { tag: Object, size: Number }
}
</script>

<style lang="scss">
.tag {
  color: white;
  cursor: pointer;
  font-size: 12px;
  padding: 2px 8px;
  margin-right: 5px;
  font-weight: bold;
  border-radius: 4px;
}
</style>
