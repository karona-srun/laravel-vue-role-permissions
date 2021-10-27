<template>
  <Row justify="center">
    <Col span="6">
      <Divider>SignUp Account</Divider>
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
        <FormItem prop="passwdCheck">
          <Input
            type="password"
            password
            prefix="ios-lock-outline"
            v-model="formInline.passwdCheck"
            placeholder="Re-Type Password"
          ></Input>
        </FormItem>
        <FormItem>
          <Button type="primary" long @click="handleSubmit('formInline')"
            >Signin</Button
          >
          <Divider plain>Or</Divider>
          <Button type="primary" long @click="handleGoBack">Go Back</Button>
        </FormItem>
      </Form>
    </Col>
  </Row>
</template>
<script>
export default {
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Please fill in the password"));
      } else {
        if (this.formInline.passwdCheck !== "") {
          this.$refs.formInline.validateField("passwdCheck");
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
        email: "",
        password: "",
        passwdCheck: "",
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
        passwdCheck: [
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
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$Message.success({
            background: true,
            content: "Success!",
          });
          localStorage.signedIn = true;
          localStorage.setItem("user", JSON.stringify(this.formInline));
          localStorage.setItem("jwt", this.formInline);
          this.$router.push("/dashboard");
        } else {
          this.$Message.error({
            background: true,
            content: "Fail!",
          });
          localStorage.signedIn = false;
        }
      });
    },
    handleGoBack() {
      this.$router.push("/");
    },
  },
};
</script>