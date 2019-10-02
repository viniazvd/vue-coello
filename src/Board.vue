<template>
  <main id="app" class="board">
    <group
      v-for="group of data"
      :key="group.order"

      :data="data"
      :group="group"

      :is-valid-target="isValidTarget"
      :is-above-center="isAboveCenter"

      :is-dragging-card="isDraggingCard"
      :is-dragging-group="isDraggingGroup"

      :dragged-card="draggedCard"
      :dragged-group="draggedGroup"

      :dragging-group-over="draggingGroupOver"
      :dragging-card-over="draggingCardOver"

      :is-top-to-bottom="isTopToBottom"
      :is-bottom-to-top="isBottomToTop"

      :is-dragging-same-card="isDraggingSameCard"
      :is-dragging-same-group="isDraggingSameGroup"

      @set:valid-target="status => isValidTarget = status"
      @set:is-above-center="status => isAboveCenter = status"

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

      isValidTarget: false,
      isAboveCenter: false,

      isDraggingCard: false,
      isDraggingGroup: false,

      draggedCard: {},
      draggedGroup: {},

      draggingCardOver: {},
      draggingGroupOver: {}
    }
  },

  computed: {
    isTopToBottom () {
      return this.draggedCard.order - this.draggingCardOver.order === -1
    },

    isBottomToTop () {
      return this.draggedCard.order - this.draggingCardOver.order === 1
    },

    isDraggingSameGroup () {
      return this.draggedGroup.order === this.draggingGroupOver.order
    },

    isDraggingSameCard () {
      return this.draggedCard.order === this.draggingCardOver.order
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

      this.isValidTarget = false
      this.isAboveCenter = false

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

ul { list-style-type: none; }

.board {
  display: flex;
  padding: 30px;
  height: 100%;

  color: #333;
  background: #ecf1f8;
  font-size: 14px;
  font-family: 'Ubuntu', sans-serif;
  -webkit-font-smoothing: antialiased !important;
}
</style>
