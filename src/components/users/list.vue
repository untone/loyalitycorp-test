<template>
  <div>
    <UsersSearch :username="username"></UsersSearch>
    <main>
      <div v-if="getLoaded">
      <small v-if="getTotal">
        Found {{ total === 1000 ? 'more than 1000' : total }} result{{ total > 1 ? 's' : ''}}
      </small>
      <small v-else>
        No users found
      </small>
      <ol>
        <li v-for="(item, index) in items">
          <router-link
            :to="{path: `/${item.login}/`}"
            class="user">
            <img :src="`${item.avatar_url}&s=80`" alt="item.name"/>
            <h2>{{ item.login }}</h2>
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
  </div>
</template>

<script>
  import {createNamespacedHelpers} from 'vuex';
  import {perPage} from '../../api';
  import UsersSearch from './search';

  const {mapGetters, mapState, mapActions} = createNamespacedHelpers('users');

  module.exports = {
    components: {
      UsersSearch
    },
    computed: {
      ...mapGetters([
          'getLoaded',
          'getTotal'
        ]),
      ...mapState([
        'items',
        'page',
        'page',
        'pages',
        'total'
      ]),
      perPage: function() {
        return perPage
      },
    },
    created: function() {
      this.fetchRequest();
    },
    methods: {
      ...mapActions([
        'fetchRequest',
        'setPage'
      ]),
      handleClick(page) {
        this.setPage({page: page})
      }
    },
    name: 'UsersList',
    props: ['username']
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
    display: flex;
    align-items: center;
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
  ul {
    margin: 0;
    padding: 35px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    list-style: none;
  }
  ul li a {
    display: block;
    padding: 10px;
    transition: color 0.15s;
    outline: none;
  }
  ul li a:hover {
    color: #0080ff;
  }
  ul li[class="disabled"] a,
  ul li[class="active"] a {
    color: #a9a9a9 !important;
    cursor: default;
  }

</style>
