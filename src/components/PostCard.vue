<template>
    <g-link :to="post.path" class="read">
        <div class="post-card">
            <div class="post-card-image">
                <g-image :src="post.image" height="200"/>
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
                            <small class="description">{{ post.author.role }}</small>
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
        color: var(--font-color);
    }
    .post-card {
        width: 100%;
        text-decoration: none;
        box-shadow: 0 0 7px 0 var(--box-shadow);
        &-image {
            height: 200px;
            width: inherit;
            img {
                width: 100%;
                height: inherit
            }
        }
        &-content {
            padding: 0 1rem 1rem 1rem;
            border-top: none;
            .title {
                margin-top: 0.5rem;
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
    }
</style>
