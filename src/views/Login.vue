<template>
	<section class="section">
		<div class="container">
			<h1 class="title">{{ mode }}</h1>
      <div class="field" v-if="isNewUser">
        <p class="control has-icons-left has-icons-right">
          <input class="input" type="text" v-model="name" placeholder="Name">
          <span class="icon is-small is-left">
            <i class="fa fa-user"></i>
          </span>
        </p>
      </div>
			<div class="field">
				<p class="control has-icons-left has-icons-right">
					<input class="input" type="email" v-model="email" placeholder="Email">
					<span class="icon is-small is-left">
        <i class="fa fa-envelope"></i>
        </span>
					<span class="icon is-small is-right">
        <i class="fa fa-check"></i>
        </span>
				</p>
			</div>
			<div class="field">
				<p class="control has-icons-left">
					<input class="input" type="password" v-model="password" placeholder="Password">
					<span class="icon is-small is-left">
        <i class="fa fa-lock"></i>
        </span>
				</p>
			</div>
			<div class="field">
				<button class="button is-success" @click.prevent="login">{{ mode }}</button>
			</div>
			<div class="field" v-if="!isNewUser">
				<button class="button is-danger" @click="socialLogin">Google</button>
			</div>
			<div class="field" v-if="!isNewUser">
				<button class="button is-info" @click="socialLogin">Github</button>
			</div>
			<span> {{ accountMessage }} 
        <a @click="isNewUser = !isNewUser"> {{ mode }}</a>
    </span>
		</div>
	</section>
</template>

<script>
import firebase from 'firebase'

export default {
	name: 'login',
	data() {
		return {
			isNewUser: false
		}
	},
	computed: {
		mode() {
			return this.isNewUser ? 'Sign Up' : 'Login'
		},
		accountMessage() {
			return this.isNewUser ? 'Already have an account?' : "Dont't have an account?"
		},
	},
	methods: {
		login(email, password) {
      
		},
		socialLogin(provider) {
			
		}
	}
}
</script>

<style scoped lang="sass">
	.container 
	  width: 30vw 
	
	.button 
	  width: 100%
</style>