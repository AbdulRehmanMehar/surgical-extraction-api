<template>
    <div>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    beforeRouteEnter(to, from, next) {
        next(vm => {
            if (!vm.$root.isLoggedIn) {
                vm.$toastr('danger', 'You\'re not logged in.', 'Aaah!')
                vm.$router.go(-1)
            }
        })
    }
}
</script>
