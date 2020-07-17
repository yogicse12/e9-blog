<template>
    <g-link :to="post.path" class="read">
        <div class="post-card">
            <div class="post-card-image">
                <g-image :src="post.image"/>
            </div>
            <div class="post-card-content">
                <h3 class="title" v-html="post.title"/>
                <p class="date" v-html="post.date"/>
                <p class="description" v-html="post.description"/>
                <div class="d-flex align-items-center justify-content-between">
                    <div class="d-flex align-items-center">
                        <g-image class="rounded" :src="post.author.image"/>
                        <div class="ml-2">
                            <p class="mb-0">{{ post.author.title }}</p>
                            <small>{{ post.author.role }}</small>
                        </div>
                    </div>
                    <strong>{{post.timeToRead}} min read</strong>
                </div>
            </div>
        </div>
    </g-link>
</template>

<script>
    export default {
        props: ["post"]
    };
</script>

<style lang="scss">
    .read {
        text-decoration: none;
        color: var(--font-color)
    }
    .post-card {
        width: 400px;
        text-decoration: none;
        &-image {
            overflow: hidden;
        }
        .title {
            color: var(--heading-color)
        }
        .date {
            color: var(--font-color)
        }
        .description {
            color: var(--secondary-color);
        }
        .rounded {
            border-radius: 50%;
        }
    }
</style>
