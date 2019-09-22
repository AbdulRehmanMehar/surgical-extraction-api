<template>
    <div class="container" style="margin: 100px auto">
        <div class="columns">
            <div class="column is-12">
                <div class="card">
                    <div class="card-header">
                        <p class="card-header-title">{{ product_form_type == 'new' ? 'Add Product' : 'Edit Product' }}</p>
                    </div>
                    <div class="card-content">
                        <div class="content">
                            <form @submit.prevent="function(){}">
                                <div class="field">
                                    <label class="label">Title</label>
                                    <div class="control">
                                        <input class="input" v-model="title" type="text" placeholder="e.g Blade" required>
                                    </div>
                                </div>
                                <div class="field" v-if="categories && categories.length">
                                    <label class="label">Category</label>
                                    <div class="control is-fullwidth">
                                        <div class="select is-fullwidth">
                                        <select v-model="category" required>
                                            <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
                                        </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="field has-text-danger" v-else>
                                    <p class="help">Please add category before product.</p>
                                </div>
                                <div class="field">
                                    <label class="label">Images</label>
                                    <div class="file has-name is-fullwidth">
                                        <label class="file-label">
                                            <input class="file-input" type="file" accept="image/*" multiple @change="handleFileChange($event)">
                                            <span class="file-cta">
                                            <span class="file-icon">
                                                <i class="fas fa-upload"></i>
                                            </span>
                                            <span class="file-label">
                                                Choose a file…
                                            </span>
                                            </span>
                                        </label>
                                    </div>
                                    <div class="help" v-if="product_form_type == 'edit'">This will add images to product and won't delete previous ones.</div>
                                </div>
                                <div class="field">
                                    <label  class="label">Description</label>
                                    <ckeditor :editor="editor" v-model="description" style="min-height: 400px"></ckeditor>
                                </div>
                                <div class="field">
                                    <label class="checkbox">
                                        <input type="checkbox" v-model="featured">
                                        Set as featured
                                    </label>
                                </div>
                                <input type="hidden" v-model="product_id">
                                <div class="field has-text-danger" v-if="formErrors && formErrors.length">
                                    <p class="help" v-for="(error, key) in formErrors" :key="key">{{error}}</p>
                                </div>
                                <!-- <input type="hidden" v-model="product_form_type"> -->
                            </form>
                        </div>
                    </div>
                    <footer class="card-footer">
                        <div class="card-footer-item">
                            <button type="submit" class="button is-fullwidth" @click.prevent="submitProductForm">Save</button>
                        </div>
                    </footer>
                </div>
                <br>
                <div class="card">
                    <div class="card-header">
                        <p class="card-header-title">Products</p>
                    </div>
                    <div class="card-content">
                        <div class="content" style="overflow-x: auto">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Title</th>
                                        <th>Featured</th>
                                        <th>Category</th>
                                        <th colspan="4">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(product, i) in products" :key="product.id">
                                        <td>{{ ++i }}</td>
                                        <td>{{ product.name }}</td>
                                        <td>{{ product.featured ? 'Featured' : 'Not Featured' }}</td>
                                        <td>@<router-link :to="{name: 'category', params: {id: product.category.id}}">{{ product.category.name }}</router-link></td>
                                        <td><router-link :to="{name: 'product', params: { id: product.id }}">View</router-link></td>
                                        <td>
                                            <router-link v-if="$route.query.page" :to="{name: 'manage-products', query: { id: product.id, page: $route.query.page }}">Edit</router-link>
                                            <router-link v-else :to="{name: 'manage-products', query: { id: product.id }}">Edit</router-link>
                                        </td>
                                        <!-- <td><a @click.prevent="editProduct($event, product)">Edit</a></td> -->
                                        <td><a @click.prevent="deleteProduct($event, product.id)">Delete</a></td>
                                        <td v-if="product.featured"><a @click.prevent="makeProductUnFeatured($event, product.id)">Remove Featured</a></td>
                                        <td v-else><a @click.prevent="makeProductFeatured($event, product.id)">Make Featured</a></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <footer class="card-footer">
                        <div class="card-footer-item">
                            <nav class="pagination is-rounded" role="navigation" v-if="products && paginator">
                                <router-link class="pagination-previous" :to="{name: 'manage-products', query: {page: paginator.current_page - 1}}" :class="{'disabled': paginator.current_page <= 1}">Previous</router-link>
                                <router-link class="pagination-next" :to="{name: 'manage-products', query: {page: paginator.current_page + 1}}" :class="{'disabled': paginator.current_page >= paginator.last_page}">Next page</router-link>
                                <ul class="pagination-list">
                                    <li v-for="number in paginator.last_page" :key="number">
                                        <router-link :to="{name: 'manage-products', query: {page: number}}" class="pagination-link" :class="{'disabled': number == paginator.current_page}">
                                            {{ number }}
                                        </router-link>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </footer>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

export default {
    data() {
        return {
            editor: ClassicEditor,
            title: null,
            category: null,
            categories: null,
            description: null,
            products: null,
            images: null,
            featured: false,
            paginator: null,
            product_id: null,
            product_form_type: 'new',
            formErrors: null
        }
    },
    created() {
        if (this.$route.query.id) {
            this.editProduct(this.$route.query.id)
        }
        this.loadCategories()
        this.loadProducts()
    },
    beforeRouteUpdate(to, from, next) {
        this.loadCategories()
        this.loadProducts(to.query.page)
        if (to.query.id) {
            this.editProduct(to.query.id)
        }
        next()
    },
    methods: {
        loadCategories: function () {
            this.$store.dispatch('get_all_categories')
            .then(resp => {
                this.categories = resp.data.data
            })
            .catch(error => console.log(error))
        },
        loadProducts: function(page) {
            this.$store.dispatch('get_products', {page: page || this.$route.query.page || 1, category: null})
            .then(res => {
                this.products = res.data.data
                this.paginator = res.data.meta
            }).catch(error => console.log(error))
        },
        submitProductForm: function () {
            let errors = false
            this.formErrors = []

            let data = {
                name: this.title,
                price: 20,
                category: this.category,
                description: this.description,
                product_id: this.product_id
            }

            if (this.product_form_type == 'new') {
                this.$store.dispatch('add_product', data)
                .then(resp => {
                    this.$toastr('info', 'Success! Product was added.', 'Information')
                    this.handleOtherEvents(resp)
                    this.title = null
                    this.category = null
                    this.product_id = null
                    this.images = null
                    this.description = ''
                    this.featured = false
                    this.product_form_type = 'new'
                }).catch(error => {
                    if (error.response.data.errors) {
                        for (let key in error.response.data.errors) {
                            if (key && key.length) this.formErrors.push(error.response.data.errors[key][0])
                        }
                    }
                    this.$toastr('danger', 'Aaah! Something went wrong while creating product.', 'Error')
                })
            } else {
                this.$store.dispatch('update_product', data)
                .then(resp => {
                    this.$toastr('info', 'Success! Product was updated.', 'Information')
                    this.handleOtherEvents(resp)
                    this.title = null
                    this.category = null
                    this.product_id = null
                    this.images = null
                    this.description = ''
                    this.featured = false
                    this.product_form_type = 'new'

                }).catch(error => {
                    if (error.response && error.response.data && error.response.data.errors) {
                        for (let key in error.response.data.errors) {
                            if (key && key.length) this.formErrors.push(error.response.data.errors[key][0])
                        }
                    }
                    this.$toastr('danger', 'Aaah! Something went wrong while updating product.', 'Error')
                })
            }
            this.loadCategories()
            this.loadProducts()
            if (this.$route.query.page) {
                this.$router.push({name: 'manage-products', query: {page: this.$route.query.page}})
            } else {
                this.$router.push({name: 'manage-products'})
            }
        },
        handleOtherEvents: function(resp) {
            if (resp.data.data.id) {
                if (this.images && this.images.length) {
                // console.log(this.images)
                    let uploaded = true
                    Array.from(this.images).forEach(image => {
                        console.log(image)
                        let data = new FormData()
                        data.append('image', image)
                        data.append('imageable_type', 'product')
                        data.append('imageable_id', resp.data.data.id)
                        this.$store.dispatch('addImage', data)
                        .catch(error => uploaded = false)
                    })
                    if (uploaded) this.$toastr('info', 'Success! Images were uploaded.', 'Information')
                    else this.$toastr('danger', 'Aaah! Something went wrong while uploading Images.', 'Error')
                }
                if (this.featured) {
                    this.makeProductFeatured(null, resp.data.data.id)
                }
                if (this.product_form_type == 'edit' && !this.featured) {
                    this.makeProductUnFeatured(null, this.product_id)
                }
            }
        },
        makeProductFeatured: function(event, id) {
            let data = {
                        product: id
                    }
                    this.$store.dispatch('set_featured_product', data)
                    .then(resp => {
                        this.$toastr('info', 'Success! Product was set as featured.', 'Information')
                    }).catch(error => {
                        this.$toastr('danger', 'Aaah! Product couldn\'t be set as featured.', 'Error')
                    })
                    this.loadProducts()
        },
        makeProductUnFeatured: function(event, id) {
            let data = {
                        product: id
                    }
                    this.$store.dispatch('remove_featured_product', data)
                    .then(resp => {
                        this.$toastr('info', 'Success! Product was removed from featured.', 'Information')
                    }).catch(error => {
                        this.$toastr('danger', 'Aaah! Product couldn\'t be removed from featured.', 'Error')
                    })
                    this.loadProducts()
        },
        editProduct: function(id) {
            this.$store.dispatch('get_product', id)
            .then(resp => {
                let product = resp.data.data
                this.title = product.name
                this.product_id = product.id
                this.featured = product.featured || false
                this.category = product.category.id
                this.description = product.description
                this.product_form_type = 'edit'
                this.images = null
                this.formErrors = null
                window.scrollTo(0, 0)
            }).catch(error => {
                this.$toastr('danger', 'Sorry, Something went wrong.', 'Error')
                if (this.$route.query.page) {
                    this.$router.push({name: 'manage-products', query: {page: this.$route.query.page}})
                } else {
                    this.$router.push({name: 'manage-products'})
                }
            })

        },
        deleteProduct: function(event, id) {
            this.$store.dispatch('delete_product', id)
            .then(resp => {
                this.$toastr('info', 'Success! Product was deleted.', 'Information')
            }).catch(error => {
                this.$toastr('error', 'Aah! Something went wrong.', 'Error')
            })
            this.loadProducts()
        },
        handleFileChange: function($event) {
            this.images = $event.target.files
        }
    }
}
</script>
