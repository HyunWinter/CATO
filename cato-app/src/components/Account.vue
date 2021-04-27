<template>
    <div class="box">
        <h1>Account Info</h1>
        <p>{{ user_email }}</p>

        <h1>Account Management</h1>
        <button
            type="button"
            v-on:click="ResetPassword()">
            Reset Password
        </button>
        <button
            type="button"
            v-on:click="DeleteAccount()">
            Delete Account
        </button>
    </div>
</template>

<!-- Scripts -->
<script src="../scripts/Account.js"></script>

<!-- Scoped Style -->
<style scoped src="../styles/Account.css"></style>