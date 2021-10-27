<template>
  <div class="layout">
    <Layout :style="{ minHeight: '100vh' }">
      <Header :style="{ background: '#fff', position: 'fixed', width: '100%' }">
        <Menu mode="horizontal" width="auto" theme="light" active-name="1">
          <div class="layout-logo"></div>
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
        <Button @click="instance('info')">Info</Button>
        <Button @click="instance('success')">Success</Button>
        <Button @click="instance('warning')">Warning</Button>
        <Button @click="instance('error')">Error</Button>
      </Content>
      <Footer class="layout-footer-center">2011-2016 &copy; TalkingData</Footer>
    </Layout>
  </div>
</template>
<script>
export default {
  methods: {
    instance(type) {
      const title = "Title Modal";
      const content = "<p>Modal dialog. It's shown in the floating layer. It's used to guide user to do certain operations.Modal provides two usages: normal component using & encapsulated instance calling.</p>";
      switch (type) {
        case "info":
          this.$Modal.info({
            title: title,
            content: content,
          });
          break;
        case "success":
          this.$Modal.success({
            title: title,
            content: content,
          });
          break;
        case "warning":
          this.$Modal.warning({
            title: title,
            content: content,
          });
          break;
        case "error":
          this.$Modal.error({
            title: title,
            content: content,
          });
          break;
      }
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