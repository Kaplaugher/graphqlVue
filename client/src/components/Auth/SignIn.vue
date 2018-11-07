<template>
    <v-container text-xs-center mt-5 pt-5>
        <v-layout row wrap>
            <v-flex xs12 sm6 offset-sm3>
                <h1>Welcome Back!</h1>
            </v-flex>
        </v-layout>

        <!-- error alert -->

        <v-layout v-if="error" row wrap>
            <v-flex xs12 sm6 offset-sm3>
                <form-alert :message="error.message"></form-alert>
            </v-flex>
        </v-layout>

        <v-layout row wrap>
            <v-flex xs12 sm6 offset-sm3>
                <v-card color="secondary" dark>
                    <v-container>
                        <v-form @submit.prevent="handleSigninUser">
                            <v-layout row>
                                <v-flex xs12>
                                    <v-text-field v-model="username" prepend-icon="face" label="Username" type="text" required></v-text-field>
                                </v-flex>
                            </v-layout>
                            <v-layout row>
                                <v-flex xs12>
                                    <v-text-field v-model="password" prepend-icon="extension" label="Password" type="password" required></v-text-field>
                                </v-flex>
                            </v-layout>
                            <v-layout row>
                                <v-flex xs12>
                                    <v-btn :loading="loading" color="accent" type="submit">Sign In
                                        <span slot="loader" class="custom-loader">
                                            <v-icon light>cached</v-icon>
                                        </span>
                                    </v-btn>

                                    <h3>Don't have an account?</h3>
                                    <router-link to="/signup">Sign Up!</router-link>
                                </v-flex>
                            </v-layout>
                        </v-form>
                    </v-container>
                </v-card>
            </v-flex>
        </v-layout>

    </v-container>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'SignIn',
  data() {
    return {
      username: '',
      password: ''
    };
  },
  computed: {
    ...mapGetters(['user', 'error', 'loading'])
  },
  watch: {
    user(value) {
      // if user value changes, redirect to home page
      if (value) {
        this.$router.push('/');
      }
    }
  },

  methods: {
    handleSigninUser() {
      this.$store.dispatch('signinUser', {
        username: this.username,
        password: this.password
      });
    }
  }
};
</script>

<style >
.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}
@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>