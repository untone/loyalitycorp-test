import {fetchRepo, fetchRepos, perPage} from '../../api';

const collectLangs = items => {
  let languages = [];
  items.map(item => item.language !== null && languages.push(item.language));
  languages = Array.from(new Set(languages.sort()));
  languages.unshift('all');
  return languages;
};

const filterItems = (items, language) => 
  items.filter(item => {
    if (language === 'all') {
      return item;
    } else {
      return item.language === language;
    }
  });

export const repos = {
  state: {
    filteredItems: [],
    items: [],
    item: {},
    language: 'all',
    languages: [],
    loaded: false,
    page: 1,
    pages: 0,
    sorted: 'updated',
    sortOptions: [
      'created',
      'updated',
      'stars'
    ],
    total: 0,
    username: ''
  },
  actions: {
    async fetchRepo({commit, state}, payload) {
      const data = await fetchRepo(payload);
      if (data) {
        commit('fetchRepoSucceeded', data);
      } else {
        commit('fetchRepoFailure', data);
      }
    },
    async fetchRequest({commit, state}) {
      const {
        language,
        sorted,
        page,
        username,
        total
      } = state;
      const params = {
        language: language === 'all' ? null : language,
        username,
        sort: sorted,
        page,
        getTotal: total ? false : true
      };
      const data = await fetchRepos(params);
      if (data) {
        commit('fetchReposSucceeded', data);
      } else {
        commit('fetchReposFailure', data);
      }
    },
    setPage({commit, dispatch}, payload) {
      commit('setPage', payload);
      dispatch('fetchRequest');
    },
    setSort({commit, dispatch}, payload) {
      commit('setSort', payload);
      dispatch('fetchRequest');
    },
    setUsername({commit, dispatch, state}, {username}) {
      commit('resetItems', {username});
      dispatch('fetchRequest');
    }
  },
  getters: {
    getLoaded: state => {
      return state.loaded;
    },
    getItem: state => {
      return Object.keys(state.item).length;
    },
    getSorted: state => {
      return state.sorted;
    },
    getTotal: state => {
      return state.total;
    }
  },
  mutations: {
    fetchStart(state) {
      state.items = [];
    },
    fetchRepoSucceeded(state, item) {
      state.item = item;
    },
    fetchRepoFailure(state) {
      state.loaded = false;
    },
    fetchReposSucceeded(state, [total_count, items]) {
      const total = total_count ? parseInt(total_count, 10) : state.total;
      state.items = items;
      state.filteredItems = filterItems(items, state.language);
      state.loaded = true;
      state.languages = collectLangs(items);
      state.pages = Math.ceil(total / perPage);
      state.total = total;
    },
    fetchReposFailure(state) {
      state.loaded = false;
    },
    resetItem(state) {
      state.item = {};
    },
    resetItems(state, {username}) {
      state.filteredItems = [];
      state.items = [];
      state.language = 'all';
      state.languages = [];
      state.loaded = false;
      state.page = 1;
      state.pages = 0;
      state.sorted = 'updated';
      state.total = 0;
      state.username = username;
    },
    setLanguage(state, {language}) {
      state.filteredItems = filterItems(state.items, language);
      state.language = language;
    },
    setPage(state, {page}) {
      state.page = page;
    },
    setSort(state, {sort}) {
      state.sorted = sort;
    },
    setUsername(state, {username}) {
      state.username = username;
    },
  }
};
