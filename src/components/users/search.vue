<template>
  <header>
    <form
      spellcheck="false"
      v-on:submit.prevent>
      <input
        type="text"
        placeholder="Search for a GitHub user"
        :disabled="disabled"
        :value="username"
        v-focus
        @click="handleClick"
        @keyup.enter="handleKeyUp"/>
    </form>
  </header>
</template>

<script>
  import {createNamespacedHelpers} from 'vuex';
  const {mapState, mapActions} = createNamespacedHelpers('users');

  export default {
    created: function() {
      const {query: {username}} = this.$route;
      if (username !== undefined) {
        this.setQuery({
          query: username,
          fetch: false
        });
      }
    },
    computed: {
      ...mapState([
        'status'
      ])
    },
    directives: {
      focus: {
        inserted: function(el) {
          el.focus();
        }
      }
    },
    methods: {
      ...mapActions([
        'setQuery'
      ]),
      handleKeyUp({target: {value}}) {
        if (status !== 'loading') {
          this.setQuery({
            query: value,
            fetch: false
          })
        }
      },
      handleClick({target}) {
        const {value: {length}} = target;
        target.setSelectionRange(0, length);
      }
    },
    name: 'UsersSearch',
    props: [
      'disabled',
      'username'
    ],
    watch: {
      '$route' (to, from) {
        const {query: {username: toUser = null}} = to;
        const {query: {username: fromUser = null}} = from;
        if (toUser || fromUser) {
          this.setQuery({query: toUser ? toUser : fromUser})
        }
      }
    }
  };
</script>

<style scoped>
  form {
    margin: 0 auto;
    width: 500px;
  }
  input {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 40px;
    font-size: 16px;
    text-align: center;
    color: #a9a9a9;
    background-color: #fff;
    border: 1px solid #24292e;
    border-radius: 2px;
    outline: none;
    transition: color .15s, border-color .15s;
  }
  input:hover,
  input:focus {
    border-color: #0080ff;
  }
  input:focus {
    color: #24292e;
  }
  header {
    box-sizing: border-box;
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    margin: 0 auto;
    padding: 25px 0;
    height: 90px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    background-color: #24292e;
  }
  header a {
    color: #fff;
    text-decoration: none;
  }
</style>
