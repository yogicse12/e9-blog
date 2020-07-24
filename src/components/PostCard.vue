<template>
    <g-link :to="post.path" class="read">
        <article class="post-card">
            <div class="post-card-image">
                <g-image :src="post.image" width="300" height="200" quality="100" />
            </div>
            <div class="post-card-content">
                <div>
                    <h3 class="title" v-html="post.title"/>
                    <p class="date" v-html="post.date"/>
                    <p class="description" v-html="post.description"/>
                </div>
                <div class="d-flex align-items-center justify-content-between author">
                    <div class="d-flex align-items-center">
                        <g-image class="rounded" :src="post.author.image" />
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
    .post-card {
        width: 100%;
        text-decoration: none;
        box-shadow: 4px 10px 18px 0 var(--box-shadow);
        transition: all ease-in-out 0.3s;
        border-radius: 6px;
        &:hover {
            box-shadow: 1px 1px 3px 0 var(--box-shadow);
            transition: all ease-in-out 0.3s;
        }
        &-image {
            height: 200px;
            width: inherit;
            img {
                width: 100%;
                height: inherit;
                border-top-left-radius: 6px;
                border-top-right-radius: 6px;
            }
        }
        &-content {
            padding: 0 1rem 1rem 1rem;
            border-top: none;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            flex-grow: 1;
            background-color: var(--code-block-color);
            border-bottom-left-radius: 6px;
            border-bottom-right-radius: 6px;
            .title {
                margin-top: 0.5rem;
                color: var(--heading-color);
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 1;
                overflow: hidden;
                width: 100%;
            }
            .date {
                color: var(--font-color)
            }
            .description {
                width: 100%;
                color: var(--secondary-color);
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 3;
                overflow: hidden;
            }
            .author {
                justify-self: flex-end;
            }
        }
    }
</style>
