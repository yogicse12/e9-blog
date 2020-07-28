<template>
    <a :href="link" target="_blank" title="Twitter" aria-label="Twitter" rel="noopener">
        <TwitterIcon size="30"/>
    </a>
</template>

<script>
import { TwitterIcon } from 'vue-feather-icons'
export default {
    name: "Twitter",
    props: {
        link: {
            type: String
        }
    },
    components: {
        TwitterIcon
    }
}
</script>

<style scoped>

</style>
