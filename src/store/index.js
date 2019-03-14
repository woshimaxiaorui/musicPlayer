import Vue from 'vue'
import Vuex from "vuex"
import Music from './music'
Vue.use(Vuex);

const store = new Vuex.Store({
	modules : {
		Music
	}
})

export default store;

