import Vue from 'vue'
import App from './App'
import resize from './js/resize.js'
/* eslint-disable no-new */

resize()

new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
