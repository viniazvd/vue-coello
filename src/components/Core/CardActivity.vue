<template>
  <div
    class="card-activity"
    :style="{
      'margin-top': marginTop + 'px',
      'margin-bottom': marginBottom + 'px'
    }"
  >
    <vue-coe-image
      class="image"
      src="https://picsum.photos/30"
    />
  </div>
</template>

<script>
export default {
  name: 'card-activity',

  components: {
    VueCoeImage: () => import('vue-coe-image')
  },

  props: {
    marginTop: {
      type: Number,
      default: 0
    },
    marginBottom: {
      type: Number,
      default: 0
    },
    cards: {
      type: Object
    }
  }
}
</script>

<style lang="scss">
.card-activity {
  display: flex;
  align-items: center;

  & > .image {
    border-radius: 50px;

    & > .lazy-load-image {
      width: 30px;
      height: 30px;
      border-radius: 20px;
    }
  }
}
</style>
