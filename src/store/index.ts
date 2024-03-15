import {createStore} from 'vuex'
import reTabStoreModule from "@/store/modules/re-tab.ts";

export const store = createStore({
    modules: {
        reTabStore: reTabStoreModule
    }
})