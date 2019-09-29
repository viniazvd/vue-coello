<template>
  <main id="app" class="board">
    <group
      v-for="group of data"
      :key="group.order"

      :data="data"
      :group="group"

      :is-dragging-card="isDraggingCard"
      :is-dragging-group="isDraggingGroup"

      :dragged-card="draggedCard"
      :dragged-group="draggedGroup"

      :dragging-group-over="draggingGroupOver"
      :dragging-card-over="draggingCardOver"

      @group:dragstart="onGroupDragStart"
      @group:move="value => data = value"
      @group:reset="resetDraggableGroup"
      @group:dragover="group => draggingGroupOver = group"

      @card:dragstart="onCardDragStart"
      @card:move="value => data = value"
      @card:reset="resetDraggableCard"
      @card:dragover="card => draggingCardOver = card"
    >
    </group>
  </main>
</template>

<script>
import data from './db'

export default {
  name: 'board',

  components: {
    Group: () => import('./Group')
  },

  data () {
    return {
      data: data,

      isDraggingCard: false,
      isDraggingGroup: false,

      draggedCard: {},
      draggedGroup: {},

      draggingCardOver: {},
      draggingGroupOver: {}
    }
  },

  methods: {
    getCards (groupName) {
      return this.data.find(({ name }) => name === groupName).cards
    },

    resetDraggableGroup () {
      this.isDraggingGroup = false

      this.draggedGroup = {}
      this.draggingGroupOver = {}
    },

    resetDraggableCard () {
      this.isDraggingCard = false

      this.draggedCard = {}
      this.draggingCardOver = {}
      this.draggingGroupOver = {}
    },

    onGroupDragStart (group) {
      this.isDraggingGroup = true

      this.draggedGroup = group
    },

    onCardDragStart ({ card, group }) {
      this.isDraggingCard = true

      this.draggedCard = card
      this.draggedGroup = group
    }
  }
}
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  margin: 0;
  border: 0;
  padding: 0;
  height: 100%;
}

.board {
  display: flex;
  padding: 30px;
  height: 100%;

  color: #333;
  background: #ecf1f8;
  font: 14px, sans-serif;
  -webkit-font-smoothing: antialiased !important;
}
</style>
