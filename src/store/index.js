import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    lists: {
      'My List': {
        count: 0,
        tasks: []
      }
    },
    currentList: 'My List'
  },
  mutations: {
    unShiftTask(state, list) {
      state.lists[list].tasks.unshift({
        id: state.lists[list].count,
        title: '',
        detail: '',
        completed: false
      });
    },
    increment(state, list) {
      state.lists[list].count++;
    },
    setTasks(state, { list, tasks }) {
      state.lists[list].tasks = tasks;
    },
    setCurrentList(state, list) {
      state.currentList = list;
    },
    setLists(state, lists) {
      state.lists = lists;
    }
  },
  actions: {
    addTask({ state, commit }) {
      commit('increment', state.currentList);
      commit('unShiftTask', state.currentList);
    },
    completeTask({ state, commit }, id) {
      const newTasks = state.lists[state.currentList].tasks.reduce(
        (prev, curr) => {
          if (curr.id === id) curr.completed = true;
          return [...prev, curr];
        },
        []
      );
      commit('setTasks', { list: state.currentList, tasks: newTasks });
    },
    deleteTask({ state, commit }, id) {
      const newTasks = state.lists[state.currentList].tasks.filter(
        task => task.id !== id
      );
      commit('setTasks', { list: state.currentList, tasks: newTasks });
    },
    changeList({ commit }, list) {
      commit('setCurrentList', list);
    },
    addList({ state, commit }, list) {
      commit('setLists', { ...state.lists, [list]: { count: 0, tasks: [] } });
    }
  },
  getters: {
    todo: state =>
      state.lists[state.currentList].tasks.filter(task => !task.completed),
    completed: state =>
      state.lists[state.currentList].tasks.filter(task => task.completed),
    lists: state => Object.keys(state.lists)
  }
});
