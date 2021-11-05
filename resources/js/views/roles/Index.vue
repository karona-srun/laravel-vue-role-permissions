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
        <h6><Icon type="ios-contacts" size="22" /> Role List</h6>
      </Col>
      <Col :sm="12" :md="12" :lg="12">
        <Button type="primary" :style="{ float: 'right' }" to="/create-role">
          <Icon type="ios-add" size="20" />Create New Role
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
                    <FormItem label="FILTER CREATED AT" label-position="top">
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
                    <FormItem label="FILTER UPDATED AT" label-position="top">
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
            </Row>
          </Form>
        </p>
      </Panel>
    </Collapse>
    <div style="padding-top: 10px">
      <Card :bordered="false">
        <table class="table">
          <thead>
            <tr>
              <th>No</th>
              <th>Role Name</th>
              <th>Permissions</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>1</th>
              <th>Administrator</th>
              <th>
                <Tag size="medium" color="blue">default</Tag>
                <Tag size="medium" color="blue">default</Tag>
                <Tag size="medium" color="blue">default</Tag>
              </th>
              <th>
                <Button type="primary" size="small" style="margin-right: 5px" to="/role/edit-role/2"><Icon type="ios-create-outline" size="20" /></Button>
                <Button type="error" size="small"><Icon type="ios-trash-outline" size="20"/></Button>
              </th>
            </tr>
          </tbody>
        </table>
        <!-- <Table border :columns="columns12" :data="data6">
        <template slot-scope="{ row }" slot="name">
            <strong>{{ row.name }}</strong>
        </template>
        <template slot-scope="{row, index}" slot="action">
            <Button type="primary" size="small" style="margin-right: 5px" to="/role/edit-role/2"><Icon type="ios-create-outline" size="20" /></Button>
            <Button type="error" size="small" @click="remove(index)"><Icon type="ios-trash-outline" size="20"/></Button>
        </template> -->
    </Table>
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
        fontSize: "16px",
        color: "rgba(0,0,0,0.85)",
        lineHeight: "24px",
        display: "block",
        marginBottom: "5px",
      },
      formTop: {
        selectItems: "",
        search: "",
        daterange: "",
      },
      columns12: [
        {
          title: "Role Name",
          slot: "name",
          sortable: true,
        },
        {
          title: "Permissions",
          key: "permissions",
          sortable: true,
        },
        {
          title: "Action",
          slot: "action",
          width: 150,
          align: "center",
        },
      ],
      data6: [
        {
          name: "Super Administrator",
          permissions: "24, 25, 26, 27, 28, 29, 30, 31, 32, 33",
        },
        {
          name: "Administrator",
          permissions: "24, 25, 26, 27, 28, 29, 30, 31, 32, 33",
        },
        {
          name: "Developer",
          permissions: "24, 25, 26, 27, 28, 29, 30, 31, 32, 33",
        },
        {
          name: "User",
          permissions: "24, 25, 26, 27, 28, 29, 30, 31, 32, 33",
        },
      ],
    };
  },
  methods: {
    show(index) {
      this.$Modal.info({
        title: "Role Information",
        content: `Role Name：${this.data6[index].name}<br>Permissions: ${this.data6[index].permissions}<br>`,
      });
    },
    remove(index) {
      this.data6.splice(index, 1);
    },
  },
};
</script>