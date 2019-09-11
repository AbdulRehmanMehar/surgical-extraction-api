<template>
    <carousel class="slider" :perPage="1" :mouse-drag="true" :autoplay="true" :loop="true" v-if="products && products.length">

      <slide v-for="product in products" :key="product.id">
        <div class="container">
          <div class="columns">
            <div class="slide-copy column is-5">
              <h1>{{ product.name }}</h1>
              <h3>@<router-link :to="{name: 'category', params: {id: product.category.id}}">{{ product.category.name }}</router-link></h3>
              <p>{{ product.description.slice(0, 200) + '...    ' }}</p>
              <router-link :to="{name: 'product', params: {id: product.id}}" class="button is-link is-rounded">Details</router-link>
            </div>
            <div class="slide-img column is-7">
              <div>
                    <img v-if="product.images && product.images.length" :src="product.images[0]">
                    <img v-else :src="dummyImage">
              </div>
            </div>
          </div>
        </div>
      </slide>
    </carousel>
</template>

<script>
import dummy from '../assets/images/dummy.jpg'
import { Carousel, Slide } from 'vue-carousel'

export default {
    components: {
        Slide,
        Carousel
    },
    props: ['products'],
    data() {
        return {
            dummyImage: dummy
        }
    },
}
</script>

<style scoped>

/* Carousel */

.slider {
  position: relative;
  width: 100%;
  height: calc(100vh);
}

.VueCarousel-slide {
  background: transparent url('https://s3.amazonaws.com/codecademy-content/courses/ltp2/img/flipboard/feature-gradient-transparent.png') center center no-repeat;
  background-size: cover;
  width: 100%;
  height: 100%;
  min-height: calc(100vh);
}

.slide-copy h1 {
  color: #363636;

  font-family: 'Oswald', sans-serif;
  font-weight: 400;

  font-size: 40px;
  margin-top: 105px;
  margin-bottom: 0px;
}

.slide-copy h2 {
  color: #b7b7b7;

  font-family: 'Oswald', sans-serif;
  font-weight: 400;

  font-size: 40px;
  margin: 5px;
}

.slide-copy p {
  color: #959595;
  font-family: Georgia, "Times New Roman", serif;
  font-size: 1.15em;
  line-height: 1.75em;
  margin-bottom: 15px;
  margin-top: 16px;
}

.slide-img {
  text-align: right;
}

</style>
