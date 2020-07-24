<template>
    <div>
        <Header/>
        <Layout>
            <br>
            <g-link to="/" class="link">  &larr; Go Back</g-link>
            <div class="post-title">
                <h1 class="mt-1">{{$page.post.title}}</h1>
                <p class="post-date"> {{ $page.post.date}} | {{$page.post.timeToRead}} min read</p>
            </div>
            <div class="post-image">
              <g-image class="rounded-cornor" :src="$page.post.image" fit="cover" :alt="$page.post.title" />
            </div>
            <div class="post-content">
                <p v-html="$page.post.content" />
            </div>
            <div class="author mt-4">
                <p class="brand-secondary">Posted on : {{ $page.post.date}}</p>
                <AuthorCard :author="$page.post.author"/>
            </div>
        </Layout>
    </div>
</template>

<page-query>
query Post ($path: String!) {
   post: post (path: $path) {
    id
    title
    image(height: 634, quality: 100, width: 1110, fit: cover)
    content
    description
    date (format: "D MMMM YYYY")
    timeToRead
    author {
      title
      role
      description
      image(width: 60, quality: 100, height: 60, fit: cover)
      github
      twitter
    }
  }
}
</page-query>

<style lang="scss" scoped>

.post-title {
  text-align: center;
  font-size: 1.5rem;
  line-height: 10px;
  padding: 1em 0;
  h1 {
    line-height: 56px;
  }
}

.post-date {
  font-size: 16px;
  margin-top: 32px;
  font-weight: 400;
  color: var(--secondary-color);
}

.post-image {
  width: 100%;
  margin-bottom: 1.5rem;
    img {
        max-width: 100%;
        max-height: 400px;
    }
  .rounded-cornor {
    border-radius: 6px;
  }
}

.post-content {
  color: var(--font-color);
  font-size: 1rem;
}

.author {
    padding: 1rem;
    box-shadow: 0 0 8px 0 var(--box-shadow);
    border-radius: 6px;
}

</style>
<script>
    import Header from '../components/Header';
    import AuthorCard from '../components/AuthorCard';
    export default {
        components: {AuthorCard, Header}
    }
</script>
