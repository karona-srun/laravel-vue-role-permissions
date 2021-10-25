<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-3">
        <main class="form-signin">
          <form>
            <img
              class="mb-4 item-content-center"
              src="favicon.png"
              alt=""
              width="72"
              height="57"
            />
            <h1 class="h3 mb-3 fw-normal">Please sign in</h1>

            <div class="form-floating mb-3">
              <input
                type="email"
                class="form-control"
                id="floatingInput"
                placeholder="name@example.com"
              />
              <label for="floatingInput">Email address</label>
            </div>
            <div class="form-floating mb-3">
              <input
                type="password"
                class="form-control"
                id="floatingPassword"
                placeholder="Password"
              />
              <label for="floatingPassword">Password</label>
            </div>

            <div class="checkbox mb-3">
              <label>
                <input type="checkbox" value="remember-me" /> Remember me
              </label>
            </div>
            <button class="w-100 btn btn-primary" type="submit">Sign in</button>
          </form>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      products: {},
    };
  },

  methods: {
    authProvider(provider) {
      let self = this;
      this.$auth
        .authenticate(provider)
        .then((response) => {
          self.socialLogin(provider, response);
        })
        .catch((err) => {
          console.log({ err: err });
        });
    },
    socialLogin(provider, response) {
      this.$http
        .post("/social/" + provider, response)
        .then((response) => {
          return response.data.token;
        })
        .catch((err) => {
          console.log({ err: err });
        });
    },
  },
};
</script>