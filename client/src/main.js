import '@babel/polyfill';
import Vue from 'vue';
import './plugins/vuetify';
import App from './App.vue';
import router from './router';
import store from './store';

import ApolloClient from 'apollo-boost';
import VueApollo from 'vue-apollo';

Vue.use(VueApollo);

export const defaultClient = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  // include auth token with request made to back end
  fetchOptions: {
    credentials: 'include'
  },
  request: operation => {
    if (!localStorage.token) {
      localStorage.setItem('token', '');
    }
    // operation adds token to req we make, auth header
    operation.setContext({
      headers: {
        authorization: localStorage.getItem('token')
      }
    });
  },
  onError: ({ graphQLErrors, networkError }) => {
    if (networkError) {
      console.log('[networkError]', networkError);
    }

    if (graphQLErrors) {
      for (let err of graphQLErrors) {
        console.dir(err);
      }
    }
  }
});

const apolloProvider = new VueApollo({ defaultClient });

Vue.config.productionTip = false;

new Vue({
  apolloProvider,
  router,
  store,
  render: h => h(App),
  created() {
    // execute getCurrentUser query
    this.$store.dispatch('getCurrentUser');
  }
}).$mount('#app');
