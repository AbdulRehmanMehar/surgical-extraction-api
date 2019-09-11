<template>
    <div id="product">
        <div class="card">
            <carousel :perPage="1" :autoplay="true" :loop="true" :paginationEnabled="false" class="card-image">

                <slide class="image is-5by3" style="background-image: url(https://bulma.io/images/placeholders/1280x960.png)">
                </slide>
                <slide class="image is-5by3" style="background-image: url(https://bulma.io/images/placeholders/90x90.png)">
                </slide>
            </carousel>
            <div class="card-content">
                <div class="content">
                    <h1 class="title is-5">Name</h1>
                    <h6 class="subtitle is-6">@Category</h6>
                    <p class="subtitle is-6">Some description....................</p>
                </div>
                <a class="button is-normal is-primary is-fullwidth">View</a>
            </div>
        </div>
    </div>
</template>

<script>
import {Carosuel, Slide} from 'vue-carousel'
export default {

    components: {
        Slide,
        Carosuel
    }

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
</style>
