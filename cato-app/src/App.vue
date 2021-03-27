<template>
    <NavBar v-if="this.$route.path !== '/'"/>
    <router-view />
</template>

<script>
import NavBar from "./components/NavBar.vue";

export default {
    name: 'App',
    components: {
        NavBar
    }
}
</script>

<style>
#app {
    font-family: Roboto, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smooting: grayscale;
}
</style>
