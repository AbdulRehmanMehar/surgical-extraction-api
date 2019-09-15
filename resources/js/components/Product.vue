<template>
    <div id="product">
        <div class="card" v-if="product">
            <carousel :perPage="1" :autoplay="true" :loop="true" :paginationEnabled="false" class="card-image">
                <div class="image-wrapper" v-if="product.images && product.images.length">
                    <slide  v-for="image in product.images" :key="image.id" class="image is-5by3" :style="{'background-image': 'url(data:image/png;base64,' + image.image + ')' }">
                    </slide>
                </div>
                <div class="image-wrapper" v-else>
                    <slide class="image is-5by3" :style="{'background-image': 'url(' + dummyImage + ')' }">
                    </slide>
                </div>
            </carousel>
            <div class="card-content">
                <div class="content">
                    <h1 class="title is-5">{{ product.name }}</h1>
                    <h6 class="subtitle is-6">@<router-link :to="{name: 'category', params: {id: product.category.id}}">{{product.category.name}}</router-link></h6>
                    <!-- <p class="subtitle is-6">{{ product.description.slice(0, 200) + '...    ' }}</p> -->
                </div>
                <div class="field is-grouped">
                    <div class="control">
                        <router-link :to="{name: 'product', params: {id: product.id}}" class="button is-link is-rounded is-fullwidth">Details</router-link>
                    </div>
                    <div class="control">
                        <a @click.prevent="$root.addToCart($event, product.id)" class="button is-success is-rounded is-fullwidth">Add to Cart</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import dummy from '../assets/images/dummy.jpg'
import { Carosuel, Slide } from 'vue-carousel'

export default {
    props: ['product'],
    components: {
        Slide,
        Carosuel
    },
    data() {
        return {
            dummyImage: dummy
        }
    },

}
</script>

<style scoped>
#product {
    width: 100%;
    height: 100%;
}
.card-image {
    overflow: hidden;
}
.image {
    transition: all 500ms;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
}
.card-image:hover .image {
    transform: scale(1.5);
}
.image-wrapper {
    width: 100%;
    height: 100%;
}
</style>
