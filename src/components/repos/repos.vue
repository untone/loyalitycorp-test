<template>
  <routerView name="list" :usernname="username"></routerView>
</template>

<script>
  module.exports = {
    name: 'Repos',
    props: ['username']
  };
</script>
