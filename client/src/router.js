import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Posts from './views/Posts.vue';
import AddPost from './components/Posts/AddPost.vue';
import SignIn from './components/Auth/SignIn.vue';
import SignUp from './components/Auth/SignUp.vue';
import Profile from './components/Auth/Profile.vue';

import AuthGuard from './AuthGuard';

Vue.use(Router);

export default new Router({
  mode: 'history',
  // base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/posts',
      name: 'Posts',
      component: Posts
    },
    {
      path: '/post/add',
      name: 'AddPost',
      component: AddPost
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      beforeEnter: AuthGuard
    },
    {
      path: '/signin',
      name: 'SignIn',
      component: SignIn
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUp
    }
  ]
});
