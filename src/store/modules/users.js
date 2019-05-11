import {router} from '../../index';
import {fetchUsers, perPage} from '../../api';

export const users = {
  state: {
    items: [],
    loaded: false,
    page: 1,
    pages: 0,
    query: '',
    total: 0
  },
  actions: {
    async fetchRequest({commit, state}) {
      const {page, query} = state;
      if (query) {
        const data = await fetchUsers({page, query});
        if (data.items) {
          commit('fetchSucceeded', data);
        } else {
          commit('fetchFailure', data);
        }
      }
    },
    setPage({commit, dispatch}, payload) {
      commit('setPage', payload);
      dispatch('fetchRequest');
    },
    setQuery({commit, dispatch, state}, payload) {
      const {page} = state;
      const {query, fetch = true} = payload;
      if (query) {
        commit('setQuery', payload);
        fetch && dispatch('fetchRequest');
        router.push({
          path: '/search',
          query: {
            username: query || undefined,
            page: page === 1 ? undefined : page || undefined
          }
        });
      } else {
        commit('resetItems');
        router.push({path: '/'});
      }
    }
  },
  getters: {
    getLoaded: state => {
      return state.loaded;
    },
    getTotal: state => {
      return state.total;
    }
  },
  mutations: {
    fetchStart(state) {
      state.items = [];
      state.loaded = false;
    },
    fetchSucceeded(state, {items, total_count}) {
      // Github api provided only first 1000 items
      const apiMaximum = 1000;
      const total = parseInt(total_count, 10);
      state.items = items;
      state.pages = Math.ceil((total > apiMaximum ? apiMaximum : total) / perPage);
      state.loaded = true;
      state.total = total > apiMaximum ? apiMaximum : total;
    },
    fetchFailure(state) {
      state.loaded = false;
    },
    resetItems(state) {
      state.items = [];
      state.loaded = false;
      state.page = 1;
      state.pages = 0;
      state.total = 0;
    },
    setPage(state, {page}) {
      state.page = parseInt(page);
    },
    setQuery(state, {query}) {
      if (query !== state.query) {
        state.page = 1;
      }
      state.query = query;
    },
  }
};
