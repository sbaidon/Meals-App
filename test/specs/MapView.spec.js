import Vue from 'vue'
import MapView from '../../src/components/MapView.vue'
import { simulate, waitForUpdate, mount } from 'vue-unit'


describe('MapView.vue', () => {
  it('Should render google maps correctly', () => {
    const spy = sinon.spy(MapView.methods, 'attachMap')
    const Constructor = Vue.extend(MapView)
    const vm = new Constructor().$mount()
    expect(spy.called).to.be.true
    expect(vm.$el.querySelector('#map')).to.not.be.null
  })

  it('Should emit error when no restaurant is selected', () => {
    const Constructor = Vue.extend(MapView)
    const vm = new Constructor().$mount()
    expect(vm.isRestaurant(null)).to.be.false
    expect(vm.isRestaurant({})).to.be.false
    expect(vm.isRestaurant({ types: [] })).to.be.false
    expect(vm.isRestaurant({ types: ['restaurant'] })).to.be.true
  })

  it('Should emit error when restaurant does not have all needed properties', () => {
    const Constructor = Vue.extend(MapView)
    const vm = new Constructor().$mount()
    expect(vm.hasProperties(null)).to.be.false
  })
})