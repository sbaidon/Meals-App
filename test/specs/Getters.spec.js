import store from '../../src/store'    

describe('Getters', () => {
  it('allOrders, activeOrders, historyOrders', () => {
    expect(store.getters.allOrders).to.be.empty
    store.commit('SET_ORDER', { key: 1, order: { name: 'an order', status: 'Finalized' } })
    store.commit('SET_ORDER', { key: 2, order: { name: 'an order', status: 'Ordered' } })
    store.commit('SET_ORDER', { key: 3, order: { name: 'an order', status: 'Delivered' } })
    expect(store.getters.allOrders).to.have.length(3)
    expect(store.getters.activeOrders).to.have.length(2)
    expect(store.getters.historyOrders).to.have.length(1)
  })
})
