<template>
  <div>
    <UsersSearch :username="username"></UsersSearch>
    <main>
      <div v-if="getLoaded">
        <small v-if="getTotal">
          <span>
            {{ total === 1000 ? 'More than 1000' : total }} starred repositor{{ total > 1 ? 'ies' : 'y'}}
          </span>
          <aside>
            Sort:
            <select
              name="sort"
              @change="handleSort">
              <option
                v-for="option in sortOptions"
                :value="option"
                :selected="option === getSorted">
                {{ option }}
              </option>
            </select>
            Language:
            <select
              name="language"
              @change="handleLang">
              <option
                v-for="lang in languages"
                :value="lang"
                :selected="lang === language">
                {{ lang }}
              </option>
            </select>
          </aside>
        </small>
        <small v-else>
          <span>No starred repos</span>
        </small>
      </div>
      <ol v-if="filteredItems.length">
        <li v-for="item in filteredItems">
          <router-link :to="{path: `/${item.owner.login}/${item.name}`}">
            <h2>
              {{ item.name }}
            </h2>
            <p>
              {{ item.description }}
            </p>
            <dl>
              <dt>Language: </dt>
              <dd>{{ item.language }}</dd>
              <dt>Stars: </dt>
              <dd>{{ item.stargazers_count }}</dd>
              <dt>Forks: </dt>
              <dd>{{ item.forks_count }}</dd>
            </dl>
          </router-link>
      </li>
      </ol>
      <paginate
        v-if="total > perPage"
        :page-count="pages"
        :click-handler="handleClick"
        :prev-text="'Prev'"
        :next-text="'Next'">
      </paginate>
    </main>
    <RepoItem v-if="showModal" ref="modal">
      <routerView name="modal"/></routerView>
    </RepoItem>
  </div>
</template>

<script>
  import {createNamespacedHelpers} from 'vuex';
  import {perPage} from '../../api';
  import UsersSearch from './../users/search';
  import RepoItem from './repo';

  const {mapActions, mapGetters, mapMutations, mapState} = createNamespacedHelpers('repos');

  module.exports = {
    components: {
      UsersSearch,
      RepoItem
    },
    computed: {
      ...mapGetters([
          'getLoaded',
          'getSorted',
          'getTotal'
        ]),
      ...mapState([
        'filteredItems',
        'language',
        'languages',
        'page',
        'pages',
        'sorted',
        'sortOptions',
        'total'
      ]),
      perPage: function() {
        return perPage
      },
    },
    created: function() {
      const {params: {username}} = this.$route;
      this.setUsername({username});
    },
    data: function() {
      return {
        showModal: this.$route.meta.showModal,
        username: this.$route.params.username
      }
    },
    methods: {
      ...mapActions([
        'setUsername',
        'setPage',
        'setSort'
      ]),
      ...mapMutations([
        'setLanguage'
      ]),
      handleClick(page) {
        this.setPage({page})
      },
      handleLang({target: {value}}) {
        this.setLanguage({language: value})
      },
      handleSort({target: {value}}) {
        this.setSort({sort: value})
      }
    },
    name: 'ReposList',
    // props: ['username'],
    watch: {
      '$route.meta' ({showModal}) {
        this.showModal = showModal
      }
    }
  };
</script>

<style scoped>
  ol {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  ol li {
    box-sizing: border-box;
    margin: 0;
    padding: 20px 0;
    border-bottom: 1px solid #e5e5e5;
  }
  ol li:last-child {
    border-bottom: none;
  }
  ol li a {
    color: #24292e;
    text-decoration: none;
  }
  ol li h2 {
    margin: 0;
    padding: 0;
    font-size: 16px;
    color: #24292e;
    transition: color 0.15s;
  }
  ol li a:hover h2,
  ol li a:focus h2 {
    color: #0080ff;
  }
  ol li img {
    margin: 0 20px 0 0;
    width: 48px;
    height: 48px;
  }
  dl {
    margin: 10px 0 0;
    padding: 0;
    display: flex;
    font-size: 11px;
  }
  dl dt {
    margin: 0 5px 0 0;
    padding: 0;
    color: #707070;
  }
  dl dd {
    margin: 0 10px 0 0;
    padding: 0;
  }
</style>
