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
          <FormItem label="E-mail" prop="mail">
            <Input
              v-model="formValidate.mail"
              placeholder="Enter your e-mail"
            ></Input>
          </FormItem>
          <FormItem label="Content" prop="content">
            <Input
              v-model="formValidate.content"
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 5 }"
              placeholder="Enter something..."
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
export default {
  data() {
    return {
      file: null,
      url: null,
      loadingStatus: false,
      formValidate: {
        firstname: "",
        lastname: "",
        mail: "",
        city: "",
        gender: "",
        interest: [],
        date: "",
        content: "",
        desc: "",
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
        mail: [
          {
            required: true,
            message: "Mailbox cannot be empty",
            trigger: "blur",
          },
          { type: "email", message: "Incorrect email format", trigger: "blur" },
        ],
        content: [
          {
            required: true,
            message: "Please enter the content",
            trigger: "change",
          },
        ],
        gender: [
          {
            required: true,
            message: "Please select gender",
            trigger: "change",
          },
        ],
        interest: [
          {
            required: true,
            type: "array",
            min: 1,
            message: "Choose at least one hobby",
            trigger: "change",
          },
          {
            type: "array",
            max: 2,
            message: "Choose two hobbies at best",
            trigger: "change",
          },
        ],
        date: [
          {
            required: true,
            type: "date",
            message: "Please select the date",
            trigger: "change",
          },
        ],
        time: [
          {
            required: true,
            type: "string",
            message: "Please select time",
            trigger: "change",
          },
        ],
        desc: [
          {
            required: true,
            message: "Please enter a personal introduction",
            trigger: "blur",
          },
          {
            type: "string",
            min: 20,
            message: "Introduce no less than 20 words",
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
    handleUpload(file) {
      this.file = file;
      this.url = URL.createObjectURL(file);
      this.loadingStatus = true;
      return false;
    },
  },
};
</script>