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
        <!-- :class="{ 'is-hovering': card == hover }" -->
        <li
          v-for="card of getCards(groupName)"
          :key="card.id"
          :data-card-order="card.order"
          draggable="true"
          @drop="e => onDragDrop(e, groupName)"
          @dragstart="onDragStart(card, groupName, groupOrder)"
          @dragover.prevent="e => onDragOver(e, card, groupOrder, card.order)"
        >
          <main>{{ card.task }}</main>
        </li>
      </slot>
    </ul>
  </div>
</template>

<script>
import data from './db'

export default {
  name: 'vue-coe-dnd',

  data () {
    return {
      data: data,
      // hover: {},
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

    removeCard (data) {
      const { id: draggedId, group: draggedGroupName } = this.draggedCard

      if (data.group === draggedGroupName) {
        return {
          ...data,
          cards: data.cards.filter(card => card.id !== draggedId)
        }
      }

      return data
    },

    addCard (data, targetGroup) {
      if (data.group === targetGroup) {
        return {
          ...data,
          cards: [ ...data.cards, this.draggedCard ]
        }
      }

      return data
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
      // this.hover = {}

      this.data = this.data
        .map(this.removeCard)
        .map(data => this.addCard(data, targetGroup))

      this.draggedCard = {}
    },

    onDragOver (e, draggedGroupOrder, draggedCardOrder) {
      // this.hover = card

      const { groupOrder: targetGroupOrder } = e.target.closest('ul').dataset
      const { cardOrder: targetCardOrder } = e.target.closest('li').dataset
      const target = e.target.closest('li')

      const draggedGroupIndex = this.draggedCard.groupOrder
      const targetGroupIndex = +targetGroupOrder

      const draggedIndex = this.draggedCard.cardOrder
      const targetIndex = +targetCardOrder

      const targetSize = target.getBoundingClientRect()
      const targetCenter = (targetSize.bottom - targetSize.top) / 2
      console.log(targetCenter)

      // const draggedOffset = monitor.getClientOffset()
      // const draggedTop = draggedOffset.y - targetSize.top

      if (draggedIndex === targetIndex && draggedGroupIndex === targetGroupIndex) return
      // if (draggedIndex > targetIndex && draggedTop > targetCenter) return

      console.log({
        draggedGroupIndex,
        targetGroupIndex,
        draggedIndex,
        targetIndex
      })
    }
  }
}
</script>

<style lang="scss">
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
    padding: 0 15px;
    flex: 0 0 320px;

    & > li {
      padding: 30px;
      margin-top: 20px;
      margin-right: 20px;
      border: 1px solid red;

      &.is-hovering {
        margin-top: 100px;
      }
    }
  }
}
</style>
