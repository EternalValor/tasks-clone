import Vue from 'vue';
import App from './App.vue';
import store from './store';

store.watch(
  state => state,
  store => {
    window.localStorage.setItem('STORE', JSON.stringify(store));
  },
  { deep: true }
);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  store
}).$mount('#app');
