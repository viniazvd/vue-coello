<template>
  <textarea
    wrap="soft"
    class="c-input"
    autocomplete="off"
    :value="value"
    :placeholder="placeholder"
    @input="handleInput"
  />
</template>

<script>
export default {
  name: 'c-input',

  props: {
    value: String,
    placeholder: String
  },

  methods: {
    handleInput (e) {
      this.$emit('input', e.target.value)
    }
  }
}
</script>

<style lang="scss">
.c-input {
  border: 0;
  width: 100%;
  resize: none;
  padding: 10px;
}
</style>
