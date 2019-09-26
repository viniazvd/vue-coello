<template>
  <div id="app" class="board">
    <ul
      v-for="(groupName, groupOrder) of groups"
      :key="groupName"
      :data-group-order="groupOrder + 1"
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
          @drop="e => onDragDrop(e, card)"
          @dragstart="onDragStart(card, groupOrder + 1)"
          @dragover.prevent="e => onDragOver(card)"
        >
          <main>{{ card.task }}</main>
        </li>
      </slot>
    </ul>
  </div>
</template>

<script>
import data from './db'
import { getClosest, removeCard, addCard, insertCard } from './services'

export default {
  name: 'vue-coe-dnd',

  data () {
    return {
      data: data,
      isDragging: {},
      draggedCard: {},
      draggedGroupOrder: null
    }
  },

  computed: {
    groups () {
      return data.map(({ group }) => group)
    },

    draggedCardOrder () {
      if (!this.draggedCard) return null

      return this.draggedCard.order
    }
  },

  methods: {
    getCards (groupName) {
      return this.data.find(({ group }) => group === groupName).cards
    },

    getTargetOrder (e, el, prop) {
      const target = getClosest(e, el)

      const { [prop]: targetOrder } = target.dataset

      return targetOrder
    },

    getTargetRect (e) {
      const __card = getClosest(e, 'li')
      const { top: targetCardTop, bottom: targetCardBottom } = __card.getBoundingClientRect()

      return {
        targetCenter: Math.ceil((targetCardBottom - targetCardTop) / 2),
        draggedOffsetTop: Math.ceil(e.clientY - targetCardTop)
      }
    },

    onDragStart (card, draggedGroupOrder) {
      this.draggedCard = card
      this.draggedGroupOrder = draggedGroupOrder
    },

    onDragDrop (e, card) {
      console.log('DROP')

      const targetCardOrder = +this.getTargetOrder(e, 'li', 'cardOrder')
      const targetGroupOrder = +this.getTargetOrder(e, 'ul', 'groupOrder')

      const { targetCenter, draggedOffsetTop } = this.getTargetRect(e)

      // console.log(this.draggedCardOrder, targetCardOrder, this.draggedGroupOrder, targetGroupOrder)
      // console.log(this.draggedGroupOrder, targetGroupOrder, draggedOffsetTop, targetCenter)
      if (this.draggedCardOrder === targetCardOrder && this.draggedGroupOrder === targetGroupOrder) return

      if(draggedIndex < targetIndex && draggedTop < targetCenter){
      if (this.draggedCardOrder === targetCardOrder && draggedOffsetTop > targetCenter) return

      if(draggedIndex > targetIndex && draggedTop > targetCenter){
      if (this.draggedCardOrder === targetCardOrder && draggedOffsetTop > targetCenter) return
      console.log('dasdsadasdasda')

      // console.log({
      //   draggedGroupOrder,
      //   targetGroupIndex,
      //   draggedCardOrder,
      //   targetCardIndex
      // })

      // this.data[this.draggedCardOrder].cards.splice(this.targetCardIndex, 1)
      // this.data[this.draggedGroupOrder].cards.splice(this.targetGroupIndex, 0, this.draggedCard)

      const isAbove = draggedOffsetTop < targetCenter
      const { id } = this.draggedCard

      this.data = [ ...this.data ]
        .map(c => {
          if (c.order === this.draggedOrder) {
            return {
              ...c,
              cards: c.cards.filter(card => card.id !== id)
            }
          }
          return c
        })
        .reduce((acc, group) => {
          if (group.order === targetGroupOrder) {
            const newGroups = {
              ...group,
              cards: insertCard(group.cards, isAbove ? targetCardOrder - 1 : targetCardOrder, this.draggedCard).map((coe, i) => {
                return {
                  ...coe,
                  order: i + 1
                }
              })
            }

            acc = [ ...acc, newGroups ]
          } else {
            acc = [ ...acc, group ]
          }

          return acc
        }, [])

      this.isDragging = {}
      this.draggedCard = {}
      this.draggedOrder = null
    },

    onDragOver (card) {
      this.isDragging = card
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
