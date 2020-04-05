import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: window.localStorage.getItem('STORE')
    ? JSON.parse(window.localStorage.getItem('STORE'))
    : {
        count: 0,
        lists: {
          'My List': {
            tasks: [],
          },
        },
        currentList: 'My List',
        editing: {
          list: null,
          id: null,
        },
        archive: {
          list: '',
          index: -1,
          task: {},
          undone: false,
        },
      },
  mutations: {
    unShiftTask(state, list) {
      state.lists[list].tasks.unshift({
        id: state.count,
        title: '',
        details: '',
        completed: false,
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
    },
    setArchive(state, archive) {
      state.archive = { ...state.archive, ...archive };
    },
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
        (task, index) => {
          if (task.id === id) {
            commit('setArchive', {
              list: state.currentList,
              index,
              task,
              undone: false,
            });
            return false;
          }
          return true;
        }
      );
      commit('setTasks', { list: state.currentList, tasks: newTasks });
      setTimeout(() => {
        commit('setArchive', { list: '', index: -1, task: {} });
      }, 5000);
    },
    changeList({ commit }, list) {
      commit('setCurrentList', list);
    },
    addList({ state, commit }, list) {
      commit('setLists', { ...state.lists, [list]: { tasks: [] } });
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
      if (newList === list) return;
      let taskToMove;
      const newTasks = state.lists[list].tasks.filter((task) => {
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
    },
    undoDelete({ state, commit }) {
      const { list, index, task } = state.archive;
      const newTasks = [
        ...state.lists[list].tasks.slice(0, index),
        task,
        ...state.lists[list].tasks.slice(index),
      ];
      commit('setTasks', { list, tasks: newTasks });
      commit('setArchive', { list: '', index: -1, task: {}, undone: true });
      setTimeout(() => {
        commit('setArchive', { undone: false });
      }, 5000);
    },
  },
  getters: {
    todo: (state) =>
      state.lists[state.currentList].tasks.filter((task) => !task.completed),
    completed: (state) =>
      state.lists[state.currentList].tasks.filter((task) => task.completed),
    lists: (state) => Object.keys(state.lists),
    editingTask: (state) =>
      state.editing.list !== null
        ? state.lists[state.editing.list].tasks.filter(
            (task) => task.id === state.editing.id
          )[0]
        : { title: '', details: '' },
    state: (state) => state,
  },
});
