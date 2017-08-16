import Vue from 'vue'
import Login from '../../src/views/Login.vue'
import { simulate, waitForUpdate } from 'vue-unit'
import store from '../../src/store'



describe('Login.vue', () => {
    it('should render correctly', () => {
      const Constructor = Vue.extend(Login)
      const vm = new Constructor({ store }).$mount()
      expect(vm.$el.querySelector('#title').textContent)
        .to.equal('Login')
    })

    it('should start on login mode', () => {
      const defaultData = Login.data()
      expect(defaultData.isNewUser).to.equal(false)
    })

    it('should update accordingly when mode is changed', () => {
      const Constructor = Vue.extend(Login)
      const vm = new Constructor({ store }).$mount()
      expect(vm.accountMessage).to.equal("Dont't have an account?") 
      vm.isNewUser = true
      Vue.nextTick(() => {
        expect(vm.accountMessage).to.equal('Already have an account?')
      })
    })

    it('should send an error when values are missing', () => {
      const Constructor = Vue.extend(Login)
      const vm = new Constructor({ store }).$mount()
      vm.password = 'an awesome password'
      const button = vm.$el.querySelector('#login')
      simulate(button, 'click')
      vm.$nextTick(() => {
        expect(vm.$store.state.errors).to.not.be.empty
      })
    })

    it('should not allow singup if passwords dont match', (done) => {
      const Constructor = Vue.extend(Login)
      const vm = new Constructor({ store }).$mount()
      vm.isNewUser = true
      waitForUpdate(() => {
        const button = vm.$el.querySelector('#signup')
        vm.password = 'an awesome password'
        vm.repeatPassword = 'a better password'
        vm.name = 'a great name'
        vm.email = 'sbaidon@outlook.com'
        simulate(button, 'click')
      })
      .then(() => {
        expect(vm.match).to.equal(false)
      })
      .end(done)
    })
})