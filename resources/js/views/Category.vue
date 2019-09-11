<template>
    <div class="container" style="margin: 100px auto;">
        <div class="tile is-ancestor">
            <div class="tile is-veritcal is-3">
                <div class="content">
                    <h4 class="subtitle is-5">Filter Products</h4>
                    <div class="field has-addons">
                        <div class="control">
                            <input class="input" type="text" placeholder="Find a Product">
                        </div>
                        <div class="control">
                            <a class="button is-light">
                            Search
                            </a>
                        </div>
                    </div>
                    <hr />
                    <h4 class="subtitle is-5">Categories in Category</h4>
                    <div class="tags">
                        <span class="tag">One</span>
                        <span class="tag">Two</span>
                        <span class="tag">Three</span>
                        <span class="tag">Four</span>
                        <span class="tag">Five</span>
                        <span class="tag">Six</span>
                        <span class="tag">Seven</span>
                        <span class="tag">Eight</span>
                        <span class="tag">Nine</span>
                        <span class="tag">Ten</span>
                        <span class="tag">Eleven</span>
                        <span class="tag">Twelve</span>
                        <span class="tag">Thirteen</span>
                        <span class="tag">Fourteen</span>
                        <span class="tag">Fifteen</span>
                        <span class="tag">Sixteen</span>
                        <span class="tag">Seventeen</span>
                        <span class="tag">Eighteen</span>
                        <span class="tag">Nineteen</span>
                        <span class="tag">Twenty</span>
                    </div>
                </div>
            </div>
            <div class="tile is-9">
                <div class="container">
                    <div class="columns is-multiline">
                        <div class="column is-4">
                            <Product />
                        </div>
                        <div class="column is-4">
                            <Product />
                        </div>
                        <div class="column is-4">
                            <Product />
                        </div>
                        <div class="column is-4">
                            <Product />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
const Product = () => import('../components/Product')

export default {
    components: {
        Product
    }
}
</script>
