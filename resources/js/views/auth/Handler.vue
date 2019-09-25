<template>
    <div></div>
</template>

<script>
export default {
    created() {
        if (this.$route.name == 'reset-password-handler') {
            this.requestPasswordReset(this.$route.params.id)
        } else if (this.$route.name == 'verify-email-handler') {
            this.requestEmailVerification(this.$route.params.id)
        } else if (this.$route.name == 'reset-password-cancel') {
            this.cancelPasswordReset(this.$route.params.id)
        } else if (this.$route.name == 'verify-email-cancel') {
            this.cancelEmailVerification(this.$route.params.id)
        } else {
            this.$toastr('error', 'Something is not right.', 'Error!')
            this.$router.push('/')
        }
    },
    methods: {
        requestEmailVerification(id) {
            this.$store.dispatch('verify_email', { id })
            .then(resp => {
                this.$toastr('success', 'Email is verified.', 'Success!')
                this.$toastr('success', 'You\'re logged in successfully.', 'Success!')
                this.$router.push('/')
            }).catch(error => {
                this.$toastr('error', 'Something is not right.', 'Error!')
                this.$router.push('/')
            })
        },
        requestPasswordReset(id) {
            this.$store.dispatch('password_reset', { id })
            .then(resp => {
                this.$toastr('success', 'You\'re logged in successfully.', 'Success!')
                this.$toastr('success', 'Go head and change your password!', 'Success!')
                this.$router.push('/')
            }).catch(error => {
                this.$toastr('error', 'Something is not right.', 'Error!')
                this.$router.push('/')
            })
        },
        cancelEmailVerification(id) {
            this.$store.dispatch('cancel_verify_email', { id })
            .then(resp => {
                this.$toastr('success', 'Request was canceled!', 'Success!')
                this.$router.push('/')
            }).catch(error => {
                this.$toastr('error', 'Something is not right.', 'Error!')
                this.$router.push('/')
            })
        },
        cancelPasswordReset(id) {
            this.$store.dispatch('cancel_password_reset', { id })
            .then(resp => {
                this.$toastr('success', 'Request was canceled!', 'Success!')
                this.$router.push('/')
            }).catch(error => {
                this.$toastr('error', 'Something is not right.', 'Error!')
                this.$router.push('/')
            })
        },
    }
}
</script>
