import Vue from 'vue';
import Vuex from 'vuex';
import article from './article';
import say from './say';
import comment from './comment';

Vue.use(Vuex);

const store = () => new Vuex.Store({
  modules: {
    article,
    say,
    comment
  }
});

export default store