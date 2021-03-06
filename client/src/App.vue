<template>
  <v-app id="app" style="background: #E3E3EE">
    <!-- side nav -->
    <v-navigation-drawer app temporary fixed v-model="sideNav">
      <v-toolbar color="accent" dark flat>
        <v-toolbar-side-icon @click="toggleSideNav()"></v-toolbar-side-icon>
        <router-link to="/" tag="span" style="cursor: pointer">
          <h1 class="title pl-3">VueShare</h1>
        </router-link>
      </v-toolbar>

      <v-divider></v-divider>

      <!-- side nav links -->
      <v-list>
        <v-list-tile v-for="item in sideNavItems" :key="item.title" :to="item.link" ripple>
          <v-list-tile-action>
            <v-icon>{{item.icon}}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            {{item.title}}
          </v-list-tile-content>
        </v-list-tile>
        <!-- signout button -->
        <v-list-tile v-if="user" @click="handleSignoutUser">
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>Signout</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <!-- Horizontal Nav -->
    <v-toolbar fixed color="primary" dark>
      <v-toolbar-side-icon @click="toggleSideNav()"></v-toolbar-side-icon>
      <!-- app title -->
      <v-toolbar-title class="hidden-xs-only">
        <router-link to="/" tag="span">
          VueShare

        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <v-text-field flex prepend-icon="search" placeholder="Search Posts" color="accent" single-line hide-details>
      </v-text-field>

      <v-spacer></v-spacer>
      <!-- horizontal nav bar -->
      <v-toolbar-items class="hidden-xs-only">
        <v-btn flat v-for="item in horizontalNavItems" :key="item.title" :to="item.link">
          <v-icon left class="hidden-sm-only">{{item.icon}}</v-icon>
          {{item.title}}
        </v-btn>

        <!-- profile button -->
        <v-btn flat to="/profile" v-if="user">
          <v-icon class="hidden-sm-only" left>account_box</v-icon>
          <v-badge right color="accent" :class="{ 'bounce': badgeAnimated }">
            <span slot="badge" v-if="userFavorites.length">{{userFavorites.length}}</span>
            Profile
          </v-badge>
        </v-btn>
        <!-- signout button -->

        <v-btn flat v-if="user" @click="handleSignoutUser">
          <v-icon class="hidden-sm-only" left>exit_to_app</v-icon>
          Signout
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <main>
      <v-container class="mt-4">
        <transition name="fade">
          <router-view />

        </transition>
        <!-- Auth snackbar -->
        <v-snackbar v-model="authSnackbar" color="success" :timeout="4000" bottom left>
          <v-icon class="mr-3">check_circle</v-icon>
          <h3>You are now signed in!</h3>
          <v-btn dark flat @click="authSnackbar = false">Close</v-btn>

        </v-snackbar>

        <!-- auth error snackbar -->

        <v-snackbar v-if="authError" v-model="authErrorSnackbar" color="info" :timeout="4000" bottom left>
          <v-icon class="mr-3">cancel</v-icon>
          <h3>{{authError.message}}</h3>
          <v-btn dark flat to="/signin">Sign In</v-btn>

        </v-snackbar>

      </v-container>

    </main>
  </v-app>
</template>
<script>
import { mapGetters } from 'vuex';
import { setTimeout } from 'timers';
export default {
  name: 'App',
  computed: {
    ...mapGetters(['user', 'authError', 'userFavorites']),
    horizontalNavItems() {
      let items = [
        { icon: 'chat', title: 'Posts', link: '/posts' },
        { icon: 'lock_open', title: 'Sign In', link: '/signin' },
        { icon: 'create', title: 'Sign Up', link: '/signup' }
      ];
      if (this.user) {
        items = [{ icon: 'chat', title: 'Posts', link: '/posts' }];
      }
      return items;
    },
    sideNavItems() {
      let items = [
        { icon: 'chat', title: 'Posts', link: '/posts' },
        { icon: 'lock_open', title: 'Sign In', link: '/signin' },
        { icon: 'create', title: 'Sign Up', link: '/signup' }
      ];
      if (this.user) {
        items = [
          { icon: 'chat', title: 'Posts', link: '/posts' },
          { icon: 'stars', title: 'Create Post', link: '/post/add' },
          { icon: 'account_box', title: 'Profile', link: '/profile' }
        ];
      }
      return items;
    }
  },
  data() {
    return {
      sideNav: false,
      authSnackbar: false,
      authErrorSnackbar: false,
      badgeAnimated: false
    };
  },
  methods: {
    toggleSideNav() {
      this.sideNav = !this.sideNav;
    },
    handleSignoutUser() {
      this.$store.dispatch('signoutUser');
    }
  },
  watch: {
    user(newValue, oldValue) {
      // if we have no previous value, show snackbar
      console.log('new value', newValue);
      console.log('old value', oldValue);
      if (oldValue === null) {
        this.authSnackbar = true;
      }
    },
    authError(value) {
      // if auth error, show snackbar
      if (value !== null) {
        this.authErrorSnackbar = true;
      }
    },
    userFavorites(value) {
      if (value) {
        this.badgeAnimated = true;
        setTimeout(() => (this.badgeAnimated = false), 1000);
      }
    }
  }
};
</script>


<style lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition-property: all;
  transition-duration: 0.25s;
}
.fade-enter-active {
  transition-delay: 0.25s;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
  transform: translateX(-25px);
}

// user fav animation
.bounce {
  animation: bounce 1s both;
}

@keyframes bounce {
  0%,
  20%,
  53%,
  100% {
    transform: translate3d(0, 0, 0);
  }
  40%,
  43% {
    transform: translate3d(0, -20px, 0);
  }
  70% {
    transform: translate3d(0, -10px, 0);
  }
  90% {
    transform: translate3d(0, -4px, 0);
  }
}
</style>
