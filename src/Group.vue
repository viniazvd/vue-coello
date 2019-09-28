<template>
  <section
    :class="[ 'group',
      {
        '-is-dragging-group': !isDraggingGroup && group.order === draggingGroupOver.order
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
        :is-dragging-group="isDraggingGroup"
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
    isDraggingGroup: Boolean,
    draggingCardOver: Object,
    draggingGroupOver: Object
  },

  methods: {
    getCards (groupName) {
      return this.data.find(({ name }) => name === groupName).cards
    },

    onDragStart () {
      console.log('group:start')
      this.$emit('group:dragstart', this.group)
    },

    onDragDrop (e) {
      console.log('group:drop')
    },

    onDragOver () {
      console.log('group:over')
      this.$emit('group:dragover', this.group)
    },

    onDragEnd () {
      console.log('group:end')
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
    opacity: 0.6;
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
