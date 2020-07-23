<template>
    <article>
        <div class="d-flex align-items-start">
            <g-image class="rounded" :src="author.image" :alt="author.title"/>
            <div class="ml-3">
                <h2 class="mt-0 mb-0 brand-primary">{{ author.title }}</h2>
                <p class="mb-1">{{ author.role }}</p>
                <p class="brand-secondary">{{ author.description }}</p>
                <div class="d-flex align-items-center justify-content-start">
                    <GitHub v-if="author.github" class="mr-3" :link="author.github"></GitHub>
                    <Twitter v-if="author.twitter" :link="author.twitter"></Twitter>
                </div>
            </div>
        </div>
    </article>
</template>

<script>
import GitHub from './GitHub';
import Twitter from './Twitter';
export default {
    name: "AuthorCard",
    components: {Twitter, GitHub},
    props: {
        author: {
            type: Object,
            required: true
        }
    }
}
</script>

<style scoped>

</style>
