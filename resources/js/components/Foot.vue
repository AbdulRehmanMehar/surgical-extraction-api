<template>
    <footer class="footer" style="overflow-x: hidden;">
        <div class="content">
            <div class="columns">
                <div class="column is-7">
                    <!-- <h1 class="title is-3">About Us</h1>
                    <p>Airfort is an Industory known for developing instruments. Our instruments are used in many fields like beauty, surgery and vertenary. We are aimed to provide the best and quality instruments.</p> -->

                    <p style="padding-top: 16px;">
                        &copy;
                        <strong> {{ $root.name }} </strong>
                        {{ year }}. All Rights Reserved.
                    </p>
                    <p>
                        Developed by
                        <b><a href="https://github.com/aidas315" target="_blank">Aidas</a></b>,
                        <a href="https://github.com/AbdulRehmanMehar" target="_blank">Abdul Rehman</a>.
                    </p>
                </div>
                <div class="column is-3">
                    <h1 class="title is-3">Contact Us</h1>
                    <p>
                        <i class="fas fa-phone fliped fa-lg"></i> &nbsp; <a href="tel:+92524360234">+92 52 4360234</a>
                    </p>
                    <p>
                        <i class="fab fa-whatsapp fa-lg"></i> &nbsp; <a href="https://wa.me/+923117736256" target="_blank">+92 311 7736256</a>
                    </p>
                    <p>
                        <i class="fas fa-envelope fa-lg"></i> &nbsp; <a href="mailto:airfort865@gmail.com">airfort865@gmail.com</a>
                    </p>
                </div>
                <div class="column is-2">
                    <h1 class="title is-3">Links</h1>
                    <p>
                        <!-- <a @click.prevent="$root.logout" v-if="$root.isLoggedIn">Logout</a> -->
                        <router-link :to="{name: 'logout'}" v-if="$root.isLoggedIn">Logout</router-link>
                        <router-link :to="{name: 'login'}" v-else>Login</router-link>
                    </p>
                    <p>
                        <router-link :to="{name: 'dashboard'}" v-if="$root.isLoggedIn">Dashboard</router-link>
                        <router-link :to="{name: 'register'}" v-else>Register</router-link>
                    </p>
                    <p>
                        <router-link :to="{name: 'terms-and-conditions'}">Terms and Conditions</router-link>
                    </p>
                </div>
            </div>
        </div>
    </footer>
</template>

<script>
export default {
    data() {
        return {
            year: new Date().getFullYear()
        }
    }
}
</script>

<style scoped>
.fliped {
  -webkit-transform: scaleX(-1);
  transform: scaleX(-1);
}
</style>
