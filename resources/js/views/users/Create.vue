<template>
  <div>
    <Row
      :style="{
        padding: '10px 20px',
        background: '#fff',
      }"
    >
      <Col span="8">
        <h6><Icon type="ios-contacts" size="22" /> Create The User</h6>
      </Col>
      <Col span="8" offset="8">
        <Button type="primary" :style="{ float: 'right' }" to="/users">
          <Icon type="ios-arrow-back" size="20" />Back
        </Button>
      </Col>
    </Row>
    <Row
      :gutter="32"
      :style="{
        margin: '20px 0 0 0',
        padding: '30px 20px',
        background: '#fff',
      }"
    >
      <Col :sm="32" :md="6" :lg="6">
        <div>
          <Upload :before-upload="handleUpload" action="">
            <div
              v-if="!loadingStatus"
              :style="{
                width: '150px',
                height: '150px',
                border: '2px dashed rgb(0 0 0)',
                'border-radius': '5px',
                'object-fit': 'cover',
                'background-size': 'cover',
                'background-image':
                  'url(https://static.thenounproject.com/png/187803-200.png)',
              }"
            ></div>
            <div v-if="file !== null" class="text-break">
              <div
                :style="{
                  width: '150px',
                  height: '150px',
                  'border-radius': '5px',
                  'background-size': '100%',
                  'object-fit': 'cover',
                  'background-size': 'cover',
                  'box-shadow': '5px 5px 5px',
                  'background-image': 'url(' + url + ')',
                }"
              ></div>
            </div>
          </Upload>
        </div>
      </Col>
      <Col :sm="32" :md="18" :lg="18">
        <Form
          ref="formValidate"
          :model="formValidate"
          :rules="ruleValidate"
          :label-width="100"
          style="width: 100%"
        >
          <FormItem label="First Name" prop="firstname">
            <Input
              v-model="formValidate.firstname"
              placeholder="Enter your first name"
            ></Input>
          </FormItem>
          <FormItem label="Last Name" prop="lastname">
            <Input
              v-model="formValidate.lastname"
              placeholder="Enter your last name"
            ></Input>
          </FormItem>
          <FormItem label="Status" prop="active">
            <Select v-model="formValidate.active">
                <Option value="1">Active</Option>
                <Option value="0">InActive</Option>
            </Select>
        </FormItem>
        <FormItem label="Role" prop="is_admin">
            <Select v-model="formValidate.is_admin">
                <Option value="1">Administrator</Option>
                <Option value="0">User Normal</Option>
            </Select>
        </FormItem>
          <FormItem label="E-mail" prop="email">
            <Input
              v-model="formValidate.email"
              placeholder="Enter your e-mail"
            ></Input>
          </FormItem>
          <FormItem label="Password" prop="password">
            <Input
              type="password"
              password
              v-model="formValidate.password"
              placeholder="Enter your password"
            ></Input>
          </FormItem>
          <FormItem label="Re-type Password" prop="password_confirmation">
            <Input
              type="password"
              password
              v-model="formValidate.password_confirmation"
              placeholder="Enter your re-type password"
            ></Input>
          </FormItem>
          <FormItem label="Desc" prop="desc">
            <Input
              v-model="formValidate.desc"
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 5 }"
              placeholder="Enter something..."
            ></Input>
          </FormItem>
          <FormItem>
            <Button type="primary" @click="handleSubmit('formValidate')"
              >Submit</Button
            >
            <Button
              @click="handleReset('formValidate')"
              style="margin-left: 8px"
              >Reset</Button
            >
          </FormItem>
        </Form>
      </Col>
    </Row>
  </div>
</template>
<script>
import { mapActions } from 'vuex';
export default {
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Please fill in the password"));
      } else {
        if (this.formInline.password_confirmation !== "") {
          this.$refs.formInline.validateField("password_confirmation");
        }
        callback();
      }
    };
    const validatePassCheck = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Please fill in the password again"));
      } else if (value !== this.formInline.password) {
        callback(new Error("The two input passwords do not match!"));
      } else {
        callback();
      }
    };
    return {
      file: null,
      url: null,
      loadingStatus: false,
      formValidate: {
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        password_confirmation: "",
        desc: "",
        is_admin: "",
        active: ""
      },
      ruleValidate: {
        firstname: [
          {
            required: true,
            message: "The first name cannot be empty",
            trigger: "blur",
          },
        ],
        lastname: [
          {
            required: true,
            message: "The last name cannot be empty",
            trigger: "blur",
          },
        ],
        active: [
          {
            required: true,
            message: "The stauts cannot be empty",
            trigger: "blur",
          },
        ],
        is_admin: [
          {
            required: true,
            message: "The role cannot be empty",
            trigger: "blur",
          },
        ],
        email: [
          {
            required: true,
            message: "Mailbox cannot be empty",
            trigger: "blur",
          },
          { type: "email", message: "Incorrect email format", trigger: "blur" },
        ],
        password: [
          {
            validator: validatePass,
            required: true,
            trigger: "blur",
          },
        ],
        password_confirmation: [
          {
            validator: validatePassCheck,
            trigger: "blur",
            required: true,
          },
        ],
      },
    };
  },
  methods: {
    ...mapActions(["addUsers"]),
    handleSubmit(name) {
      // this.$refs[name].validate((valid) => {
      //   if (valid) {
      this.addUsers(this.formValidate);
      this.$router.push({ path:'/users' });
      this.$router.go();

      //     this.$Message.success("Success!");
      //   } else {
      //     this.$Message.error("Fail!");
      //   }
      // });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    },
    handleUpload(file) {
      this.file = file;
      this.url = URL.createObjectURL(file);
      this.loadingStatus = true;
      return false;
    },
  },
};
</script>