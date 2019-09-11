<template>
    <div class="container" style="margin: 100px auto">
        <div class="columns">
            <div class="column is-12">
                <carousel :perPage="1" :autoplay="true" :loop="true" :paginationEnabled="false" style="margin: 0 auto">
                    <slide class="image is-5by3" style="background-image: url(https://bulma.io/images/placeholders/1280x960.png)">
                    </slide>
                </carousel>
                <br />
                <h1 class="title is-2">Name</h1>
                <h3 class="subtitle">@Category</h3>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, a fugit iure error voluptatibus sint, consectetur veritatis expedita officia, quam adipisci optio aliquid numquam dolores vitae similique earum incidunt quasi.</p>
            </div>
        </div>
    </div>
</template>

<script>
import { Slide, Carousel } from 'vue-carousel'

export default {
    components: {
        Slide,
        Carousel
    }
}
</script>

<style scoped>
.VueCarousel {
    width: 100%;
    height: 40vh;
}
.image {
    transition: all 500ms;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
}
</style>
