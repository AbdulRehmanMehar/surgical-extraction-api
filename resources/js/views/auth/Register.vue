<template>
    <div>
        <div class="top-left">
            <router-link :to="{name: 'home'}" class="btn"><i class="fas fa-arrow-left"></i> Home</router-link>
        </div>

        <div class="align">

            <div class="grid">
                <h1>Howday!</h1>
                <p>Please provide your information or
                    <router-link :to="{name: 'login'}">Login here</router-link>.
                </p>
                <form action="#" method="POST" class="form login" @submit.prevent="register">

                <div class="form__field">
                    <label for="register__name"><i class="fas fa-user icon"></i><span class="hidden">Full Name</span></label>
                    <input id="register__name" type="text" name="name" v-model="name" class="form__input" placeholder="Name" required autofocus>
                </div>

                <div class="form__field">
                    <label for="register__email"><i class="fas fa-envelope icon"></i><span class="hidden">Email</span></label>
                    <input id="register__email" type="email" v-model="email" name="email" class="form__input" placeholder="Email" required>
                </div>

                <div class="form__field">
                    <label for="register__phone"><i class="fas fa-id-badge icon"></i><span class="hidden">Full Phone</span></label>
                    <input id="register__phone" v-model="phone" type="number" name="phone" class="form__input" placeholder="Phone" required>
                </div>


                <div class="form__field">
                    <label for="register__password"><i class="fas fa-lock icon"></i><span class="hidden">Password</span></label>
                    <input id="register__password" type="password" v-model="password" name="password" class="form__input" placeholder="Password" required>
                </div>

                <div class="form__field">
                    <label for="register__password__confirmation"><i class="fas fa-check-square icon"></i><span class="hidden">Confirm Password</span></label>
                    <input id="register__password__confirmation" v-model="confirm_password" type="password" name="confirm_password" class="form__input" placeholder="Confirm Password" required>
                </div>
                <div v-if="errors && errors.length" class="error-wrapper has-text-danger">
                    <p v-for="(error, key) in errors" :key="key">{{ error }}</p>
                </div>
                <div class="form__field">
                    <input type="submit" value="Register">
                </div>

                </form>

                <p class="text--right">
                So, you are agreed to our
                    <router-link :to="{name: 'terms-and-conditions'}">Terms and Conditions</router-link>.
                </p>

            </div>

            <svg xmlns="http://www.w3.org/2000/svg" class="icons"><symbol id="arrow-right" viewBox="0 0 1792 1792"><path d="M1600 960q0 54-37 91l-651 651q-39 37-91 37-51 0-90-37l-75-75q-38-38-38-91t38-91l293-293H245q-52 0-84.5-37.5T128 1024V896q0-53 32.5-90.5T245 768h704L656 474q-38-36-38-90t38-90l75-75q38-38 90-38 53 0 91 38l651 651q37 35 37 90z"/></symbol><symbol id="lock" viewBox="0 0 1792 1792"><path d="M640 768h512V576q0-106-75-181t-181-75-181 75-75 181v192zm832 96v576q0 40-28 68t-68 28H416q-40 0-68-28t-28-68V864q0-40 28-68t68-28h32V576q0-184 132-316t316-132 316 132 132 316v192h32q40 0 68 28t28 68z"/></symbol><symbol id="user" viewBox="0 0 1792 1792"><path d="M1600 1405q0 120-73 189.5t-194 69.5H459q-121 0-194-69.5T192 1405q0-53 3.5-103.5t14-109T236 1084t43-97.5 62-81 85.5-53.5T538 832q9 0 42 21.5t74.5 48 108 48T896 971t133.5-21.5 108-48 74.5-48 42-21.5q61 0 111.5 20t85.5 53.5 62 81 43 97.5 26.5 108.5 14 109 3.5 103.5zm-320-893q0 159-112.5 271.5T896 896 624.5 783.5 512 512t112.5-271.5T896 128t271.5 112.5T1280 512z"/></symbol></svg>

        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            name: '',
            email: '',
            phone: '',
            password: '',
            confirm_password: '',
            errors: []
        }
    },
    methods: {
        register: function() {
            let data = {
                name: this.name,
                email: this.email,
                phone: this.phone,
                password: this.password,
                confirm_password: this.confirm_password,
            }
            this.$store.dispatch('register', data)
            .then(resp => {
                this.$toastr('success', 'Registration was successfull, you\'re logged in.', 'Success!')
                this.$router.push('/')
            }).catch(error => {
                this.errors = []
                if (error.response.data.error) {
                    this.errors.push(error.response.data.error)
                } else if (error.response.data.errors) {
                    for (let key in error.response.data.errors) {
                        if (key && key.length) this.errors.push(error.response.data.errors[key][0])
                    }
                }
            })
        }
    }
}
</script>

<style scoped src="../../assets/css/form.css"></style>
