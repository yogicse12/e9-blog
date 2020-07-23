<template>
    <div>
        <Header/>
        <Layout>
            <br>
            <g-link to="/" class="link">  &larr; Go Back</g-link>
            <div class="post-title">
                <h1>{{$page.post.title}}</h1>
                <p class="post-date"> {{ $page.post.date}} | {{$page.post.timeToRead}} min read</p>
            </div>
            <div class="post-image">
              <g-image class="rounded-cornor" :src="$page.post.image" />
            </div>
            <div class="post-content">
                <p v-html="$page.post.content" />
            </div>
            <div class="author">
              <g-image class="rounded" :src="$page.post.author.image"/>
              <div class="ml-3">
                  <p class="mb-0 brand-primary">{{ $page.post.author.title }}</p>
                  <small class="description">{{ $page.post.author.role }}</small>
              </div>
            </div>
            <div class="text-center">{{ $page.post.description }}</div>
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
      image(width: 60, quality: 75, height: 60, fit: cover)
    }
  }
}
</page-query>

<style lang="scss">

.post-title {
  text-align: center;
  font-size: 30px;
  line-height: 10px;
  padding: 2em 0;
  font-family: 'Lora';
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
  margin-bottom: 40px;
  .rounded-cornor {
    border-radius: 6px;
  }
}

.post-content {
  color: var(--font-color);
  font-size: 20px;
}

.author {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 80px;
  .rounded {
      border-radius: 50%;
  }
}

</style>
<script>
    import Header from '../components/Header';
    export default {
        components: {Header}
    }
</script>
