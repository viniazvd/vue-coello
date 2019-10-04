<template>
  <transition appear name="c-modal-fade">
    <div v-if="isOpened" :class="['c-modal', { '-open': isOpened }]">
      <c-overlay
        :class="classes"
        @click="emit"
        @close="emit"
      >
        <div class="modal">

          <div class="header">
            <div class="title">
              <div>{{ title }}</div>
            </div>

            <div class="actions">
              <button class="btn-close" @click="$emit('close')">X</button>
            </div>
          </div>

          <div class="content">
            <slot />
          </div>
        </div>
      </c-overlay>
    </div>
  </transition>
</template>

<script>
import COverlay from './Overlay'

const ALIGNMENTS = ['right', 'left', 'center', 'bottom']
const includes = values => value => values.includes(value)
const isAlignment = includes(ALIGNMENTS)

export default {
  name: 'Modal',

  components: { COverlay },

  props: {
    /**
     * Whether to show or not the modal.
     */
    isOpened: {
      type: Boolean,
      required: true
    },

    /**
     * The title of the modal (diplayed in the header section by default).
     */
    title: {
      type: String,
      default: ''
    },

    /**
     * Positioning of the modal on the screen,
     * one of: ['right', 'left', 'center', 'bottom].
     */
    position: {
      type: String,
      default: 'center',
      validator: isAlignment
    },

    /**
     * Props to pass to the default CTitle component displayed
     * in the header of the modal.
     */
    titleProps: {
      type: Object,
      default: () => ({ })
    },

    /**
     * Set the color of the action buttons displayed
     * in the header of the modal.
     */
    actionsColor: {
      type: String,
      validator: color => ['primary', 'success', 'error'].includes(color),
      default: () => 'primary'
    },

    /**
     * Disables the modal actions.
     */
    disabled: Boolean,

    /**
     * Removes the close button.
     */
    noClose: Boolean,

    /**
     * Removes the header section from the modal.
     */
    noHeader: Boolean,

    /**
     * Makes the modal fullscreen
     */
    fullscreen: Boolean
  },

  computed: {
    classes () {
      return [ 'wrapper', `-${this.position}` ]
    }
  },

  watch: {
    isOpened (newValue, oldValue) {
      if (newValue === oldValue) return

      this.checkOverflow()
    }
  },

  methods: {
    checkOverflow () {
      this.isOpened ? this.open() : this.close()
    },

    open () {
      window.addEventListener('keydown', this.closeOnEsc)
    },

    close () {
      window.removeEventListener('keydown', this.closeOnEsc)
    },

    emit () {
      this.$emit('close')
      this.close()
    },

    closeOnEsc (ev) {
      if (ev.keyCode === 27) this.emit()
    },

    onClickOutside () {
      console.log('dasd')
      this.emit()
    }
  },

  mounted () {
    this.checkOverflow()
  },

  beforeDestroy () {
    this.close()
    window.removeEventListener('keydown', this.closeOnEsc)
  }
}
</script>

<style lang="scss">

.c-modal.-open {
  position: fixed;
  top: 0px;
  left: 0px;

  width: 100vw;
  height: 100%;

  z-index: 50;
}

.c-modal > .wrapper {
  position: fixed;
  z-index: 50;
  bottom: 0;
  right: 0;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100%;

  display: flex;
  flex-direction: column;

  overflow-y: auto;

  &.-right > .modal { align-self: flex-end; }
  &.-left > .modal { align-self: flex-start; }
  &.-center, &.-bottom { align-items: center; }

  &.-fullscreen {
    overflow-y: hidden;

    & > .modal {
      width: calc(1024px - 130px);
      max-width: calc(100% - 130px);

      height: 100vh;
      top: 0px;

      border-radius: 0;
      margin: 0;

      // @include responsive (xs-mobile, mobile) { max-width: 100vw; }
    }
  }

  & > .modal {
    top: 90px;

    width: 100%;
    max-width: 100%;
    max-width: 580px;
    min-height: 250px;
    position: relative;

    display: flex;
    flex-shrink: 0;

    flex-direction: column;
    z-index: 30;

    opacity: 1;
    border-radius: 5px;
    box-shadow: 0 2px 6px 0 rgba(0,0,0,0.2);
    background: linear-gradient(180deg, #FFF, rgba(255, 255, 255, .83) 100%);

    & > .header {
      display: flex;
      flex-shrink: 0;
      align-items: flex-start;

      padding: 20px 20px 15px;

      & > .title {
        margin-right: auto;

        // & > .c-title > .text { color: map-get($text-color, base-80); }
      }

      & > .actions {
        display: flex;
        align-items: center;

        margin-left: auto;

        & > .btn-close {
          width: 20px;
          height: 20px;
          background: grey;
        }

        & > a:not(:last-child),
        & > button:not(:last-child) { margin-right: 10px; }
      }
    }

    & > .content {
      width: 100%;
      padding: 5px 20px 50px;
    }
  }
}

/**
 * Transition
 * ----------
 */

.c-modal-fade {
  &-enter-active,
  &-leave-active {
    transition: opacity .5s;

    & > .wrapper > .modal { transition: transform .5s, opacity 350ms; }
  }

  &-enter,
  &-leave-to {
    opacity: 0;

    & > .wrapper {
      & > .modal { opacity: 0; }
      &.-right > .modal { transform: translateX(100%); }
      &.-left > .modal { transform: translateX(-100%); }
      &.-bottom > .modal { transform: translateY(100%); }
      &:not(.-right, .-left) > .modal { transform: scale(0.3); }
    }
  }
}
</style>
