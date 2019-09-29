<template>
  <section
    :class="[ 'group',
      {
        '-is-dragging-group': !isDraggingCard && group.order === draggingGroupOver.order
      }
    ]"
  >
    <header
      draggable="true"
      @drop="onDragDrop"
      @dragend="onDragEnd"
      @dragstart="onDragStart"
      @dragover.prevent="onDragOver"
    >
      {{ group.name }}
    </header>

    <ul>
      <card
        v-for="card of getCards(group.name)"
        :key="card.id"
        :data="data"
        :card="card"
        :group="group"
        :dragged-group="draggedGroup"
        :dragging-card-over="draggingCardOver"
        :dragging-group-over="draggingGroupOver"
        v-bind="$attrs"
        v-on="$listeners"
      >
        {{ card.task }}
      </card>
    </ul>
  </section>
</template>

<script>
import { moveGroups } from './services/group'

export default {
  name: 'group',

  components: {
    Card: () => import('./Card')
  },

  inheritAttrs: false,

  props: {
    data: {
      type: Array,
      required: true
    },
    group: {
      type: Object,
      required: true
    },
    isDraggingCard: Boolean,
    draggedGroup: Object,
    draggingCardOver: Object,
    draggingGroupOver: Object
  },

  methods: {
    getCards (groupName) {
      return this.data.find(({ name }) => name === groupName).cards
    },

    getTargetRect (e) {
      const {
        left: targetGroupLeft,
        right: targetGroupRight
      } = this.$el.getBoundingClientRect()

      return {
        draggedOffsetLeft: Math.ceil(e.clientX - targetGroupLeft),
        targetCenterVertical: Math.ceil((targetGroupRight - targetGroupLeft) / 2)
      }
    },

    onDragStart () {
      this.$emit('group:dragstart', this.group)
    },

    onDragDrop (e) {
      const { targetCenterVertical, draggedOffsetLeft } = this.getTargetRect(e)
      const isLeftCenter = draggedOffsetLeft < targetCenterVertical

      if (this.draggedGroup.order === this.draggingGroupOver.order) {
        return this.$emit('group:reset')
      }

      if ((this.draggedGroup.order - this.draggingGroupOver.order === -1) && isLeftCenter) {
        return this.$emit('group:reset')
      }

      if ((this.draggedGroup.order - this.draggingGroupOver.order === 1) && !isLeftCenter) {
        return this.$emit('group:reset')
      }

      const data = moveGroups({
        data: [...this.data],
        isLeftCenter,
        draggedGroup: this.draggedGroup,
        draggingGroupOver: this.draggingGroupOver
      })

      this.$emit('group:reset')
      this.$emit('group:move', data)
    },

    onDragOver () {
      this.$emit('group:dragover', this.group)
    },

    onDragEnd () {
      this.$emit('group:reset')
    }
  }
}
</script>

<style lang="scss">
.group {
  display: flex;
  align-items: center;
  flex-direction: column;

  width: 100%;

  &.-is-dragging-group {
    opacity: 0.5;
    box-shadow: none;
    cursor: grabbing;
    background: transparent;
    border: 2px dashed rgba(0, 0, 0, 0.2);
  }

  & > header {
    display: flex;
    justify-content: center;

    width: 100%;
    cursor: grab;
    padding: 10px 0;
  }

  & > ul {
    flex: 1;
    margin: 0;
    width: 100%;
    padding: 0 15px;
    list-style-type: none;
  }
}
</style>
