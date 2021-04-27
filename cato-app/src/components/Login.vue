<template>
  <div class="box position-relative">
    <div class="forms-container position-absolute">
      <div class="signin-signup position-absolute">
        <!-- Sign In -->
        <form action="#" class="sign-in-form">
			<h2 class="title">Sign in</h2>
			<div class="input-field">
				<i class="fas fa-user"></i>
				<input type="text" placeholder="Email" v-model="loginForm.email"/>
			</div>
			<div class="input-field">
				<i class="fas fa-lock"></i>
				<input type="password" placeholder="Password" v-model="loginForm.password"/>
			</div>
			<input
				type="button"
				value="Log In"
				class="btn solid"
                v-on:click="signIn"
			/>
        </form>
        <!-- Sign Up -->
        <form action="#" class="sign-up-form">
			<h2 class="title">Sign up</h2>
			<!-- <div class="input-field">
				<i class="fas fa-user"></i>
				<input type="text" placeholder="Username" v-model="loginForm.password"/>
			</div> -->
			<div class="input-field">
				<i class="fas fa-envelope"></i>
				<input type="email" placeholder="Email" v-model="signupForm.email"/>
			</div>
			<div class="input-field">
				<i class="fas fa-lock"></i>
				<input type="password" placeholder="Password" v-model="signupForm.password"/>
			</div>
			<input
				type="button"
				class="btn"
				value="Sign up"
				v-on:click="SignUp()"
			/>
        </form>
      </div>
    </div>
    <div class="panels-container">
      <!-- Open Sign Up -->
      <div class="panel left-panel">
        <div class="content">
			<h3>Welcome To CATO</h3>
			<p>
				Cato is an artificial intelligence chatbot to help your course work.
				You can create a new account with an OIT email.
			</p>
			<button class="btn transparent" v-on:click="addSignUp()">
				Sign up
			</button>
        </div>
      </div>
      <!-- Open Sign In -->
      <div class="panel right-panel">
        <div class="content">
			<h3>Already Have An Account?</h3>
			<p>Welcome back! Click the Sign In button below and get started.</p>
			<button class="btn transparent" v-on:click="addSignIn()">
				Sign In
			</button>
        </div>
      </div>
    </div>
  </div>
</template>

<!-- Scripts -->
<script src="../scripts/Login.js"></script>

<style scoped src="../styles/Login.css"></style>
<!-- Scoped Style -->

