import Vue from 'vue';
import Vuex from 'vuex';
import counter from './modules/counter';
import cart from './modules/cart';
import user from './modules/user';
import classify from './modules/classify';
import login from './modules/login';
Vue.use(Vuex);

export default new Vuex.Store({
    modules:{
        counter:counter,
        cart,
        user,
        classify,
        login
    }
})
