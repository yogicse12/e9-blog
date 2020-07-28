<template>
    <a :href="link" target="_blank" title="Twitter" aria-label="Twitter" rel="noopener">
        <GithubIcon size="30"/>
    </a>
</template>

<script>
    import { GithubIcon } from 'vue-feather-icons'
    export default {
        name: "GitHub",
        props: {
            link: {
                type: String
            }
        },
        components: {
            GithubIcon
        }
    }
</script>

<style scoped>

</style>
