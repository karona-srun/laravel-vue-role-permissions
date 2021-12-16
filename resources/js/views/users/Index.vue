<template>
  <div>
    <Row
      class="rowTitle"
      :style="{
        padding: '10px 20px',
        background: '#fff',
      }"
    >
      <Col :sm="12" :md="12" :lg="12">
        <h6><Icon type="ios-contacts" size="22" /> User List</h6>
      </Col>
      <Col :sm="12" :md="12" :lg="12">
        <Button type="primary" :style="{ float: 'right' }" to="/create-user">
          <Icon type="ios-person-add" size="20" />Create New User
        </Button>
      </Col>
    </Row>
    <Collapse v-model="collapseFilter" simple>
      <Panel name="1">
        Filter
        <p slot="content">
          <Form>
            <Row :gutter="32">
                <Col :sm="12" :md="8" :lg="6">
                    <FormItem label="SELECT ITEMS" label-position="top">
                      <Select v-model="selectItems" prefix="md-funnel">
                        <Option value="10">10</Option>
                        <Option value="20">20</Option>
                        <Option value="30">30</Option>
                        <Option value="50">50</Option>
                        <Option value="100">100</Option>
                      </Select>
                    </FormItem>
                </Col>
                <Col :sm="12" :md="8" :lg="6">
                    <FormItem label="SEARCH" label-position="top">
                        <Input
                          suffix="ios-search"
                          type="text"
                          v-model="keywords"
                          clearable
                          placeholder="Search"
                        ></Input>
                    </FormItem>
                </Col>
                <Col :sm="12" :md="8" :lg="6">
                    <FormItem label="FILTER DATE" label-position="top">
                      <DatePicker
                        type="daterange"
                        v-model="daterange"
                        placement="bottom-end"
                        format="dd-MM-yyyy"
                        placeholder="Filter Date"
                        style="width: auto"
                      ></DatePicker>
                    </FormItem>
                </Col>
            </Row>
          </Form>
        </p>
      </Panel>
    </Collapse>
    <div style="padding-top: 10px" v-for="(item, i) in usersList" :key="i">
      <Card :bordered="false">
        <div slot="title">
          <a :href="'users/user-detail/' + item.id" slot="extra">
            <img :src="item.avatar == '' || item.avatar == null ? avatarFake : item.avatar" class="avatar" alt="avatar" />
            <span class="title">{{ item.full_name }}</span>
          </a>
        </div>
        <Row :gutter="32">
          <Col :sm="32" :md="10" :lg="8">
            <p :style="pStyle">Email</p>
            <p>{{ item.email }}</p>
          </Col>
          <Col :sm="32" :md="10" :lg="8">
            <p :style="pStyle">Status</p>
            <Button type="success" shape="circle" v-if="item.active === 0">InActive</Button>
            <Button type="success" shape="circle" v-else>Active</Button>
          </Col>
          <Col :sm="32" :md="10" :lg="8">
            <p :style="pStyle">Role</p>
            <Button type="success" shape="circle" v-if="item.is_admin === 0">User Normal</Button>
            <Button type="success" shape="circle" v-else>Administrator</Button>
          </Col>
          <Col :sm="32" :md="10" :lg="8">
          <p :style="pStyle">Description</p>
            <p>{{ item.desc }}</p>
          </Col>
        </Row>
        <br>
        <Row :gutter="32">
          <Col :sm="12" :md="8" :lg="6">
            <p :style="pStyle">Created At</p>
            <p>{{ item.created_at }}</p>
          </Col>
          <Col :sm="12" :md="8" :lg="6">
            <p :style="pStyle">Updated At</p>
            <p>{{ item.updated_at }}</p>
          </Col>
          <Col :sm="12" :md="8" :lg="6">
            <p :style="pStyle">Created By</p>
            <p>{{ item.created_by }}</p>
          </Col>
          <Col :sm="12" :md="8" :lg="6">
            <p :style="pStyle">Updated By</p>
            <p>{{ item.updated_by }}</p>
          </Col> 
        </Row>
      </Card>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  data() {
    return {
      collapseFilter: "",
      pStyle: {
        fontSize: '16px',
        color: 'rgba(0,0,0,0.85)',
        lineHeight: '24px',
        display: 'block',
        marginBottom: '5px'
      },
      selectItems: "",
      keywords: null,
      daterange: "",
      avatarFake:
            "https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar",
    };
  },
  watch: {
      keywords(after, before) {
          this.getResults();
      }
  },
  methods: {
    ...mapActions(["fetchUsers", "deleteUser", "liveSearch"]),
    getResults() {
      const data = {
        keywords: this.keywords
      };
      const response = this.liveSearch(data)
      response.then(res => {
          this.usersList = res.users
          console.log(res)
        })
        .catch(error => {});
    }
  },
  computed: mapGetters(["usersList"]),
  created() {
    this.fetchUsers()
  }
};
</script>
<style>
.avatar {
  border-radius: 50%;
  pointer-events: none;
  background-size: cover;
  border: 2px solid #2d8cf0;
  padding: 2px;
  width: 50px;
  height: 50px;
  z-index: -1;
}
.title {
  font-size: 20px;
  color: #2d8cf0;
}
.ivu-card-head{
  border-bottom: 0px solid #e8eaec00 !important;
}
.rowTitle {
  border-left: 1px solid #e8eaec;
  border-right: 1px solid #e8eaec;
  border-top: 1px solid #e8eaec;
  border-bottom: 0px solid #e8eaec00 !important;
}
.ivu-collapse-simple {
  border-left: 1px solid #e8eaec !important;
  border-right: 1px solid #e8eaec !important;
  border-top: 0px solid #e8eaec00 !important;
  border-bottom: 1px solid #e8eaec !important;
}
</style>