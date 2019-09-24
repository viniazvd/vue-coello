<template>
  <div id="app" class="board">
    <ul v-for="(groupName, groupIndex) of groups" :key="groupName">

      <header>{{ groupName }}</header>
      <slot>
        <!-- :class="{ 'is-hovering': card == hover }" -->
        <li
          v-for="card of getCards(groupName)"
          :key="card.id"
          :data-id="card.id"
          :data-order="card.order"
          draggable="true"
          @dragstart="e => dragStart(e, card, groupName, groupIndex)"
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
      draggingCard: {}
    }
  },

  computed: {
    groups () {
      console.log('computed')
      return data.map(({ group }) => group)
    }
  },

  methods: {
    getCards (groupName) {
      return this.data.find(({ group }) => group === groupName).cards
    },

    dragStart (e, card, groupName, groupIndex) {
      this.draggingCard = {
        ...card,
        groupIndex,
        group: groupName
      }
    },

    dragOver (e, card) {
      // this.hover = card

      e.preventDefault()
    },

    dragDrop (e, groupName) {
      // this.hover = null

      const { order, id } = e.target.closest('li').dataset
      console.log({
        id,
        order,
        groupName,
        draggingCard: this.draggingCard,
        groupIndex: this.draggingCard.groupIndex
      })

      // this.data = [ ...this.data ].map(card => card.id === this.draggingCard.id ? { ...card, groupName } : card)
      // this.data[0].group = groupName

      // remover da lista atual
      this.data = this.data.reduce((acc, { group, cards }) => {
        if (group === this.draggingCard.group) {
          return cards.filter(card => card.id === this.draggingCard.id)
        }

        return acc
      }, [])
      // .filter(card => console.log(card, this.draggingCard.id) || card.id === this.draggingCard.id))

      // console.log(this.data[this.draggingCard.groupIndex].cards.splice(1, 0))

      this.draggingCard = {}
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
