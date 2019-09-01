<template>
    <nav class="navbar">
        <div class="container is-fluid">
            <div class="navbar-brand">
                <router-link class="navbar-item" :to="{name: 'home'}">
                    eSolution
                </router-link>
                <div class="navbar-burger burger" data-target="navbarExampleTransparentExample">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>

            <div id="navbarExampleTransparentExample" class="navbar-menu">
                
                <div class="navbar-end">
                    <router-link :to="{name: 'login'}" class="navbar-item">Login</router-link>                
                    <router-link :to="{name: 'register'}" class="navbar-item">Register</router-link>                
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
    export default {
        mounted() {
            console.log('Component mounted.')
        }
    }
</script>

<style scoped>
.navbar {
    background-color: var(--app-color);
}
.navbar-item, .navbar-link {
    transition: all 320ms;
    color: var(--app-text-color);
}
.navbar-item:hover, .navbar-link:hover, .navbar-item:focus, .navbar-link:focus, .router-link-exact-active  {
    transition: all 320ms;
    color: var(--app-text-accent-color);
    background-color: var(--app-accent-color);
}
</style>