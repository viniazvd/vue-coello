<template>
  <li
    :class="classes"
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

  data () {
    return {
      isValidTarget: false,
      isAboveCenter: false
    }
  },

  computed: {
    classes () {
      const isDraggingCard = this.card.id === this.draggingCardOver.id

      return [ 'card',
        {
          '-is-dragging-card': isDraggingCard,
          '-is-above-center': isDraggingCard && this.isAboveCenter,
          '-is-below-center': isDraggingCard && !this.isAboveCenter,
          '-is-valid-target': isDraggingCard && this.isValidTarget
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

    reset () {
      this.isValidTarget = false
      this.isAboveCenter = false

      this.$emit('card:reset')
    },

    onDragStart (e) {
      this.$emit('card:dragstart', {
        card: this.card,
        group: this.group
      })
    },

    onDragDrop (e) {
      if (this.isDraggingGroup) return

      const data = moveCards({
        data: this.data,
        isAboveCenter: this.isAboveCenter,
        draggedGroupOrder: this.draggedGroup.order,
        draggedCard: this.draggedCard,
        targetGroupOrder: this.draggingGroupOver.order,
        targetCardOrder: this.draggingCardOver.order
      })

      this.reset()
      this.$emit('card:move', data)
    },

    onDragOver (e) {
      if (this.isDraggingGroup) return

      this.$emit('card:dragover', {
        card: this.card,
        group: this.group
      })

      this.$nextTick(() => {
        if (this.draggedGroup.order !== this.draggingGroupOver.order) {
          this.isValidTarget = true
          return
        }

        if (!this.draggingGroupOver.order) {
          this.isValidTarget = false
          return
        }

        const { targetCenterHorizontal, draggedOffsetTop } = this.getTargetRect(e)

        this.isAboveCenter = draggedOffsetTop < targetCenterHorizontal

        if (this.draggedCard.order === this.draggingCardOver.order) {
          this.isValidTarget = false
          return
        }

        if ((this.draggedCard.order - this.draggingCardOver.order === -1) && this.isAboveCenter) {
          this.isValidTarget = false
          return
        }

        if ((this.draggedCard.order - this.draggingCardOver.order === 1) && !this.isAboveCenter) {
          this.isValidTarget = false
          return
        }

        this.isValidTarget = true
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
  padding: 15px;
  margin-bottom: 10px;

  background: #FFF;
  border-radius: 5px;

  box-shadow: 0 1px 4px 0 rgba(192, 208, 230, 0.8);

  &.-is-dragging-card {
    opacity: 0.5;
    box-shadow: none;
    cursor: grabbing;
    transform: scale(-0.5);
    background: rgba(0, 0, 0, 0.2);
    border: 2px dashed rgba(0, 0, 0, 0.2);
  }

  &.-is-valid-target { background: green; }

  &.-is-above-center {
    margin-top: 50px;
    transform: rotate(2deg);
  }

  &.-is-below-center {
    margin-bottom: 50px;
    transform: rotate(-2deg);
  }
}
</style>
