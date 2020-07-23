<template>
  <div>
    <Header :title="$page.metadata.siteName" :description="$page.metadata.siteDescription"/>
    <Layout>
      <section class="posts">
        <div class="posts-wrapper">
          <div v-for="(edge, index) in loadedPosts" :key="index" :class="index%4 == 0 ? 'posts-wide' : 'post-small'">
            <PostCardWide :post="edge.node" v-if="index%4 == 0" />
            <PostCard :post="edge.node" v-else />
          </div>
        </div>
        <ClientOnly>
          <infinite-loading @infinite="infiniteHandler" spinner="spiral">
            <div class="brand-secondary text-center mt-2" slot="no-more">
              You've scrolled through all the posts <strong class="brand-primary">😉</strong>
            </div>
            <div slot="no-results" class="text-center mt-2">
              Sorry, no posts yet
            </div>
          </infinite-loading>
        </ClientOnly>
      </section>
    </Layout>
  </div>
</template>

<script>
import Header from '@/components/Header';
import PostCardWide from '../components/PostCardWide';
import PostCard from '../components/PostCard';
export default {
  components: {
    PostCard,
    PostCardWide,
    Header
  },
  data() {
    return {
      loadedPosts: [],
      currentPage: 1
    }
  },
  metaInfo: {
    title: "A simple blog"
  },
  methods: {
    async infiniteHandler($state) {
      if (this.currentPage + 1 > this.$page.posts.pageInfo.totalPages) {
        $state.complete();
      } else {
        const { data } = await this.$fetch(`/${this.currentPage + 1}`)
        if (data.posts.edges.length) {
          this.currentPage = data.posts.pageInfo.currentPage
          this.loadedPosts.push(...data.posts.edges)
          $state.loaded();
        } else {
          $state.complete();
        }
      }
    }
  },
  created() {
    this.loadedPosts.push(...this.$page.posts.edges)
  },
};
</script>

<page-query>
query Blog($page: Int) {
  metadata {
    siteName
    siteDescription
  }
  posts: allPost(perPage: 1, page: $page) @paginate {
    pageInfo {
      totalPages
      currentPage
    }
    edges {
      node {
        id
        title
        timeToRead
        description
        date (format: "D MMMM YYYY")
        path
        author {
          title
          role
          image(width: 30, height: 30, quality: 100, fit: cover)
        }
        image(width: 300, height: 200, quality: 75, fit: cover)
      }
    }

  }
}
</page-query>

<style lang="scss">
body {
  background-color: var(--bg-color);
}
.header {
  font-family: "Lora";
  font-size: 35px;
  text-align: center;
  line-height: 20px;
  padding: 0.7em;
  h2 {
    font-weight: 200;
    font-size: 20px;
  }
}
.posts {
  .posts-wrapper {
    .posts-wide {
      width: 100%;
      padding: 0 16px;
      margin-bottom: 40px;
    }
    .post-small {
      display: inline-block;
      width: 33.33%;
      padding: 0 16px;
      margin-bottom: 40px;
    }
  }
}
</style>
