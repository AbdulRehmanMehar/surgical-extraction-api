<template>
    <div>
        <div class="container" style="margin: 100px auto">
            <div class="card">
                <div class="card-content">
                    <div class="columns is-gapless">
                        <div class="column is-1" style="margin: auto auto">
                            <i class="fas fa-user fa-4x" style="display: block"></i>
                        </div>
                        <div class="column is-10    ">
                            <div class="content">
                                <h1 class="title is-3">Profile</h1>
                                <div class="field is-grouped">
                                    <div class="control">
                                        <router-link :to="{name: 'view-profile'}" class="button is-link is-rounded is-fullwidth">View</router-link>
                                    </div>
                                    <div class="control">
                                        <router-link :to="{name: 'edit-profile'}" class="button is-link is-rounded is-fullwidth">Edit</router-link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <br> <br>
            <div class="card">
                <div class="card-content">
                    <div class="columns is-gapless">
                        <div class="column is-1" style="margin: auto auto">
                            <i class="fas fa-layer-group fa-4x" style="display: block"></i>
                        </div>
                        <div class="column is-10    ">
                            <div class="content">
                                <h1 class="title is-3">Orders</h1>
                                <div class="field is-grouped">
                                    <div class="control">
                                        <router-link :to="{name: 'view-orders'}" class="button is-link is-rounded is-fullwidth">View</router-link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    created() {
        this.$root.setTitle('Dashboard')
    }
}
</script>
