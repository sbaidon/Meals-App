import mutations from '../../src/store/mutations'

describe('Mutations', () => {
    it('SET_USER', () => {
      const state = { user: {} }
      const { SET_USER } = mutations
      SET_USER(state, { user: { name: 'a name' } })
      expect(state.user).to.be.to.have.property('name')
    }) 

    it('SET_RESTAURANT', () => {
        const state = { restaurants: {} }
        const restaurant = { name: 'some restaurant' }
        const key = '1'
        const { SET_RESTAURANT } = mutations
        SET_RESTAURANT(state, { restaurant, key })
        expect(state.restaurants[key]).to.be.a.object
        expect(state.restaurants[key].name).to.be.equal('some restaurant')
        restaurant.name = 'another restaurant'
        SET_RESTAURANT(state, { restaurant, key })
        expect(state.restaurants[key].name).to.be.equal('another restaurant')
    })


    it('EMPTY_RESTAURANTS', () => {
        const state = { 
            restaurants: { 
                1: { name: 'one' } , 
                2: { name: 'two' } 
            } 
        }
        const { EMPTY_RESTAURANTS } = mutations
        EMPTY_RESTAURANTS(state)
        expect(state.restaurants).to.be.empty
    })

    it('SET_ORDER', () => {
      const state = { orders: {} }
      const order = { name: 'an order' }
      const key = '1'
      const { SET_ORDER } = mutations
      SET_ORDER(state, { order, key })
      expect(state.orders[key]).to.be.a.object
      expect(state.orders[key].name).to.be.equal('an order')
      order.name = 'another order'
      SET_ORDER(state, { order, key })
      expect(state.orders[key].name).to.be.equal('another order')
    })

    it('PUSH_ERROR', () => {
        const state = { errors: ['An error'] }
        const { PUSH_ERROR } = mutations
        const { CLEAR_ERRORS } = mutations
        CLEAR_ERRORS(state)
        expect(state.errors).to.be.empty
        PUSH_ERROR(state, 'First error')
        PUSH_ERROR(state, 'Second error')
        expect(state.errors).to.have.length(2)
    })
})
