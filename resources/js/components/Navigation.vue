<template>
    <nav class="navbar is-fixed-top">
        <div class="container is-fluid">
            <div class="navbar-brand">
                <router-link class="navbar-item" :to="{name: 'home'}">
                    {{ $root.name }}
                </router-link>
                <div class="navbar-burger burger" data-target="navbarExampleTransparentExample">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>

            <div id="navbarExampleTransparentExample" class="navbar-menu">

                <div class="navbar-end" v-if="$root.isLoggedIn">
                    <nav class="navbar" role="navigation" aria-label="dropdown navigation">
                        <div class="navbar-item has-dropdown is-hoverable">
                            <a @click.prevent="function(){}" class="navbar-link">{{ $root.currentUser.name }}</a>
                            <div class="navbar-dropdown">
                                <router-link :to="{name: 'dashboard'}" class="navbar-item">Dashboard</router-link>
                                <router-link :to="{name: 'logout'}" class="navbar-item">Logout</router-link>
                                <!-- <a @click.prevent="$root.logout" class="navbar-item">Logout</a> -->
                            </div>
                        </div>
                    </nav>
                </div>
                <div class="navbar-end" v-else>
                    <router-link :to="{name: 'login'}" class="navbar-item">Login</router-link>
                    <router-link :to="{name: 'register'}" class="navbar-item">Register</router-link>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
    export default {

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
.navbar-item:hover, .navbar-link:hover, .navbar-item:focus, .navbar-link:focus, .router-link-exact-active, .navbar-item.has-dropdown:hover, .navbar-item.has-dropdown:focus  {
    transition: all 320ms;
    color: var(--app-text-accent-color);
    background-color: var(--app-accent-color);
}


</style>
