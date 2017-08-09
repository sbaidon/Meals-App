export default {
    userOrders(state) {
      if (state.user.orders) {
        return Object.keys(state.user.orders).map(order => state.orders[order])
      }
      return []
    },
    allOrders(state) {
      if (state.orders) {
        return Object.keys(state.orders).map(order => state.orders[order])
      }
    },
    activeOrders(state, getters) {
      return getters.allOrders.filter(order => order.status != 'Finalized')
    },
    historyOrders(state, getters) {
      return getters.allOrders.filter(order => order.status === 'Finalized')
    }
}