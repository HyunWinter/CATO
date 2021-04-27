import {
    MDBBtn,
    MDBNavbar,
    MDBNavbarToggler,
    MDBNavbarBrand,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBCollapse,
} from 'mdb-vue-ui-kit';
import firebase from '@/firebase'

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
    methods: {
        goToHome: function() {
            this.$router.push({
                path: "/home"
            }).catch(() => {});
        },
        goToAccount: function() {
            this.$router.push({
                path: "/account"
            }).catch(() => {});
        },
        goToCourse: function() {
            var courseID = window.location.href.split('course=')[1];
            this.$router.push('/chatbot?course=' + courseID).catch(() => {});
        },
        goToMaterials: function() {
            var courseID = window.location.href.split('course=')[1];
            this.$router.push('/materials?course=' + courseID).catch(() => {});
        },
        signOut: async function() {
            await firebase.auth().signOut();
            this.$router.push('/');
        }
    },
};