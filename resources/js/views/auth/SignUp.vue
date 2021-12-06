<template>
  <Row justify="center">
    <Col :sm="12" :md="12" :lg="6">
      <Divider>SignUp Account</Divider>
      <Form ref="formInline" :model="formInline" :rules="ruleInline">
        <FormItem prop="First Name">
          <Input
            type="text"
            prefix="ios-person-outline"
            v-model="formInline.firstname"
            placeholder="First Name"
            focus
          >
          </Input>
        </FormItem>
        <FormItem prop="Last Name">
          <Input
            type="text"
            prefix="ios-person-outline"
            v-model="formInline.lastname"
            placeholder="Last Name"
            focus
          >
          </Input>
        </FormItem>
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
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        password_confirmation: "",
      },
      ruleInline: {
        firstname: [
          {
            required: true,
            message: "Please fill in the first name",
            trigger: "blur",
          },
        ],
        lastname: [
          {
            required: true,
            message: "Please fill in the first name",
            trigger: "blur",
          },
        ],
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
    ...mapActions(["signUp"]),
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        const response = this.signUp(this.formInline);
        
        response.then(response => {
          console.log(response);

          if(response.status === 'error'){
            this.$Notice.error({
                title: 'Error!',
                desc: response[0]
            });
          }else{
            this.$Notice.success({
                title: 'Success!',
                desc: response.message
            });
            this.$router.push({ path:"/sign-in" });
          }
        })
        
        // if (valid) {
        //   this.$Message.success({
        //     background: true,
        //     content: "Success!",
        //   });
          // localStorage.signedIn = true;
          // localStorage.setItem("user", JSON.stringify(this.formInline));
          // localStorage.setItem("jwt", this.formInline);
          // this.$router.push("/dashboard");
        // } else {
        //   this.$Message.error({
        //     background: true,
        //     content: "Fail!",
        //   });
        //   localStorage.signedIn = false;
        // }
      });
    },
    handleGoBack() {
      this.$router.push("/");
    },
  },
};
</script>