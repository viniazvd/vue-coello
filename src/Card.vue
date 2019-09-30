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

    isDraggingGroup: Boolean,

    draggedGroup: Object,
    draggedCard: Object,

    draggingCardOver: Object,
    draggingGroupOver: Object
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

    setValidTarget (status) {
      this.$emit('set:valid-target', status)
    },

    reset () {
      this.$emit('card:reset')
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
          // console.log('1 FALSE')
          this.setValidTarget(false)
          return
        }

        if (this.draggedGroup.order !== this.draggingGroupOver.order) {
          // console.log('2 OKKKK')
          this.setValidTarget(true)
          return
        }

        if (this.draggedCard.order === this.draggingCardOver.order) {
          // console.log('3 FALSE')
          this.setValidTarget(false)
          return
        }

        if ((this.draggedCard.order - this.draggingCardOver.order === -1) && this.isAboveCenter) {
          // console.log('4 FALSE')
          this.setValidTarget(false)
          return
        }

        if ((this.draggedCard.order - this.draggingCardOver.order === 1) && !this.isAboveCenter) {
          // console.log('5 FALSE')
          this.setValidTarget(false)
          return
        }

        this.setValidTarget(true)
        // console.log('6 OKKK')
      })
    },

    onDragEnd () {
      if (this.isDraggingGroup) return this.reset()
      console.log('end', this.isAboveCenter)

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
    opacity: 1;
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
