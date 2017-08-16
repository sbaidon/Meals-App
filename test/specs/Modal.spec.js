import Vue from 'vue'
import Modal from '../../src/components/Modal.vue'
import { simulate, waitForUpdate, mount } from 'vue-unit'


describe('Modal.vue', () => {
    it('should render correctly', () => {
      const Constructor = Vue.extend(Modal)
      const vm = new Constructor().$mount()
      expect(vm.$el).to.not.be.null
    })

    it('should emit closeModal event when clicked on background', (done) => {
      const Constructor = Vue.extend(Modal)
      const vm = new Constructor().$mount()
      const cb = sinon.spy()
      const background = vm.$el.querySelector('#background')
      vm.$on('closeModal', cb)
      simulate(background, 'click')
      waitForUpdate(() => {
        expect(cb.called).to.equal(true)
      })
      .end(done)
    })

     it('should emit closeModal event when clicked on close button', (done) => {
      const Constructor = Vue.extend(Modal)
      const vm = new Constructor().$mount()
      const cb = sinon.spy()
      const close = vm.$el.querySelector('#close-button')
      vm.$on('closeModal', cb)
      simulate(close, 'click')
      waitForUpdate(() => {
        expect(cb.called).to.equal(true)
      })
      .end(done)
    })
})