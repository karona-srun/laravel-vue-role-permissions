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
          <Form :model="formTop">
            <Row :gutter="32">
                <Col :sm="12" :md="8" :lg="6">
                    <FormItem label="SELECT ITEMS" label-position="top">
                      <Select v-model="formTop.selectItems" prefix="md-funnel">
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
                          v-model="formTop.search"
                          placeholder="Search"
                        ></Input>
                    </FormItem>
                </Col>
                <Col :sm="12" :md="8" :lg="6">
                    <FormItem label="FILTER DATE" label-position="top">
                      <DatePicker
                        type="daterange"
                        v-model="formTop.daterange"
                        placement="bottom-end"
                        format="dd-MM-yyyy"
                        placeholder="Filter Date"
                        style="width: auto"
                      ></DatePicker>
                    </FormItem>
                </Col>
                <Col :sm="12" :md="8" :lg="6">
                    <FormItem label="ACTIONS" label-position="top"><br>
                      <Button @click="instance('info')">Info</Button>
                      <Button @click="instance('success')">Success</Button>
                      <Button @click="instance('warning')">Warning</Button>
                      <Button @click="instance('error')">Error</Button>
                    </FormItem>
                </Col>
            </Row>
          </Form>
        </p>
      </Panel>
    </Collapse>
    <div style="padding-top: 10px" v-for="(item, i) in data" :key="i">
      <Card :bordered="false">
        <div slot="title">
          <a :href="'users/user-detail/' + i" slot="extra">
            <img :src="item.avatar" class="avatar" alt="avatar" />
            <span class="title">{{ item.fullName }}</span>
          </a>
        </div>
        <Row :gutter="32">
          <Col :sm="32" :md="10" :lg="8">
            <p :style="pStyle">Email</p>
            <p>{{ item.email }}</p>
          </Col>
          <Col :sm="32" :md="10" :lg="8">
          <p :style="pStyle">Content</p>
            <p>{{ item.content }}</p>
            </Col>
          <Col :sm="32" :md="10" :lg="8">
          <p :style="pStyle">Description</p>
            <p>{{ item.description }}</p>
          </Col>
        </Row>
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
      formTop: {
        selectItems: "",
        search: "",
        daterange: "",
      },
      data: [
        {
          email: "email@example.com",
          fullName: "Karona Srun",
          created_at: "02-11-2021 10:10 AM",
          updated_at: "02-11-2021 11:10 AM",
          created_by: "Karona Sophea",
          updated_by: "Karona Amera",
          description:
            "This is description, this is description, this is description.",
          avatar:
            "https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar",
          content:
            "This is the content, this is the content, this is the content, this is the content.",
        },
        {
          email: "email@example.com",
          fullName: "Karona Srun",
          created_at: "02-11-2021 10:10 AM",
          updated_at: "02-11-2021 11:10 AM",
          created_by: "Karona Sophea",
          updated_by: "Karona Amera",
          description:
            "This is description, this is description, this is description.",
          avatar:
            "https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar",
          content:
            "This is the content, this is the content, this is the content, this is the content.",
        },
        {
          email: "email@example.com",
          fullName: "Karona Srun",
          created_at: "02-11-2021 10:10 AM",
          updated_at: "02-11-2021 11:10 AM",
          created_by: "Karona Sophea",
          updated_by: "Karona Amera",
          description:
            "This is description, this is description, this is description.",
          avatar:
            "https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar",
          content:
            "This is the content, this is the content, this is the content, this is the content.",
        },
      ],
    };
  },
  methods: {
    instance(info) {
      alert(info);
    },
  },
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