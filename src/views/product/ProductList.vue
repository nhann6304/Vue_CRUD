<template>
    <div class="product_list">
        <div class="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
            <h3 class="display-4">Product Management</h3>
            <p>
                <router-link to="/Product/create">Add new</router-link>
            </p>
        </div>

        <div class="container">
            <div class="card-deck mb-3">
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Product name</th>
                            <th scope="col">Price</th>
                            <th scope="col">Handle</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr :key="index" v-for="(item, index) in product">
                            <th scope="row">{{ item.id }}</th>
                            <td>{{ item.name }}</td>
                            <td>{{ item.price }}</td>
                            <!-- <td>{{ item.description }}</td> -->
                            <td>
                                <button class="btn btn-primary">Edit</button>
                                <button class="btn btn-danger ml-2" @click="onDelete(item.id)">Delete</button>

                            </td>
                        </tr>

                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "ProductForm",
    data() {
        return {
            product: []
        }
    },
    // created là hàm chạy đầu tiên của component này
    created() {
        this.getAll();
    },
    methods: {
        getAll() {
            this.$request.get('http://localhost:3000/product').then(res => {
                this.product = res.data
            })
        },
        onDelete(productId) {
            this.$swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            }).then((result) => {
                if (result.isConfirmed) {
                    this.$request.delete(`http://localhost:3000/product/${productId}`).then(res => {
                        if (res.data) {
                            this.$swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success",
                            });
                            this.getAll();
                        }
                    })
                }
            });
        }
    }

}
</script>