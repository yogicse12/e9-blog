<template>
    <header class="header">
        <nav class="d-flex align-items-center justify-content-between w-100">
            <div class="d-flex align-items-center">
                <g-link to="/">
                    <img class="logo" src="/e9ine.png" alt="logo"/>
                </g-link>
                <span class="blog-title ml-3">Engineering Blog</span>
            </div>
            <div class="d-flex align-items-center">
                <a class="d-none d-sm-block" href="https://e9ine.com" target="_blank" rel="noopener">Corporate Website</a>
                <a class="d-none d-sm-block" href="https://e9ine.com/careers" target="_blank" rel="noopener">Work with us</a>
                <ThemeSwitch/>
            </div>
        </nav>
    </header>
</template>

<script>
    import ThemeSwitch from './ThemeSwitch';

    export default {
        name: "Header",
        components: {ThemeSwitch}
    }
</script>

<style lang="scss" scoped>
    .header {
        padding: 0;

        nav {
            display: block;
            border-bottom: 1px solid var(--border-color);
            padding: 1rem 2rem;

            img.logo {
                height: 50px;
                width: 50px;
            }

            .blog-title {
                font-size: 1.2rem;
                font-weight: 500;
                color: var(--font-color);
            }

            a {
                text-decoration: none;
                font-size: 1rem;
                color: var(--heading-color);
                margin-right: 1rem;

                &:hover {
                    color: var(--primary-color);
                }
            }
        }
    }
</style>
