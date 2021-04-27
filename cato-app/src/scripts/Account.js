import firebase from 'firebase';

export default {
	name: "Account",
	methods: {
		ResetPassword: function () {
            var email = firebase.auth().currentUser.email;

            firebase
				.auth()
				.sendPasswordResetEmail(email)
				.then(() => {
					alert('Password Email Sent!');
					this.SignOut();
				})
				.catch(error => {
					alert(error.message);
					this.$router.push('/');
				});
		},
        SignOut: function () {
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
        DeleteAccount: function () {
			firebase
				.auth()
				.signOut()
				.then(() => {
					alert('Account disabled. It can take up to 2 weeks to delete your account. Log in to enable again.');
					this.$router.push('/');
				})
				.catch(error => {
					alert(error.message);
					this.$router.push('/');
				});
		}
	},
    beforeMount() {
        this.user_email = "Email: " + firebase.auth().currentUser.email;
    }
};