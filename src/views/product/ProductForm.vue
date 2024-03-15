<template>
    <div class="produdct_form">
        <div class="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
            <h3 class="display-5">Product Infomation</h3>
            <router-link to="/Product">Back</router-link>
        </div>

        <div class="container">
            <form @submit.prevent="save()">
                <div class="form-group row">
                    <label for="inputPassword" class="col-sm-3 col-form-label">Product name</label>
                    <div class="col-sm-9">
                        <input type="text" class="form-control" v-model="product.name"
                            v-bind:class="{ 'is-invalid': errors.name }" @blur="validate()" />
                        <div class="invalid-feedback" v-if="errors.name">{{ errors.name }}</div>
                    </div>

                </div>
                <div class="form-group row">
                    <label for="inputPassword" class="col-sm-3 col-form-label">Product price</label>
                    <div class="col-sm-9">
                        <input type="text" class="form-control" v-model="product.price"
                            v-bind:class="{ 'is-invalid': errors.price }" @blur="validate()" />
                        <div class="invalid-feedback" v-if="errors.price">{{ errors.price }}</div>
                    </div>
                </div>
                <div class="form-group row">
                    <label for="inputPassword" class="col-sm-3 col-form-label">Product description</label>
                    <div class="col-sm-9">
                        <textarea class="form-control" v-model="product.description" rows="3"
                            v-bind:class="{ 'is-invalid': errors.description }" @blur="validate()"></textarea>
                        <div class="invalid-feedback" v-if="errors.price">{{ errors.price }}</div>
                    </div>
                </div>
                <div class="form-group row">
                    <label for="inputPassword" class="col-sm-3 col-form-label"></label>
                    <div class="col-sm-9 text-left">
                        <router-link to="/Product">
                            <button type="reset" class="btn btn-danger" @click="cancel()">Cancel</button>
                            &nbsp;
                        </router-link>

                        <button type="submit" class="btn btn-primary">Save</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>


<script>
export default {
    name: "ProductForm",
    data() {
        return {
            errors: {
                name: "",
                price: "",
                description: ""
            },
            product: {
                name: "",
                price: "",
                description: "",
            }
        }
    },

    created() {
        let productId = this.$route.params.id
        if (productId) {
            this.getInforProduct(productId);
        }
    },
    methods: {
        validate() {
            let isValid = true;
            this.errors = {
                name: "",
                price: "",
                description: "",
            };
            if (!this.product.name) {
                this.errors.name = "Product name is required";
                isValid = false;
            }
            if (!this.product.price) {
                this.errors.price = "Product price is required";
            } else if (!this.isNumber(this.product.price)) {
                this.errors.price = "Product price is Number"
                isValid = false;
            }
            if (!this.product.description) {
                this.errors.description = "Description price is required";
                isValid = false;
            }
            return isValid;
        },
        isNumber(value) {
            return /^\d+$/.test(value);
        },
        save() {
            if (this.validate()) {
                if (this.product.id) {
                    this.$request.put(`http://localhost:3000/product/${this.product.id}`, this.product).then(res => {
                        if (res) {
                            this.$router.push({ name: 'product.list' }) // Thêm thành công chuyển trang 
                            return
                        } else {
                            alert("Thêm thất bại")
                        }
                    })
                    return;
                }
                this.$request.post('http://localhost:3000/product', this.product).then(res => {
                    if (res) {
                        this.$router.push({ name: 'product.list' }) // Thêm thành công chuyển trang 
                        return
                    } else {
                        alert("Thêm thất bại")
                    }
                })
            }
        },
        getInforProduct(productId) {
            this.$request.get(`http://localhost:3000/product/${productId}`).then(res => {
                this.product = res.data;
            })
        },
        cancel() {
            this.product.name = '';
            this.product.price = '';
            this.product.description = '';
        }

    }
}
</script>