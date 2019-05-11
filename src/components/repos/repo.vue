<template>
  <article v-if="getItem">
    <aside @click="handleClose"></aside>
    <section>
      <header>
        <h2>{{ item.name }}</h2>
        <button @click="handleClose">×</button>
      </header>
      <slot>
          <vueMarkdown>
            {{ item.readme }}
          </vueMarkdown>
      </slot>
    </section>
  </article>
</template>

<script>
  import {createNamespacedHelpers} from 'vuex';
  import VueMarkdown from 'vue-markdown';
  const {mapActions, mapGetters, mapMutations, mapState} = createNamespacedHelpers('repos');

  module.exports = {
    components: {
      VueMarkdown
    },
    computed: {
      ...mapGetters([
          'getItem'
        ]),
      ...mapState([
        'item',
      ])
    },
    created: function() {
      const {params: {username, reponame}} = this.$route;
      this.fetchRepo({
        username,
        reponame
      });
    },
    name: 'RepoItem',
    methods: {
      ...mapActions([
        'fetchRepo'
      ]),
      ...mapMutations([
        'resetItem'
      ]),
      handleClose () {
        this.$router.go(-1);
        this.resetItem();
      }
    },
    props: [
      'reponame',
      'username'
    ],
  };
</script>

<style scoped>
  article {
    position: fixed;
    z-index: 2;
    top: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  aside {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.15);
  }
  section {
    position: absolute;
    top: 20px;
    right: auto;
    bottom: 20px;
    left: auto;
    overflow: hidden;
    margin: 0 auto;
    width: 500px;
    background-color: #fff;
    border: 1px solid #e5e5e5;
    border-radius: 2px;
  }
  header {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    margin: 0;
    padding: 0 20px;
    height: 50px;
    display: flex;
    align-items: center;
  }
  button {
    position: absolute;
    top: 0;
    right: 0;
    width: 50px;
    height: 50px;
    font-size: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    appearance: none;
    background: none;
    border: none;
    outline: none;
    cursor: pointer;
  }
  button:hover,
  button:focus {
    color: #0080ff;
  }
  h2 {
    margin: 0;
    padding: 0;
    font-size: 16px;
  }
  div {
    position: absolute;
    top: 50px;
    right: 0;
    left: 0;
    bottom: 0;
    padding: 0 20px;
    overflow-x: hidden;
    overflow-y: auto;
    font-size: 12px;
    line-height: 18px;
    color: #24292e;
  }
  div a {
    color: #0080ff;
    text-decoration: none;
  }
</style>
