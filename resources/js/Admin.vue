<template>
    <div>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    beforeRouteEnter(to, from, next) {
        next(vm => {
            if (vm.$root.currentUser.role != 'admin') {
                vm.$toastr('danger', 'You\'re not authorized.', 'Aaah!')
                vm.$router.push('/')
            }
        })
    },
    created() {
        if (this.$root.currentUser.role != 'admin') {
                this.$toastr('danger', 'You\'re not authorized.', 'Aaah!')
                this.$router.push('/')
            }
    }
}
</script>
