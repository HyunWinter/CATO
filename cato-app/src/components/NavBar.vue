<template>
    <MDBNavbar expand="lg" dark style="background-color: #4d84e2" container class="ps-2 pe-2">
        <MDBNavbarBrand href="/home" class="bold">CATO</MDBNavbarBrand>
        <MDBNavbarToggler 
            @click="collapse1 = !collapse1" 
            target="#navbarSupportedContent">
        </MDBNavbarToggler>
        <MDBCollapse v-model="collapse1" id="navbarSupportedContent">
            <MDBNavbarNav class="mb-2 mb-lg-0">
                <MDBNavbarItem to="/home">
                    Home
                </MDBNavbarItem>
                <MDBNavbarItem href='javascript:'
                    v-on:click="goToCourse()"
                    v-if="$route.path == '/chatbot' || $route.path == '/materials'"
                    >
                    Chatbot
                </MDBNavbarItem>
                <MDBNavbarItem href="javascript:"
                    v-on:click="goToMaterials()"
                    v-if="$route.path == '/chatbot' || $route.path == '/materials'"
                    >
                    Course Materials
                </MDBNavbarItem>
            </MDBNavbarNav>
            <MDBNavbarNav right class="mb-2 mb-lg-0 me-2">
                <MDBNavbarItem to="/account">
                    Account
                </MDBNavbarItem>
                <MDBNavbarItem to="/help">
                    Help
                </MDBNavbarItem>
                <MDBNavbarItem to="#" v-if="isLogin">
                    isLogin True
                </MDBNavbarItem>
            </MDBNavbarNav>
            <MDBBtn 
                outline="white" rounded class="mdbbtn"
                v-on:click="signOut">
                Sign Out
            </MDBBtn>
        </MDBCollapse>
    </MDBNavbar>
</template>

<script src="../scripts/NavBar.js"></script>

<style scoped src="../styles/NavBar.css"></style>