import Vue from 'vue'
import OrdersView from '../../src/views/OrdersView.vue'
import { simulate, waitForUpdate } from 'vue-unit'
import store from '../../src/store'


describe('OrdersView.vue', (done) => {
    it('addMeal', () => {
      const Constructor = Vue.extend(OrdersView)
      const vm = new Constructor().$mount()
      vm.addMeal({ name: 'a great order' })
      waitForUpdate(() => {
        expect(vm.isModalOpen).to.be.true
        expect(vm.selectedOrder).to.deep.equal({ name: 'a great order' })
      }).end(done)
    })
})