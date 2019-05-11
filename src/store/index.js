import Vue from 'vue';
import Vuex from 'vuex';

import { repos } from './modules/repos';
import { users } from './modules/users';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    repos: {
      namespaced: true,
      ...repos
    },
    users: {
      namespaced: true,
      ...users
    },
    errors: []
  }
})
