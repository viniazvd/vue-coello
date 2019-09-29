<template>
  <section
    draggable="true"
    :class="[ 'group',
      {
        '-is-dragging-group': !isDraggingCard && group.order === draggingGroupOver.order
      }
    ]"
    @drop="onDragDrop"
    @dragend="onDragEnd"
    @dragstart="onDragStart"
    @dragover.prevent="onDragOver"
  >
    <header>
      <span class="group-name">{{ group.name }}</span>
      <button class="actions">...</button>
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
      if (this.isDraggingCard) return

      this.$emit('group:dragstart', this.group)
    },

    onDragDrop (e) {
      if (this.isDraggingCard) return

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
      if (this.isDraggingCard) return

      this.$emit('group:dragover', this.group)
    },

    onDragEnd () {
      if (this.isDraggingCard) return

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

  & + .group {
    margin-left: 30px;
    // border-left: 1px solid rgba(0, 0, 0, 0.05);
  }

  &.-is-dragging-group {
    opacity: 0.5;
    box-shadow: none;
    cursor: grabbing;
    background: transparent;
    border: 2px dashed rgba(0, 0, 0, 0.2);
    transform: rotate(10deg);
  }

  & > header {
    display: flex;
    justify-content: space-between;

    width: 100%;
    cursor: grab;
    padding: 10px 0;

    & > .group-name { color: red; }
    & > .actions {
      width: 20px;
      height: 20px;

      border: 0;
      border-radius: 50%;

      opacity: 0.7;
      background-color: black;
    }
  }

  & > ul {
    flex: 1;
    width: 100%;
    list-style-type: none;
  }
}
</style>
