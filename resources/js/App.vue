<template>
    <router-view> </router-view>
</template>
<script>
export default {
  mounted() {
    // if (localStorage.getItem('jwt') == null) {
    //   this.$router.replace('/sign-in').catch(()=>{});
    // }else{
    //   this.$router.replace('/dashboard').catch(()=>{});
    // }
  },
}
</script>