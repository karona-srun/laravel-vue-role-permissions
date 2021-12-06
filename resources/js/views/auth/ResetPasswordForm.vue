<template>
  <Row justify="center">
    <Col :sm="12" :md="12" :lg="6">
      <Divider>New Password</Divider>
      <h5>Set new your password</h5>
      <p>
        Enter your email address and we will send your instruction on how to
        reset your password.
      </p>
      <br />
      <Form ref="formInline" :model="formInline" :rules="ruleInline">
        <FormItem prop="email">
          <Input
            type="email"
            prefix="ios-mail-outline"
            v-model="formInline.email"
            placeholder="Email address"
            focus
          >
          </Input>
        </FormItem>
        <FormItem prop="password">
          <Input
            type="password"
            password
            prefix="ios-lock-outline"
            v-model="formInline.password"
            placeholder="Password"
          >
          </Input>
        </FormItem>
        <FormItem prop="password_confirmation">
          <Input
            type="password"
            password
            prefix="ios-lock-outline"
            v-model="formInline.password_confirmation"
            placeholder="Re-Type Password"
          ></Input>
        </FormItem>
        <FormItem>
          <Button type="primary" long @click="handleSubmit('formInline')"
            >Update Password</Button
          >
          <Divider plain>Or</Divider>
          <Button type="primary" long @click="handleGoBack">Go Back</Button>
        </FormItem>
      </Form>
    </Col>
  </Row>
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
      formInline: {
        email: this.$route.query.email,
        password: "",
        password_confirmation: "",
        token: this.$route.path.split("/")[3]
      },
      ruleInline: {
        email: [
          {
            required: true,
            message: "Please fill in the email address",
            trigger: "blur",
          },
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
    ...mapActions(["resetpassword"]),
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        const response = this.resetpassword(this.formInline);
        response.then(response => {
          if (valid) {
          this.$Notice.success({
            title: "Notification Success!",
            desc: response.message,
          });
          
        } else {
          this.$Notice.error({
            title: "Notification Fail!",
            desc: "Please try again!",
          });
        }
        })
      });
    },
    handleGoBack() {
      this.$router.push("/");
    },
  },
};
</script>