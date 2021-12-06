<template>
  <Row justify="center">
    <Col :sm="12" :md="12" :lg="6">
      <Divider>Reset Password</Divider>
      <h5>Forgot your password</h5>
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
            placeholder="Enter email address"
            focus
          >
          </Input>
        </FormItem>
        <FormItem>
          <Button type="primary" long @click="handleSubmit('formInline')"
            >Reset Password</Button
          >
          <Divider plain>Or</Divider>
          <Button type="primary" long @click="handleGoBack">Go Back</Button>
        </FormItem>
      </Form>
    </Col>
  </Row>
</template>
<script>
import { mapActions } from "vuex";
export default {
  name: "ForgotPassword",
  data() {
    return {
      formInline: {
        email: "",
      },
      ruleInline: {
        email: [
          {
            required: true,
            message: "Please fill in the email address",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    ...mapActions(["forgotpassword"]),
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        const response = this.forgotpassword(this.formInline["email"]);
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