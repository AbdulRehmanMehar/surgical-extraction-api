<template>
    <div id="app">
        <nprogress-container></nprogress-container>
        <Navigation v-if="$root.navbar" />
        <router-view></router-view>
    </div>
</template>

<script>
const Navigation = () => import('./components/Navigation')
const NprogressContainer = () => import('vue-nprogress/src/NprogressContainer')

export default {
    name: 'app',
    components: {
        Navigation,
        NprogressContainer
    }

}
</script>

<style>
:root {
    --app-color: #144B8E;
    --app-text-color: #C0D6DF;
    --app-accent-color: #589694;
    --app-text-hover-color: #FF8552;
    --app-text-accent-color: #E6E6E6;
}
</style>