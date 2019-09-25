<template>
  <div id="app" class="board">
    <ul v-for="(groupName, groupOrder) of groups" :key="groupName">

      <header>{{ groupName }}</header>
      <slot>
        <!-- :class="{ 'is-hovering': card == hover }" -->
        <li
          v-for="card of getCards(groupName)"
          :key="card.id"
          :data-id="card.id"
          :data-order="card.order"
          draggable="true"
          @dragstart="dragStart(card, groupName, groupOrder)"
          @dragover="e => dragOver(e, card)"
          @drop="e => dragDrop(e, groupName)"
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
      // hover: null,
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
      const { id: draggedId, group: draggedGroup } = this.draggedCard

      if (data.group === draggedGroup) {
        return {
          ...data,
          cards: data.cards.filter(card => card.id !== draggedId)
        }
        return
      }

      return data
    },

    addCard (data, targetGroup) {
      if (data.group === targetGroup) {
        return {
          ...data,
          cards: [ ...data.cards, this.draggedCard ]
        }
        return
      }

      return data
    },

    dragStart (card, targetGroup, targetOrder) {
      this.draggedCard = {
        ...card,
        order: targetOrder,
        group: targetGroup
      }
    },

    dragOver (e, card) {
      // this.hover = card

      e.preventDefault()
    },

    dragDrop (e, targetGroup) {
      // this.hover = null
      const { order, id } = e.target.closest('li').dataset

      this.data = this.data
        .map(this.removeCard)
        .map(data => this.addCard(data, targetGroup))

      this.draggedCard = {}
    }
  }
}
</script>

<style lang="scss">
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
