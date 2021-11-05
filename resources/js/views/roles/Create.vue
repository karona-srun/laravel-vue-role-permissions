<template>
  <div>
    <Row
      :style="{
        padding: '10px 20px',
        background: '#fff',
      }"
    >
      <Col span="8">
        <h6><Icon type="ios-contacts" size="22" /> Create The Role</h6>
      </Col>
      <Col span="8" offset="8">
        <Button type="primary" :style="{ float: 'right' }" to="/roles">
          <Icon type="ios-arrow-back" size="20" />Back
        </Button>
      </Col>
    </Row>
    <Row
      :style="{
        margin: '20px 0 0 0',
        padding: '30px 20px',
        background: '#fff',
      }"
    >
      <Form
        ref="formValidate"
        :model="formValidate"
        :rules="ruleValidate"
        :label-width="100"
        style="width: 100%"
      >
        <FormItem label="Role Name" prop="name">
          <Input
            v-model="formValidate.name"
            placeholder="Enter your name"
          ></Input>
        </FormItem>
        <FormItem label="Permissions">
          <Select
            v-model="model20"
            multiple
            filterable
            :remote-method="remoteMethod4"
            :default-label="['北京', '深圳']"
            :loading="loading"
            @on-set-default-options="setDefaultOptions"
          >
            <Option
              v-for="(option, index) in list"
              :value="option.value"
              :key="index"
              >{{ option.label }}</Option
            >
          </Select>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="handleSubmit('formValidate')"
            >Submit</Button
          >
          <Button @click="handleReset('formValidate')" style="margin-left: 8px"
            >Reset</Button
          >
        </FormItem>
      </Form>
    </Row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      model20: [],
      options: [],
      loading: false,
      formValidate: {
        name: "",
      },
      list: [
        {
          value: "beijing",
          label: "beijing",
        },
        {
          value: "shanghai",
          label: "shanghai",
        },
        {
          value: "shenzhen",
          label: "shenzhen",
        },
        {
          value: "hangzhou",
          label: "hangzhou",
        },
        {
          value: "guangzhou",
          label: "guangzhou",
        },
      ],
      ruleValidate: {
        name: [
          {
            required: true,
            message: "The name cannot be empty",
            trigger: "blur",
          },
        ],
        permissions: [
          {
            required: true,
            message: "Please enter the permissions",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$Message.success("Success!");
        } else {
          this.$Message.error("Fail!");
        }
      });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    },
    remoteMethod4(query) {
      if (query !== "") {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          this.options = this.list.filter(
            (item) => item.label.indexOf(query) > -1
          );
        }, 200);
      } else {
        this.options = [];
      }
    },
    setDefaultOptions(options) {
      this.options = options;
    },
  },
};
</script>