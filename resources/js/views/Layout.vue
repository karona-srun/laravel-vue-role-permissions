<template>
  <div class="layout">
    <Layout :style="{ minHeight: '100vh' }">
      <Header :style="{ background: '#fff', position: 'fixed', width: '100%' }">
        <Menu mode="horizontal" width="auto" theme="light" active-name="1">
          <div class="layout-logo" @click.prevent="homePage">
            <img src="favicon.png" alt="logo" width="30px" height="30px" style="margin-top:-32px;width: 100px;">
          </div>
          <div class="layout-nav">
            <MenuItem name="2" to="sign-up">
              <Icon type="ios-person-add-outline" size="20" />
              Sign Up
            </MenuItem>
            <MenuItem name="3" to="sign-in">
              <Icon type="ios-log-in" size="20"></Icon>
              Sign In
            </MenuItem>
          </div>
        </Menu>
      </Header>
      <Content
        :style="{
          margin: '88px 20px 0',
          padding: '20px',
          background: '#fff',
          minHeight: '500px',
        }"
      >
        <h1 class="text-center mb-3">Welcome to home page</h1>
        <router-view> </router-view>
      </Content>
      <Footer class="layout-footer-center">2011-2016 &copy; TalkingData</Footer>
    </Layout>
  </div>
</template>
<script>
export default {
  methods: {
    homePage(){
      this.$router.push('/');
    },
  },
};
</script>
<style scoped>
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}
.layout-logo {
  width: 100px;
  height: 30px;
  background: #5b6270;
  border-radius: 3px;
  float: left;
  position: relative;
  top: 15px;
  left: 20px;
}
.layout-nav {
  float: right;
  margin: 0 auto;
  margin-right: 20px;
}
.ivu-layout-header {
  padding: 0px;
  border: 3px solid #fff !important;
}
.layout-footer-center {
  text-align: center;
}
.ivu-menu-light.ivu-menu-horizontal {
  border-bottom: 0px solid #fff;
}
</style>