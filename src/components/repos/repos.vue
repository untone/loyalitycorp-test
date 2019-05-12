<template>
  <routerView name="list" :usernname="username"></routerView>
</template>

<script>
  export default {
    name: 'Repos',
    props: ['username']
  };
</script>
