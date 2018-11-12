<template>
    <v-container text-xs-center v-if="infiniteScrollPosts">
        <div v-for="post in infiniteScrollPosts.posts" :key="post._id">
            <img :src="post.imageUrl" height="100px">
            <h3>{{post.title}}</h3>
        </div>
        <v-btn @click="showMorePosts" v-if="showMoreEnabled">Fetch More</v-btn>

    </v-container>
</template>

<script>
import { INFINITE_SCROLL_POSTS } from '../queries.js';

const pageSize = 2;

export default {
  name: 'Posts',
  data() {
    return {
      pageNum: 1,
      showMoreEnabled: true
    };
  },
  apollo: {
    infiniteScrollPosts: {
      query: INFINITE_SCROLL_POSTS,
      variable: {
        pageNum: 1,
        pageSize
      }
    }
  },
  methods: {
    showMore() {
      //   fetch more data and transform original result
      this.pageNum += 1;
      this.$apollo.queries.infiniteScrollPosts.fetchMore({
        variables: {
          // pagenum incremented by one
          pageNum: this.pageNum,
          pageSize: this.pageSize
        },
        updateQuery: (prevResult, { fetchMoreResult }) => {
          const newPosts = fetchMoreResult.infiniteScrollPosts.posts;
          const hasMore = fetchMoreResult.infiniteScrollPosts.hasMore;
          this.showMoreEnabled = hasMore;
          return {
            infiniteScrollPosts: {
              __typename: prevResult.infiniteScrollPosts.__typename,
              // merge pre posts with new posts
              posts: [...prevResult.infiniteScrollPosts.posts, ...newPosts],
              hasMore
            }
          };
        }
      });
    }
  }
};
</script>

<style scoped>
</style>