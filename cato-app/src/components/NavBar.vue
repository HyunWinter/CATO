<template>
    <MDBNavbar expand="lg" dark style="background-color: #4d84e2" container>
        <MDBNavbarBrand href="." class="bold">CATO</MDBNavbarBrand>
        <MDBNavbarToggler 
            @click="collapse1 = !collapse1" 
            target="#navbarSupportedContent">
        </MDBNavbarToggler>
        <MDBCollapse v-model="collapse1" id="navbarSupportedContent">
            <MDBNavbarNav class="mb-0 mb-lg-0">
                <MDBNavbarItem to="/home">
                    Home
                </MDBNavbarItem>
                <MDBNavbarItem href='javascript:'
                    v-on:click="goToCourse()"
                    v-if="$route.path == '/chatbot' || $route.path == '/materials'">
                    Chatbot
                </MDBNavbarItem>
                <MDBNavbarItem href="javascript:"
                    v-on:click="goToMaterials()"
                    v-if="$route.path == '/chatbot' || $route.path == '/materials'">
                    Course Materials
                </MDBNavbarItem>
                <MDBNavbarItem to="/account">
                    Account
                </MDBNavbarItem>
                <MDBNavbarItem to="/help">
                    Help
                </MDBNavbarItem>
            </MDBNavbarNav>
            <MDBBtn 
                outline="white" rounded class="mdbbtn"
                v-on:click="Logout()">
                Sign Out
            </MDBBtn>
        </MDBCollapse>
    </MDBNavbar>
</template>

<script>
import {
    MDBBtn,
    MDBNavbar,
    MDBNavbarToggler,
    MDBNavbarBrand,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBCollapse,
} from 'mdb-vue-ui-kit';
import { ref } from 'vue';
import firebase from 'firebase';

export default {
    name: "NavBar",
    components: {
        MDBBtn,
        MDBNavbar,
        MDBNavbarToggler,
        MDBNavbarBrand,
        MDBNavbarNav,
        MDBNavbarItem,
        MDBCollapse,
    },
    setup() {
        const collapse1 = ref(false);

        return {
            collapse1
        }
    },
    methods: {
        goToHome: function () {
            this.$router.push({ path: "/home" }).catch(()=>{});
        },
        goToAccount: function () {
            this.$router.push({ path: "/account" }).catch(()=>{});
        },
        goToCourse: function () {
            var courseID = window.location.href.split('course=')[1];
            this.$router.push('/chatbot?course=' + courseID).catch(()=>{});
        },
        goToMaterials: function () {
            var courseID = window.location.href.split('course=')[1];
            this.$router.push('/materials?course=' + courseID).catch(()=>{});
        },
        Logout: function() {
            firebase
				.auth()
				.signOut()
				.then(() => {
					//alert('Successfully logged out');
					this.$router.push('/');
				})
				.catch(error => {
					alert(error.message);
					this.$router.push('/');
				});
        },
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
* {
    font-family: "Poppins", sans-serif;
    font-size: 23px;
}

.mdbbtn {
    font-size: 15px;
}

.bold {
    font-weight: bold;
}
</style>
