const reTabStoreModule = {
    state: () => ({
        activeRoute: {}
    }),
    mutations: {
        setActiveRoute(state: any, route: object) {
            console.log(route)
            state.activeRoute = route;
        }
    }
}

export default reTabStoreModule;