<template>
  <div>
    <Header :title="$page.metadata.siteName" :description="$page.metadata.siteDescription"/>
    <Layout>
      <section>
          <div class="posts-wrapper">
            <div v-for="(edge, index) in loadedPosts" :key="index" class="post">
              <PostCard :post="edge.node" />
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
import PostCard from '../components/PostCard';
export default {
  components: {
    PostCard,
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
  posts: allPost(perPage: 6, page: $page) @paginate {
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
        image(fit: cover)
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
  font-size: 35px;
  text-align: center;
  line-height: 20px;
  padding: 0.7em;
  h2 {
    font-weight: 200;
    font-size: 20px;
  }
}
</style>
<style lang="scss" scoped>
.posts-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}
.post {
  flex: 1 1 300px;
  margin: 1rem;
  @media (min-width: 795px) {
    &:nth-child(6n+1) {
      flex: 1 1 100%;
      /deep/.post-card {
        display: flex;
        flex-direction: row;
        align-items: center;
        &-image {
          height: 300px;
          flex: 1 1 100%;
          img {
            border-bottom-left-radius: 6px;
            border-top-right-radius: 0;
          }
        }
        &-content {
          flex: 1 1.5 100%;
          height: 300px;
          border-bottom-left-radius: 0;
          border-top-right-radius: 6px;
        }
      }
    }
  }
}
</style>
