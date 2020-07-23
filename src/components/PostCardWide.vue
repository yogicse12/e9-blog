<template>
    <g-link :to="post.path" class="read">
        <article class="post-card-wide">
            <div class="post-card-wide-image">
                <g-image :src="post.image"/>
            </div>
            <div class="post-card-wide-content">
                <h3 class="title" v-html="post.title"/>
                <p class="date" v-html="post.date"/>
                <p class="description" v-html="post.description"/>
                <div class="d-flex align-items-center justify-content-between">
                    <div class="d-flex align-items-center">
                        <g-image class="rounded" :src="post.author.image"/>
                        <div class="ml-2">
                            <p class="mb-0 brand-primary">{{ post.author.title }}</p>
                            <small class="description">{{ post.author.role }}</small>
                        </div>
                    </div>
                    <strong>{{post.timeToRead}} min read</strong>
                </div>
            </div>
        </article>
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
    .post-card-wide {
        width: 100%;
        text-decoration: none;
        box-shadow: 4px 10px 18px 0 var(--box-shadow);
        transition: all ease-in-out 0.3s;
        border-radius: 6px;
        &:hover {
            box-shadow: 1px 1px 3px 0 var(--box-shadow);
            transition: all ease-in-out 0.3s;
        }
        display: flex;
        &-image {
            height: 400px;
            width: inherit;
            img {
                width: 100%;
                height: inherit;
                border-top-left-radius: 6px;
                border-bottom-left-radius: 6px;
            }
        }
        &-content {
            width: 40%;
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
