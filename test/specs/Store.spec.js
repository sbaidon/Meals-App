import store from '../../src/store'
/*
describe('Vuex Store', () => {
    it('SET_USER mutation behaves accordingly', () => {
      store.commit('SET_USER', {user: { name: ''}})
      expect(store.state.user).to.be.a.object 
    }) 

    it('SET_RESTAURANT mutation behaves accordingly', () => {
        const restaurant = { name: 'some restaurant' }
        const key = '1'
        store.commit('SET_RESTAURANT', { ...restaurant, key })
        expect(store.state.restaurants[key]).to.be.a.object
        restaurant.name = 'name was changed'
        expect(store.state.restaurants[key].name).to.not.be.equal('some restaurant')
        store.commit('SET_RESTAURANT', { restaurant, key })
        expect(store.state.restaurants[key].name).to.be.equal('name was changed')
    })


    it('EMPTY_RESTAURANT mutation behaves accordingly', () => {
        store.commit('SET_RESTAURANT', { restaurant: { name: 'some restaurant' }, key: '123432123' })
        expect(store.state.restaurants).to.be.a.object
        store.commit('EMPTY_RESTAURANTS')
        expect(store.state.restaurants).to.be.empty
    })

    it('PUSH_ERROR mutation behaves accordingly', () => {
        store.commit('CLEAR_ERRORS')
        store.commit('PUSH_ERROR', 'An error')
        store.commit('PUSH_ERROR', 'Another Error')
        expect(store.state.errors).to.have.length(2)
        store.commit('CLEAR_ERRORS')
        expect(store.state.errors).to.be.empty
    })

    it('Getters behave accordingly', () => {
        expect(store.getters.allOrders).to.be.empty
        store.commit('SET_ORDER', { key: 1, order: { name: 'an order', status: 'Finalized' } })
        store.commit('SET_ORDER', { key: 2, order: { name: 'an order', status: 'Ordered' } })
        store.commit('SET_ORDER', { key: 3, order: { name: 'an order', status: 'Delivered' } })
        expect(store.getters.allOrders).to.have.length(3)
        expect(store.getters.activeOrders).to.have.length(2)
        expect(store.getters.historyOrders).to.have.length(1)
    })

    it('watchData action should retrieve data', () => {
      store.dispatch('watchData')
      console.log(store)
     
    })

})
*/