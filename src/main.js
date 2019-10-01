import Vue from 'vue'
import Board from './Board.vue'
import 'vue-coe-image/dist/vue-coe-image.css'

Vue.config.productionTip = false

new Vue({
  render: h => h(Board)
}).$mount('#app')
