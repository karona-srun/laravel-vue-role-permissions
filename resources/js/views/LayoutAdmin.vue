<template>
  <div class="layout">
    <Layout :style="{ minHeight: '100vh' }">
      <Sider
        ref="side1"
        hide-trigger
        collapsible
        :collapsed-width="0"
        v-model="isCollapsed"
      >
        <Menu
          active-name="1-2"
          theme="light"
          width="auto"
          :class="menuitemClasses"
        >
          <MenuItem name="1-0">
            <h5>Roast</h5>
          </MenuItem>
          <MenuItem name="1-1" to="/dashboard">
            <Tooltip content="Dashboard" placement="right">
              <Icon type="md-timer" size="20" />
              <span>Dashboard</span>
            </Tooltip>
          </MenuItem>
          <Submenu name="1">
            <template slot="title">
              <Tooltip content="User Management" placement="right">
                <Icon type="ios-contacts" size="20" />
                <span>User Management</span>
              </Tooltip>
            </template>
            <MenuItem name="1-2" to="/users">
              <Tooltip content="Users" placement="right">
                <Icon type="ios-person-add-outline" size="20" />
                <span>Users</span>
              </Tooltip>
            </MenuItem>
            <MenuItem name="1-3" to="/roles">
              <Tooltip content="Role & Permissions" placement="right">
                <Icon type="ios-settings" size="20"></Icon>
                <span>Role & Permissions</span>
              </Tooltip>
            </MenuItem>
          </Submenu>
        </Menu>
      </Sider>
      <Layout>
        <Header :style="{ padding: 0 }" class="layout-header-bar">
          <Icon
            @click.native="collapsedSider"
            :class="rotateIcon"
            :style="{ margin: '0 20px' }"
            type="md-menu"
            size="20"
          ></Icon>
          <Dropdown
            trigger="click"
            class="float-right"
            style="margin-left: 20px"
          >
            <a href="javascript:void(0)" :style="{ color: '#fff' }">
              <Icon type="ios-cog-outline" size="20" />
              Username
              <Icon type="ios-arrow-down"></Icon>
            </a>
            <DropdownMenu slot="list">
              <DropdownItem>
                <Icon type="ios-person-outline" size="20" />
                Profile Account
              </DropdownItem>
              <DropdownItem>
                <Icon type="ios-analytics-outline" size="20" />
                Activity
              </DropdownItem>
              <DropdownItem>
                <a
                  href="javascript:void(0)"
                  @click="confirm"
                  :style="{ color: '#515a6e' }"
                >
                  <Icon type="ios-log-out" size="20" />
                  Sign Out
                </a>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </Header>
        <Content
          :style="{
            padding: '20px',
            margin: '20px',
            minHeight: '600px',
          }"
        >
          <router-view> </router-view>
        </Content>
      </Layout>
    </Layout>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
export default {
  data() {
    return {
      isCollapsed: false,
    };
  },
  computed: {
    rotateIcon() {
      return ["menu-icon", this.isCollapsed ? "rotate-icon" : ""];
    },
    menuitemClasses() {
      return ["menu-item", this.isCollapsed ? "collapsed-menu" : ""];
    },
  },
  methods: {
    ...mapActions(["signOut"]),
    collapsedSider() {
      this.$refs.side1.toggleCollapse();
    },
    confirm() {
      this.$Modal.confirm({
        title: "Sign Out",
        content: "<p>Do you want to sign out now?</p>",
        onOk: () => {
          const response = this.signOut();
          response.then((response) => {
            console.log(response)
            this.$router.push({ path:"/sign-in" });
          })
        },
        onCancel: () => {
          this.$Message.info("Clicked cancel");
        },
      });
    },
  },
};
</script>

<style scoped>
.layout {
  /* border: 1px solid #d7dde4; */
  background: #f5f7f9;
  position: relative;
  /* border-radius: 4px; */
  overflow: hidden;
}
.layout-header-bar {
  background: #2d8cf0;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
  color: #fff;
}
.layout-logo-left {
  width: 90%;
  height: 30px;
  background: #fff;
  border-radius: 3px;
  margin: 15px auto;
}
.ivu-layout-header {
  height: 52px !important;
  line-height: 3.8;
}
.ivu-layout-sider {
  background: #ffffff !important;
}
.float-right {
  float: right;
  padding-right: 20px;
}
.menu-icon {
  transition: all 0.3s;
}
.rotate-icon {
  transform: rotate(-90deg);
}
.menu-item span {
  display: inline-block;
  overflow: hidden;
  width: 69px;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: bottom;
  transition: width 0.2s ease 0.2s;
}
.menu-item i {
  transform: translateX(0px);
  transition: font-size 0.2s ease, transform 0.2s ease;
  vertical-align: middle;
  font-size: 16px;
}
.collapsed-menu span {
  width: 0px;
  transition: width 0.2s ease;
}
.collapsed-menu i {
  transform: translateX(5px);
  transition: font-size 0.2s ease 0.2s, transform 0.2s ease 0.2s;
  vertical-align: middle;
  font-size: 22px;
}
</style>