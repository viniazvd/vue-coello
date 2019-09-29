<template>
  <li
    :class="[ 'card',
      {
        '-is-dragging-card': card.id === draggingCardOver.id
      }
    ]"
    draggable="true"
    @dragend.stop="onDragEnd"
    @drop.stop="onDragDrop"
    @dragover.prevent="onDragOver"
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
    isDraggingGroup: Boolean,
    draggedGroup: Object,
    draggedCard: Object,
    draggingCardOver: Object,
    draggingGroupOver: Object
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

    onDragStart () {
      this.$emit('card:dragstart', {
        card: this.card,
        group: this.group
      })
    },

    onDragDrop (e) {
      if (this.isDraggingGroup) return

      const { targetCenterHorizontal, draggedOffsetTop } = this.getTargetRect(e)

      const isAboveCenter = draggedOffsetTop < targetCenterHorizontal

      if (this.draggedGroup.order === this.draggingGroupOver.order) {
        if (this.draggedCard.order === this.draggingCardOver.order) {
          return this.$emit('card:reset')
        }

        if ((this.draggedCard.order - this.draggingCardOver.order === -1) && isAboveCenter) {
          return this.$emit('card:reset')
        }

        if ((this.draggedCard.order - this.draggingCardOver.order === 1) && !isAboveCenter) {
          return this.$emit('card:reset')
        }
      }

      const data = moveCards({
        data: this.data,
        targetCenterHorizontal,
        draggedOffsetTop,
        draggedGroupOrder: this.draggedGroup.order,
        draggedCard: this.draggedCard,
        targetGroupOrder: this.draggingGroupOver.order,
        targetCardOrder: this.draggingCardOver.order
      })

      this.$emit('card:reset')
      this.$emit('card:move', data)
    },

    onDragOver () {
      if (this.isDraggingGroup) return

      this.$emit('card:dragover', {
        card: this.card,
        group: this.group
      })
    },

    onDragEnd () {
      this.$emit('card:reset')
    }
  }
}
</script>

<style lang="scss">
.card {
  padding: 30px;
  margin-top: 20px;
  border: 1px solid red;

  &.-is-dragging-card {
    // opacity: 0;
    box-shadow: none;
    cursor: grabbing;
    padding-top: 31px;
    background: transparent;
    border: 2px dashed rgba(0, 0, 0, 0.2);
  }
}
</style>
