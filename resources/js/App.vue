<template>
    <div id="app">
        <Preloader :class="{'hidden': !$root.loading}" />
        <div>
            <Navigation v-if="$root.navbar" />
            <router-view></router-view>
            <Foot v-if="$root.footer" />
        </div>
    </div>
</template>

<script>
const Foot = () => import('./components/Foot')
const Preloader = () => import('./components/Preloader')
const Navigation = () => import('./components/Navigation')

export default {
    name: 'app',
    created: function () {
        this.$http.interceptors.response.use(undefined, function (err) {
        return new Promise(function (resolve, reject) {
            if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
            this.$store.dispatch(logout)
            }
            throw err;
        });
        });
    },
    components: {
        Foot,
        Preloader,
        Navigation,
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
.columns {
    margin-left: 0px;
    margin-right: 0px;
}
.hidden {
    display: none;
}
</style>
