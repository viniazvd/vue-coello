<template>
  <div id="app" class="board">
    <ul
      v-for="(groupName, groupOrder) of groups"
      :key="groupName"
      :data-group-order="groupOrder"
      draggable="true"
    >

      <header>{{ groupName }}</header>
      <slot>
        <li
          v-for="card of getCards(groupName)"
          :key="card.id"
          :data-card-order="card.order"
          :class="{ '--is-dragging': card.id === isDragging.id }"
          draggable="true"
          @drop="e => onDragDrop(e, groupName)"
          @dragstart="onDragStart(card, groupName, groupOrder)"
          @dragover.prevent="e => onDragOver(e, card, groupOrder, card.order, groupName)"
        >
          <main>{{ card.task }}</main>
        </li>
      </slot>
    </ul>
  </div>
</template>

<script>
import data from './db'
import { getClosest, removeCard, addCard, insert } from './services'

export default {
  name: 'vue-coe-dnd',

  data () {
    return {
      data: data,
      isDragging: {},
      draggedCard: {}
    }
  },

  computed: {
    groups () {
      return data.map(({ group }) => group)
    }
  },

  methods: {
    getCards (groupName) {
      return this.data.find(({ group }) => group === groupName).cards
    },

    onDragStart (card, targetGroupName, targetOrder) {
      this.draggedCard = {
        ...card,
        cardOrder: card.order,
        groupOrder: targetOrder,
        group: targetGroupName
      }
    },

    onDragDrop (e, targetGroup) {
      console.log('DROP')

      this.isDragging = {}
      this.draggedCard = {}
    },

    onDragOver (e, card, draggedGroupOrder, draggedCardOrder, groupName) {
      this.isDragging = card

      const __card = getClosest(e, 'li')
      const __group = getClosest(e, 'ul')

      const { cardOrder: targetCardOrder } = __card.dataset
      const { groupOrder: targetGroupOrder } = __group.dataset

      const draggedGroupIndex = this.draggedCard.groupOrder
      const targetGroupIndex = +targetGroupOrder

      const draggedCardIndex = this.draggedCard.cardOrder
      const targetCardIndex = +targetCardOrder

      const { top: targetCardTop, bottom: targetCardBottom } = __card.getBoundingClientRect()
      const targetCenter = Math.ceil((targetCardBottom - targetCardTop) / 2)

      const draggedOffsetTop = Math.ceil(e.clientY - targetCardTop)

      if (draggedCardIndex === targetCardIndex && draggedGroupIndex === targetGroupIndex) return
      if (draggedCardIndex < targetCardIndex && draggedOffsetTop < targetCenter) return
      if (draggedCardIndex > targetCardIndex && draggedOffsetTop > targetCenter) return

      // console.log({
      //   draggedGroupIndex,
      //   targetGroupIndex,
      //   draggedCardIndex,
      //   targetCardIndex
      // })

      this.data[draggedCardIndex].cards.splice(targetCardIndex, 1)
      this.data[draggedGroupIndex].cards.splice(targetGroupIndex, 0, this.draggedCard)
    }
  }
}
</script>

<style lang="scss">
* { box-sizing: border-box; }

html, body {
  margin: 0;
  border: 0;
  padding: 0;
  height: 100%;
}

.board {
  display: flex;
  padding: 30px 0;
  height: 100%;

  & > ul {
    // display: flex;
    list-style-type: none;

    height: 100%;
    margin: 0;
    padding: 0 15px;
    flex: 0 0 320px;

    & > li {
      padding: 30px;
      margin-top: 20px;
      margin-right: 20px;
      border: 1px solid red;

      &.--is-dragging {
        // margin-top: 100px;
        border: 2px dashed rgba(0, 0, 0, 0.2);
        padding-top: 31px;
        border-radius: 0;
        background: transparent;
        box-shadow: none;
        cursor: grabbing;

        main { opacity: 0; }
      }
    }
  }
}
</style>
