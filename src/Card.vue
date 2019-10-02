<template>
  <li
    :class="classes"
    draggable="true"
    @dragend="onDragEnd"
    @dragover="onDragOver"
    @dragstart="onDragStart"
    @mousedown="showOptions = false"
    @mouseleave="showOptions = false"
    @mouseenter="showOptions = true"
  >
    <div>
      <transition name="fade">
        <button v-if="showOptions">editar</button>
      </transition>

      <header v-if="card.labels.length">
        <div>
          <label v-for="label in card.labels" :key="label.type">
            <span :style="{ background: label.color }">{{ label.type }}</span>
          </label>
        </div>

      </header>

      <div v-if="card.members.length">
        <vue-coe-image
          v-for="member in card.members"
          :key="member.id"
          :src="member.photo"
          :alt="`${member.name}(${member.username})`"
        />
      </div>

      <p>{{ card.title }}</p>

      <footer>
        <div v-if="false">watch</div>

        <div v-if="card.comments.length">
          <span>{{ getComments(card) }}</span>
        </div>

        <div v-if="card.attachments.length">
          <span>{{ getAttachments(card) }}</span>
        </div>
      </footer>
    </div>
  </li>
</template>

<script>
import { moveCards } from './services/card'

export default {
  name: 'card',

  components: {
    VueCoeImage: () => import('vue-coe-image')
  },

  props: {
    data: {
      type: Array,
      required: true
    },
    card: {
      type: Object,
      required: true
    },
    group: Object,

    isValidTarget: Boolean,
    isAboveCenter: Boolean,

    isDraggingSameCard: Boolean,
    isDraggingSameGroup: Boolean,

    isTopToBottom: Boolean,
    isBottomToTop: Boolean,

    isDraggingGroup: Boolean,

    draggedCard: Object,
    draggedGroup: Object,

    draggingCardOver: Object,
    draggingGroupOver: Object
  },

  data () {
    return {
      showOptions: false
    }
  },

  computed: {
    classes () {
      const isDraggingCard = this.card.id === this.draggingCardOver.id

      return [ 'card',
        {
          '-is-dragging-card': isDraggingCard && !this.isDraggingGroup,
          '-is-above-center': isDraggingCard && this.isAboveCenter && !this.isDraggingGroup,
          '-is-below-center': isDraggingCard && !this.isAboveCenter && !this.isDraggingGroup,
          '-is-valid-target': isDraggingCard && this.isValidTarget && !this.isDraggingGroup
        }
      ]
    }
  },

  methods: {
    getComments ({ comments }) {
      const num = comments.length

      return `${num} ${num === 1 ? 'comment' : 'comments'}`
    },

    getAttachments ({ attachments }) {
      const num = attachments.length

      return `${num} ${num === 1 ? 'attachment' : 'attachments'}`
    },

    getTargetRect (e) {
      const {
        top: targetCardTop,
        bottom: targetCardBottom
      } = this.$el.getBoundingClientRect()

      return {
        draggedOffsetTop: Math.ceil(e.clientY - targetCardTop),
        targetCenterHorizontal: Math.ceil((targetCardBottom - targetCardTop) / 2)
      }
    },

    setValidTarget (status) {
      this.$emit('set:valid-target', status)
    },

    onDragStart (e) {
      this.$emit('card:dragstart', {
        card: this.card,
        group: this.group
      })
    },

    onDragOver (e) {
      if (this.isDraggingGroup) return

      this.$emit('card:dragover', this.card)

      const { targetCenterHorizontal, draggedOffsetTop } = this.getTargetRect(e)
      const isAboveCenter = draggedOffsetTop < targetCenterHorizontal
      this.$emit('set:is-above-center', isAboveCenter)

      this.$nextTick(() => {
        if (!this.isDraggingSameGroup) return this.setValidTarget(true)

        if (this.isTopToBottom && this.isAboveCenter) return this.setValidTarget(false)
        if (this.isBottomToTop && !this.isAboveCenter) return this.setValidTarget(false)

        if (this.isDraggingGroup) return this.setValidTarget(false)
        if (this.isDraggingSameCard) return this.setValidTarget(false)

        return this.setValidTarget(true)
      })
    },

    onDragEnd () {
      if (this.isDraggingGroup) return this.$emit('card:reset')

      const data = moveCards({
        data: this.data,
        isAboveCenter: this.isAboveCenter,
        draggedGroupOrder: this.draggedGroup.order,
        draggedCard: this.draggedCard,
        targetGroupOrder: this.draggingGroupOver.order,
        targetCardOrder: this.draggingCardOver.order
      })

      this.$emit('card:reset')
      this.$emit('card:move', data)
    }
  }
}
</script>

<style lang="scss">
.fade-enter-active,
.fade-leave-active { transition: .3s ease; }

.fade-enter,
.fade-leave-active { opacity: 0; }

.card {
  position: relative;

  cursor: pointer;

  padding: 15px;
  margin-bottom: 20px;

  background: #FFF;
  border-radius: 5px;

  transition: transform .3s;

  box-shadow: 0 1px 4px 0 rgba(192, 208, 230, 0.8);

  & > div {
    & > button {
      position: absolute;
      top: 10px;
      right: 10px;
    }

    & > header {
      display: flex;
      align-items: baseline;
      justify-content: space-between;

      margin-bottom: 10px;

      & > div {
        display: flex;

        & > label {
          cursor: pointer;
          margin-right: 5px;

          & > span {
            padding: 2px 8px;
            color: white;
            font-size: 12px;
            font-weight: bold;
            border-radius: 4px;
          }
        }
      }
    }

    & > div {
      display: flex;
      margin-bottom: 10px;

      & > .vue-coe-image {
        width: 30px;
        height: 30px;
        margin-right: 5px;
        border-radius: 50px;

        & > .lazy-load-image { border-radius: 50px; }
      }
    }

    & > p {
      font-size: 16px;
      font-weight: bold;
      margin-bottom: 10px;
    }

    & > footer {
      display: flex;

      & > div {
        margin-right: 5px;
      }
    }
  }

  &.-is-dragging-card {
    opacity: 0.6;
    box-shadow: none;
    cursor: grabbing;
    background: rgba(0, 0, 0, 0.2);
  }

  &.-is-valid-target { background: green; }
  &.-is-above-center { transform: translateY(15px); }
  &.-is-below-center { transform: translateY(-15px); }
}
</style>
