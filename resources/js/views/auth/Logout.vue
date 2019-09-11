<template>
    <div></div>
</template>

<script>
export default {
    beforeRouteEnter(to, from, next) {
        next(vm => {
            if (vm.$root.isLoggedIn){
                vm.$root.logout();
                vm.$toastr('info', 'You\'re logged out successfully.', 'Information')
                vm.$router.go(-1)
            }
        })
    }
}
</script>
