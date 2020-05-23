import Vue from 'vue';
import VueConfetti from 'vue-confetti';

import App from './App.vue';
import router from './router';
import store from './store';

// Vue.config.productionTip = false;

Vue.use(VueConfetti);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
