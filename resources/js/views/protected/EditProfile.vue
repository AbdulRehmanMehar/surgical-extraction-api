<template>
    <div class="container" style="margin: 100px auto">
        <div class="columns">
            <div class="column is-6">
                <div class="card">
                    <div class="card-header">
                        <p class="card-header-title">Personal Information</p>
                    </div>
                    <div class="card-content">
                        <div class="content">
                            <form id="personal-form" @submit.prevent="function(){}">
                                <div class="field">
                                    <label class="label">Name</label>
                                    <div class="control">
                                        <input class="input" v-model="name" type="text" placeholder="e.g Alex Smith">
                                    </div>
                                </div>

                                <div class="field">
                                    <label class="label">Email</label>
                                    <div class="control">
                                        <input class="disabled input" v-model="email" type="email" placeholder="e.g. alexsmith@gmail.com">
                                    </div>
                                </div>
                                <div class="field">
                                    <label class="label">Phone</label>
                                    <div class="control">
                                        <input class="input" type="text" v-model="phone" placeholder="e.g. +92 316 7943024">
                                    </div>
                                </div>
                                <div class="field">
                                    <label class="label">Password</label>
                                    <div class="control">
                                        <input class="input" type="password" v-model="password" placeholder="****************">
                                    </div>
                                    <p class="help">Leave blank if not to change.</p>
                                </div>
                                <div class="field" v-if="password">
                                    <label class="label">Confirm Password</label>
                                    <div class="control">
                                        <input class="input" v-model="confirm_password" type="password" placeholder="****************">
                                    </div>
                                </div>
                            </form>
                            <div class="field has-text-danger" v-if="personalFormErrors && personalFormErrors.length">
                                <p class="help" v-for="(error, key) in personalFormErrors" :key="key">{{error}}</p>
                            </div>
                        </div>
                    </div>
                    <footer class="card-footer">
                        <div class="card-footer-item">
                            <button type="submit" class="button is-fullwidth" @click.prevent="submitPersonalForm">Save</button>
                        </div>
                    </footer>
                </div>
                <br>
                <div class="card" v-if="$root.currentUser.address && $root.currentUser.address.length">
                    <div class="card-header">
                        <p class="card-header-title">Your Address</p>
                    </div>
                    <div class="card-content">
                        <div class="content">
                            <div class="container" v-for="address in $root.currentUser.address" :key="address.id">
                                <p>{{ address.address }}</p>
                                <div class="columns">
                                    <div class="column is-8">
                                        <p><b>{{ address.state }}</b> - <b>{{ address.country }}</b>
                                        </p>
                                    </div>
                                    <div class="column is-4" style="text-align: right">
                                        <a @click.prevent="editAddress($event, address)">Edit</a> &nbsp;
                                        <a @click.prevent="deleteAddress($event, address.id)">Delete</a>
                                    </div>
                                </div>
                                <hr>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="column is-6">

                <!--  -->

                <div class="card">
                    <div class="card-header">
                        <p class="card-header-title">{{ address_type == 'new' ? 'Address' : 'Edit Address'}}</p>
                    </div>
                    <div class="card-content">
                        <div class="content">
                            <form @submit.prevent="function(){}">
                                <div class="field">
                                    <label  class="label">Country</label>
                                    <input type="text" v-model="country" class="input" placeholder="Pakistan">
                                </div>
                                <div class="field">
                                    <label  class="label">State, Province</label>
                                    <input type="text" v-model="state" class="input" placeholder="Punjab">
                                </div>
                                <div class="field">
                                    <label  class="label">Address</label>
                                    <textarea class="textarea" v-model="address" placeholder="e.g. Sialkot Pakistan"></textarea>
                                </div>
                                <input type="hidden" v-model="address_type" >
                                <input type="hidden" v-model="address_id" >
                                <div class="field has-text-danger" v-if="addressFormErrors && addressFormErrors.length">
                                    <p class="help" v-for="(error, key) in addressFormErrors" :key="key">{{error}}</p>
                                </div>
                            </form>
                        </div>
                    </div>
                    <footer class="card-footer">
                        <div class="card-footer-item">
                            <button type="submit" class="button is-fullwidth" @click.prevent="submitAddressForm">Save</button>
                        </div>
                    </footer>
                </div>
                <br>
                <!-- <div class="card">
                    <div class="card-header">
                        <p class="card-header-title">Image</p>
                    </div>
                    <div class="card-content">
                        <div class="content">
                            <div class="image" :style="{'background-image': 'url(data:image/png;base64,' + ($root.currentUser.images && $root.currentUser.images.length) ? $root.currentUser.images[0].image : null + ')' }"></div>
                            <br>
                            <form  @submit.prevent="function(){}">
                                <div class="file has-name is-fullwidth">
                                    <label class="file-label">
                                        <input class="file-input" type="file" accept="image/*" name="resume" @change="handleFileChange($event)">
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
                                <div class="field has-text-danger" v-if="imageFormErrors && imageFormErrors.length">
                                    <p class="help" v-for="(error, key) in imageFormErrors" :key="key">{{error}}</p>
                                </div>
                            </form>
                        </div>
                    </div>
                    <footer class="card-footer">
                        <div class="card-footer-item">
                            <button type="submit" class="button is-fullwidth" @click.prevent="submitImageForm">Save</button>
                        </div>
                    </footer>
                </div> -->
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            name: null,
            email: null,
            phone: null,
            password: null,
            confirm_password: null,
            country: null,
            state: null,
            address: null,
            address_type: 'new',
            address_id: null,
            image: null,
            personalFormErrors: [],
            addressFormErrors: [],
            imageFormErrors: []
        }
    },
    created() {
        this.$root.setTitle('Edit Profile')
        this.$store.dispatch('loadUser')
    },
    mounted() {
        this.name = this.$root.currentUser.name
        this.email = this.$root.currentUser.email
        this.phone = this.$root.currentUser.phone
    },
    methods: {
        submitPersonalForm: function () {
            this.imageFormErrors = []
            this.addressFormErrors = []
            this.personalFormErrors = []

            let data = {
                name: this.name,
                phone: this.phone,
                password: this.password,
                confirm_password: this.confirm_password
            }
            this.$store.dispatch('updateUserPersonalInfo', data)
            .then(resp => {
                this.$toastr('info', resp.data.message, 'Information')
            }).catch(error => {
                this.personalFormErrors = []
                for (let key in error.response.data.errors) {
                    if (key && key.length) this.personalFormErrors.push(error.response.data.errors[key][0])
                }
            })
            this.$store.dispatch('loadUser')
        },
        submitAddressForm: function() {
            this.imageFormErrors = []
            this.addressFormErrors = []
            this.personalFormErrors = []

            let data = {
                state: this.state,
                country: this.country,
                address: this.address,
                address_id: this.address_id
            }
            if (this.address_type == 'new') {
                this.$store.dispatch('addNewAddress', data)
                .then(resp => {
                    this.$toastr('info', 'Success! Address was added.', 'Information')
                })
                .catch(error => {
                    this.addressFormErrors = []
                    for (let key in error.response.data.errors) {
                        if (key && key.length) this.addressFormErrors.push(error.response.data.errors[key][0])
                    }
                })
            } else {
                this.$store.dispatch('updateAddress', data)
                .then(resp => {
                    this.$toastr('info', 'Success! Address was updated.', 'Information')
                }).catch(error => {
                    this.addressFormErrors = []
                    for (let key in error.response.data.errors) {
                        if (key && key.length) this.addressFormErrors.push(error.response.data.errors[key][0])
                    }
                })
            }
            this.country = null
            this.state = null
            this.address = null
            this.address_type = 'new'
            this.$store.dispatch('loadUser')
        },
        editAddress: function(event, address) {
            this.country = address.country
            this.state = address.state
            this.address = address.address
            this.address_id = address.id
            this.address_type = 'edit'
            window.scrollTo(0,0)
        },
        deleteAddress: function(event, id) {
            this.$store.dispatch('deleteAddress', {address_id: id})
            .then(resp => {
                this.$toastr('info', 'Success! Address was deleted.', 'Information')
            }).catch(error => {
                this.$toastr('error', 'Aah! Something went wrong.', 'Error')
            })
            this.$store.dispatch('loadUser')
        },
        handleFileChange: function(event) {
            this.image = event.target.files[0]
            console.log(this.image, event)
        },
        submitImageForm: function() {
            this.imageFormErrors = []
            this.addressFormErrors = []
            this.personalFormErrors = []

            // let data = {
            //     image: this.image,
            //     imageable_id: this.$root.currentUser.id,
            //     imageable_type: 'user'
            // }
            let data = new FormData()
            data.append('image', this.image)
            data.append('imageable_id', this.$root.currentUser.id)
            data.append('imageable_type', 'user')
            this.$store.dispatch('addImage', data)
            .then(resp => {
                this.$toastr('info', 'Success! Image was uploaded.', 'Information')
            }).catch(error => {
                this.imageFormErrors = []
                if (error.response.data.error) {
                    this.$toastr('error', 'Aah! Something went wrong.', 'Error')
                } else if (error.response.data.errors) {
                    for (let key in error.response.data.errors) {
                        if (key && key.length) this.imageFormErrors.push(error.response.data.errors[key][0])
                    }
                }
            })
            this.$store.dispatch('loadUser')
        }
    }
}
</script>

<style scoped>
.image {
    width: 150px;
    height: 150px;
    margin: 10px auto;
    border-radius: 50%;
    background-size: cover;
    background-color: #cccccc;
    background-repeat: no-repeat;
    background-position: center center;
}
</style>
