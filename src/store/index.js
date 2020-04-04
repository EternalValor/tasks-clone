import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    count: 0,
    lists: {
      'My List': {
        tasks: []
      }
    },
    currentList: 'My List',
    editing: {
      list: null,
      id: null
    }
  },
  mutations: {
    unShiftTask(state, list) {
      state.lists[list].tasks.unshift({
        id: state.count,
        title: '',
        details: '',
        completed: false
      });
    },
    increment(state) {
      state.count++;
    },
    setTasks(state, { list, tasks }) {
      state.lists[list].tasks = tasks;
    },
    setCurrentList(state, list) {
      state.currentList = list;
    },
    setLists(state, lists) {
      state.lists = lists;
    },
    setEditing(state, editing) {
      state.editing = editing;
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
    },
    toggleEditing({ state, commit }, id = null) {
      if (id !== null) commit('setEditing', { list: state.currentList, id });
      else commit('setEditing', { list: null, id: null });
    },
    editTask({ state, commit }, { name, value, list, id }) {
      const newTasks = state.lists[list].tasks.reduce((prev, curr) => {
        if (curr.id === id) return [...prev, { ...curr, [name]: value }];
        else return [...prev, curr];
      }, []);
      commit('setTasks', { list, tasks: newTasks });
    },
    moveTask({ state, commit }, { newList, list, id }) {
      let taskToMove;
      const newTasks = state.lists[list].tasks.filter(task => {
        if (task.id === id) {
          taskToMove = task;
          return false;
        }
        return true;
      }, []);
      const shiftedTasks = [taskToMove, ...state.lists[newList].tasks];
      commit('setTasks', { list, tasks: newTasks });
      commit('setTasks', { list: newList, tasks: shiftedTasks });
      commit('setEditing', { list: newList, id });
    }
  },
  getters: {
    todo: state =>
      state.lists[state.currentList].tasks.filter(task => !task.completed),
    completed: state =>
      state.lists[state.currentList].tasks.filter(task => task.completed),
    lists: state => Object.keys(state.lists),
    editingTask: state =>
      state.editing.list !== null
        ? state.lists[state.editing.list].tasks.filter(
            task => task.id === state.editing.id
          )[0]
        : { title: '', details: '' }
  }
});
