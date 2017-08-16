<template>
	<section class="section">
		<div class="container">
			<h1 id="title" class="title" v-text="isNewUser ? 'Sign Up' : 'Login' ">Sign Up</h1>
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
			<div class="field" v-if="isNewUser" >
				<p class="control has-icons-left">
					<input class="input" type="password" v-model="repeatPassword" placeholder="Repeat Password">
					<span class="icon is-small is-left">
        <i class="fa fa-lock"></i>
        </span>
				</p>
			</div>
			<div class="field" v-if="!isNewUser">
				<button class="button is-success" id="login" @click.prevent="login(email, password)">Login</button>
			</div>
			<div class="field" v-if="!isNewUser">
				<button class="button is-danger" @click="googleLogin()">Google</button>
			</div>
			<div class="field" v-if="!isNewUser">
				<button class="button is-info" @click="githubLogin()">Github</button>
			</div>
			<div class="field" v-if="isNewUser">
				<button class="button is-success" @click="signup(email, password, name)">Signup</button>
			</div>
			<span> {{ accountMessage }} 
        <a id="signup" @click="isNewUser = !isNewUser" v-text="isNewUser ? 'Login' : 'Sign Up' "></a>
    </span>
		</div>
	</section>
</template>

<script>

export default {
	name: 'login',
	data() {
		return {
      isNewUser: false,
			password: '',
			repeatPassword: '',
      email: '',
      name: '',
		}
	},
	computed: {
		accountMessage() {
			return this.isNewUser ? 'Already have an account?' : "Dont't have an account?"
		},
		match() {
      return this.password === this.repeatPassword
		}
	},
	methods: {
		login(email, password) {
			if(!email || !password) return this.$store.commit('PUSH_ERROR', 'Please fill in all the fields') 
      this.$store.dispatch('login', { email, password })
      .then(() => this.$router.push('/home'))
		},
		googleLogin() {
      this.$store.dispatch('googleLogin')	
      .then(() => this.$router.push('/home'))
    },
    githubLogin() {
      this.$store.dispatch('githubLogin')
      .then(() => this.$router.push('/home'))
		},
		signup(email, password, name) {
			if(!email || !password || !name) return this.$store.commit('PUSH_ERROR', 'Please fill in all the fields')
			if (!this.match) return this.$store.commit('PUSH_ERROR', "The passwords don't match ")
			this.$store.dispatch('signup', { email, password, name })
			.then(() => this.$router.push('/home'))
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