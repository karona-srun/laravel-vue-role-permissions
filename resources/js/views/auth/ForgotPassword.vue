<template>
  <Row justify="center">
    <Col span="6">
      <Divider>Reset Password</Divider>
      <Form ref="formInline" :model="formInline" :rules="ruleInline">
        <FormItem prop="email">
          <Input
            type="email"
            prefix="ios-person-outline"
            v-model="formInline.email"
            placeholder="Email address"
            focus
          >
          </Input>
        </FormItem>
        <FormItem>
          <Button type="primary" long @click="handleSubmit('formInline')"
            >Send Password Reset Link</Button
          >
          <Divider plain>Or</Divider>
          <Button type="primary" long @click="handleGoBack"
            >Go Back</Button
          >
        </FormItem>
      </Form>
    </Col>
  </Row>
</template>
<script>
export default {
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
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$Notice.success({
                title: 'Notification Success!',
                desc: 'Success!'
            });
            localStorage.signedIn = true;
            localStorage.setItem('user',JSON.stringify(this.formInline))
            localStorage.setItem('jwt',this.formInline)
            this.$router.push('/dashboard')
        } else {
            this.$Notice.error({
                title: 'Notification Fail!',
                desc: 'Please try again!'
            });

            localStorage.signedIn = false;
        }
      });
    },
    handleGoBack(){
      this.$router.push('/')
    }
  },
};
</script>