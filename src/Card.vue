<template>
  <li
    :class="classes"
    draggable="true"
    @dragend="onDragEnd"
    @dragover="onDragOver"
    @dragstart="onDragStart"
  >
    {{ card.task }}
  </li>
</template>

<script>
import { moveCards } from './services/card'

export default {
  name: 'card',

  props: {
    data: {
      type: Array,
      required: true
    },
    card: {
      type: Object,
      required: true
    },
    group: Object,

    isValidTarget: Boolean,
    isAboveCenter: Boolean,

    isDraggingSameCard: Boolean,
    isDraggingSameGroup: Boolean,

    isTopToBottom: Boolean,
    isBottomToTop: Boolean,

    isDraggingGroup: Boolean,

    draggedCard: Object,
    draggedGroup: Object,

    draggingCardOver: Object,
    draggingGroupOver: Object
  },

  computed: {
    classes () {
      const isDraggingCard = this.card.id === this.draggingCardOver.id

      return [ 'card',
        {
          '-is-dragging-card': isDraggingCard && !this.isDraggingGroup,
          '-is-above-center': isDraggingCard && this.isAboveCenter && !this.isDraggingGroup,
          '-is-below-center': isDraggingCard && !this.isAboveCenter && !this.isDraggingGroup,
          '-is-valid-target': isDraggingCard && this.isValidTarget && !this.isDraggingGroup
        }
      ]
    }
  },

  methods: {
    getTargetRect (e) {
      const {
        top: targetCardTop,
        bottom: targetCardBottom
      } = this.$el.getBoundingClientRect()

      return {
        draggedOffsetTop: Math.ceil(e.clientY - targetCardTop),
        targetCenterHorizontal: Math.ceil((targetCardBottom - targetCardTop) / 2)
      }
    },

    setValidTarget (status) {
      this.$emit('set:valid-target', status)
    },

    onDragStart (e) {
      this.$emit('card:dragstart', {
        card: this.card,
        group: this.group
      })
    },

    onDragOver (e) {
      this.$emit('card:dragover', this.card)

      const { targetCenterHorizontal, draggedOffsetTop } = this.getTargetRect(e)
      const isAboveCenter = draggedOffsetTop < targetCenterHorizontal
      this.$emit('set:is-above-center', isAboveCenter)

      this.$nextTick(() => {
        if (this.isDraggingGroup || !this.draggingGroupOver.order) {
          return this.setValidTarget(false)
        }
        if (this.isDraggingSameCard) return this.setValidTarget(false)
        if (!this.isDraggingSameGroup) return this.setValidTarget(true)
        if (this.isTopToBottom && this.isAboveCenter) return this.setValidTarget(false)
        if (this.isBottomToTop && !this.isAboveCenter) return this.setValidTarget(false)

        return this.setValidTarget(true)
      })
    },

    onDragEnd () {
      if (this.isDraggingGroup) return this.$emit('card:reset')

      const data = moveCards({
        data: this.data,
        isAboveCenter: this.isAboveCenter,
        draggedGroupOrder: this.draggedGroup.order,
        draggedCard: this.draggedCard,
        targetGroupOrder: this.draggingGroupOver.order,
        targetCardOrder: this.draggingCardOver.order
      })

      this.$emit('card:reset')
      this.$emit('card:move', data)
    }
  }
}
</script>

<style lang="scss">
.card {
  padding: 15px;
  margin-bottom: 20px;

  background: #FFF;
  border-radius: 5px;

  box-shadow: 0 1px 4px 0 rgba(192, 208, 230, 0.8);

  &.-is-dragging-card {
    opacity: 0.6;
    box-shadow: none;
    cursor: grabbing;
    background: rgba(0, 0, 0, 0.2);
  }

  &.-is-valid-target { background: green; }

  &.-is-above-center {
    transform: translateY(10px);
  }

  &.-is-below-center {
    transform: translateY(-10px);
  }
}
</style>
