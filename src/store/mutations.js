
const mutations = {
  setRouterAnimate (state, direction) {
    console.log(state, direction)
    state.routerAnimate = direction.direction
  }
}

export default mutations
