<template>
  <Layout>
    <header class="header">
      <h1 v-html="$page.metadata.siteName" />
      <h2 v-html="$page.metadata.siteDescription" />
    </header>
    <section class="posts">
      <div class="row">
        <div class="col-lg-4 col-md-6" v-for="edge in $page.allPost.edges" :key="edge.node.id" >
          <PostList :post="edge.node" />
        </div>
      </div>
    </section>
  </Layout>
</template>

<script>
import PostList from "@/components/PostList";
export default {
  components: {
    PostList
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
        image(width: 400, height: 200, quality: 75, fit: cover)
      }
    }

  }
}
</page-query>

<style lang="scss">
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
