<template>
  <Row justify="center">
    <Col :sm="12" :md="12" :lg="6">
      <Divider>SignIn Account</Divider>
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
        <Button type="text" class="text-break" :style="{ margin:'0px 0px 0px -15px' }" to="/password/email">Forgot Your Password ?</Button>
        <FormItem>
          <Button type="primary" long @click="handleSubmit('formInline')"
            >Signin</Button
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
import { mapActions, mapState } from 'vuex';
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
          {
            type: "email"
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
  computed: {
    ...mapState(["userdata"])     
  },
  methods: {
    ...mapActions(["signIn"]),
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
        const response = this.signIn(this.formInline);
        response.then(response => { 
          if(response.status === 'error'){
            if(response.validator === true){
              this.$Notice.error({
                title: 'Error!',
                desc: response[0]
              });
            }else{
              this.$Notice.error({
                title: 'Error!',
                desc: response.error
              });
            }
          }else{
            this.$router.push({ path:'/dashboard' })
          }
        })
        }
      });
    },
    handleGoBack(){
      this.$router.push('/')
    }
  },
};
</script>