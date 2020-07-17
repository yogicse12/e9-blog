<template>
  <div>
    <Header :title="$page.metadata.siteName" :description="$page.metadata.siteDescription"/>
    <Layout>
      <section class="posts">
        <div class="row">
          <div class="col-lg-4 col-md-4 mb-4" v-for="edge in $page.allPost.edges" :key="edge.node.id" >
            <PostCard :post="edge.node" />
          </div>
        </div>
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
  metaInfo: {
    title: "A simple blog"
  }
};
</script>

<page-query>
query {
  metadata {
    siteName
    siteDescription
  }
  allPost {
    totalCount
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
          image(width: 50, height: 50, quality: 100, fit: cover)
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
  font-family: "Tahoma";
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
