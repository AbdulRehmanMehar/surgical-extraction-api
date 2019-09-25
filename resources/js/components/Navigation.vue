<template>
    <nav class="navbar is-fixed-top">
        <div class="container is-fluid">
            <div class="navbar-brand">
                <router-link class="navbar-item" :to="{name: 'home'}">
                    {{ $root.name }}
                </router-link>
                <div class="navbar-burger burger has-text-light" @click.prevent="function() {navburger = !navburger}" data-target="navbarExampleTransparentExample">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>

            <div id="navbarExampleTransparentExample" class="navbar-menu" :class="{'is-active': navburger}">

                <div class="navbar-start">
                    <router-link class="navbar-item" v-for="category in parentCategories" :key="category.id" :to="{name: 'category', params: {id: category.id}}">{{ category.name }}</router-link>
                    <div class="navbar-item has-dropdown is-hoverable" v-for="category in parentCategoriesWithSubCategories" :key="category.id">
                            <a @click.prevent="function(){}" class="navbar-link">{{ category.name }}</a>
                            <div class="navbar-dropdown">
                                <router-link v-for="subcat in category.subcategories" :key="subcat.id" :to="{name: 'category', params: {id: subcat.id}}" class="navbar-item">{{ subcat.name }}</router-link>
                                <hr class="navbar-divider">
                                <router-link :to="{name: 'category', params: {id: category.id}}" class="navbar-item">{{ category.name }}</router-link>
                            </div>
                        </div>
                </div>

                <div class="navbar-end" v-if="$root.isLoggedIn">
                    <!-- <nav class="navbar" role="navigation" aria-label="dropdown navigation"> -->
                        <router-link class="navbar-item" :to="{name: 'cart'}">
                            <i class="fas fa-shopping-basket"></i>&nbsp;Cart&nbsp;<span class="tag">{{  $root.cart.length }}</span>
                        </router-link>
                        <div class="navbar-item has-dropdown is-hoverable">
                            <a @click.prevent="function(){}" class="navbar-link">{{ $root.currentUser.name }}</a>
                            <div class="navbar-dropdown">
                                <router-link :to="{name: 'dashboard'}" class="navbar-item">Dashboard</router-link>
                                <router-link :to="{name: 'logout'}" class="navbar-item">Logout</router-link>
                                <!-- <a @click.prevent="$root.logout" class="navbar-item">Logout</a> -->
                            </div>
                        </div>
                    <!-- </nav> -->
                </div>
                <div class="navbar-end" v-else>
                    <router-link class="navbar-item" :to="{name: 'cart'}">
                        <i class="fas fa-shopping-basket"></i>&nbsp;Cart&nbsp;<span class="tag">{{  $root.cart.length }}</span>
                    </router-link>
                    <router-link :to="{name: 'login'}" class="navbar-item">Login</router-link>
                    <router-link :to="{name: 'register'}" class="navbar-item">Register</router-link>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
    export default {
        props: ['categories'],
        data() {
            return {
                navburger: false,
                // categories: null,
            }
        },
        computed: {
            parentCategories: function() {
                if (this.categories && this.categories.length) {
                    return this.categories.filter(function(category) {
                        return !category.parent && !category.subcategories.length
                    })
                }
            },
            parentCategoriesWithSubCategories: function() {
                if (this.categories && this.categories.length) {
                    return this.categories.filter(function(category) {
                        return !category.parent && category.subcategories.length
                    })
                }
            }
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
.navbar-item:hover, .navbar-link:hover, .navbar-item:focus, .navbar-link:focus, .router-link-exact-active, .navbar-item.has-dropdown:hover, .navbar-item.has-dropdown:focus  {
    transition: all 320ms;
    color: var(--app-text-accent-color);
    background-color: var(--app-accent-color);
}


</style>
