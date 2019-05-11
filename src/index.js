import 'babel-polyfill';
import Vue from 'vue';
import VueRouter from 'vue-router';
import VueMarkdown from 'vue-markdown';
import Paginate from 'vuejs-paginate';

import routes from './routes';
import store from './store';

Vue.use(VueRouter);
Vue.use(VueMarkdown);
Vue.component('paginate', Paginate);

import App from './app.vue';

const router = new VueRouter({
  routes: routes,
  mode: 'history',
  linkActiveClass: 'open active',
  scrollBehavior: function (to, from, savedPosition) {
    return savedPosition || { x: 0, y: 0 }
  }
});

Vue.config.devtools = process.env.NODE_ENV === 'development';

new Vue({
  el: '#app',
  router: router,
  store: store,
  render: h => h(App)
})

window.__VUE_DEVTOOLS_GLOBAL_HOOK__.Vue = app.constructor;

export {router};
