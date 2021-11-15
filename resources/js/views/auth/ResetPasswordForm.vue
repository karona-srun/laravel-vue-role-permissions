<template>
  <Row justify="center">
    <Col span="6">
      <Divider>New Password</Divider>
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
        <Button type="text" class="text-break" :style="{ margin:'0px 0px 0px -15px' }" to="/forgot-password">Forgot Your Password ?</Button>
        <FormItem>
          <Button type="primary" long @click="handleSubmit('formInline')"
            >Update Password</Button>
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
        password: "",
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
            required: true,
            message: "Please fill in the password.",
            trigger: "blur",
          },
          {
            type: "string",
            min: 6,
            message: "The password length cannot be less than 6 bits",
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