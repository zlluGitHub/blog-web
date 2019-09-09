import Vue from 'vue';
import Vuex from 'vuex';
import article from './article';
import say from './say';
import comment from './comment';
import share from './share';
import music from './music';

Vue.use(Vuex);

const store = () => new Vuex.Store({
  modules: {
    article,
    say,
    comment,
    share,
    music
  }
});

export default store