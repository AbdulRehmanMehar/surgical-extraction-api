<template>
    <div class="container" style="margin: 100px auto">
        <div class="columns">
            <div class="column is-12">

                <div class="card">
                    <div class="card-header">
                        <p class="card-header-title">{{ form_type == 'new'  ? 'Add Category' : 'Edit Category' }}</p>
                    </div>
                    <div class="card-content">
                        <div class="content">
                            <form @submit.prevent="function() {}">
                                <div class="field">
                                    <label class="label">Name</label>
                                    <div class="control">
                                        <input class="input" v-model="name" type="text" placeholder="e.g Surgical" required>
                                    </div>
                                </div>
                                <div class="field" v-if="categories && categories.length">
                                    <label class="label">Category</label>
                                    <div class="control is-fullwidth">
                                        <div class="select is-fullwidth">
                                        <select v-model="parent">
                                            <option value="none">None</option>
                                            <option v-for="cat in categories" :key="cat.id" :value="cat.id" :style="{'display' : (cat.id == category_id || ( cat.parent && cat.parent.id == category_id)) ? 'none' : 'initial'}">{{ cat.name }}</option>
                                        </select>
                                        </div>
                                    </div>
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
                                    <div class="help" v-if="form_type == 'edit'">This will add images to category and won't delete previous ones.</div>
                                </div>
                                <div class="field has-text-danger" v-if="form_errors && form_errors.length">
                                    <p class="help" v-for="(error, key) in form_errors" :key="key">{{error}}</p>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div class="card-footer">
                        <div class="card-footer-item">
                            <button type="submit" class="button is-fullwidth" @click.prevent="submitCategoryForm">Save</button>
                        </div>
                    </div>
                </div>
                <br><br>
                <div class="card">
                    <div class="card-header">
                        <p class="card-header-title">Categories</p>
                    </div>
                    <div class="card-content">
                        <div class="content" style="overflow-x: auto">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <!-- <th>Products</th>
                                        <th>Subcategories</th> -->
                                        <th>Parent</th>
                                        <th colspan="3">Actions</th>
                                    </tr>
                                </thead>
                                <tbody  v-if="categories && categories.length">
                                    <tr v-for="(cat, i) in categories" :key="i">
                                        <td>{{ cat.name }}</td>
                                        <!-- <td>{{ cat.products ? cat.products.length : 0 }}</td>
                                        <td>{{ cat.subcategories.length }}</td> -->
                                        <td>{{ cat.parent ? cat.parent.name : 'None' }}</td>
                                        <td><router-link :to="{name: 'category', params: { id: cat.id }}">View</router-link></td>
                                        <td><router-link :to="{name: 'manage-categories', query: { id: cat.id }}">Edit</router-link></td>
                                        <!-- <td><a @click.prevent="editCategory($event, cat)">Edit</a></td> -->
                                        <td><a @click.prevent="deleteCategory($event, cat)">Delete</a></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            name: null,
            parent: 'none',
            categories: null,
            images: null,
            category_id: null,
            form_type : 'new',
            form_errors : []
        }
    },
    created() {
        if (this.$route.query.id) {
            this.editCategory(this.$route.query.id)
        }
        this.loadCategories()
    },
    beforeRouteUpdate(to, from, next) {
        if (to.query.id) this.editCategory(to.query.id)
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
        submitCategoryForm: function() {

            let data = {
                name: this.name,
                parent: this.parent == 'none' ? null : this.parent,
                category_id: this.category_id

            }

            this.$store.dispatch(this.form_type == 'new' ? 'add_new_category' : 'edit_category', data)
            .then(resp => {
                this.$toastr('info', 'Success! Category was ' + (this.form_type == 'new' ? 'added.' : 'updated.') , 'Information')
                this.handleOtherEvents(resp)
                    this.name = null
                    this.parent = 'none'
                    this.category_id = null
                    this.images = null
                if (this.form_type == 'edit'){
                    this.$router.replace({name: 'manage-categories'})
                }
                this.form_type = 'new'
                this.loadCategories()
            }).catch(error => {
                this.form_errors = []
                if (error.response && error.response.data && error.response.data.errors) {
                        for (let key in error.response.data.errors) {
                            if (key && key.length) this.form_errors.push(error.response.data.errors[key][0])
                        }
                    }
            })

        },
        handleOtherEvents: function(resp) {
            if (resp.data.data.id) {
                if (this.images && this.images.length) {
                console.log(this.images)
                    let uploaded = true
                    Array.from(this.images).forEach(image => {
                        let data = new FormData()
                        data.append('image', image)
                        data.append('imageable_type', 'category')
                        data.append('imageable_id', resp.data.data.id)
                        this.$store.dispatch('addImage', data)
                        .catch(error => uploaded = false)
                    })
                    if (uploaded) this.$toastr('info', 'Success! Images were uploaded.', 'Information')
                    else this.$toastr('danger', 'Aaah! Something went wrong while uploading Images.', 'Error')
                }
            }
        },
        editCategory: function (id) {
            this.$store.dispatch('get_category_data', id)
            .then(resp => {
                if (resp.data.data) {
                    this.name = resp.data.data.name
                    this.category_id = resp.data.data.id
                    this.parent = resp.data.data.parent ? resp.data.data.parent.id : 'none'
                    this.form_type = 'edit'
                    window.scrollTo(0,0)
                } else {
                    this.$toastr('error', 'Success! Something is not right.', 'Error')
                }
            })
        },
        handleFileChange: function($event) {
            this.images = $event.target.files
        },
        deleteCategory: function($event, category) {
            if (category.products.length == 0 && category.subcategories.length == 0) {
                this.$store.dispatch('delete_category', category.id)
                    .then(resp => {
                        this.$toastr('info', 'Success! Category was deleted.', 'Information')
                        this.loadCategories()
                    }).catch(error => this.$toastr('error', 'Aah! Category wasn\'t deleted.', 'Error'))
            } else {
                this.$toastr('info', 'Category contains subcategories or products and cannot be deleted.', 'Information')
            }
        }
    },
}
</script>
