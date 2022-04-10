export default {
    state: {
        title: 'Notes App',
        notes: [
            {
                title: 'First Note',
                descr: 'Description for first note',
                date: new Date().toLocaleString(),
                priority: 'basic'
            },
            {
                title: 'Second Note',
                descr: 'Description for second note',
                date: new Date().toLocaleString(),
                priority: 'basic'
            },
            {
                title: 'Third Note',
                descr: 'Description for third note',
                date: new Date().toLocaleString(),
                priority: 'basic'
            }
        ],
        priority: ['Basic', 'Important', 'Top priority'],

    },
    mutations: {
        addNote(state, note) {
            state.notes.push(note)
        },
        removeNote(state, index) {
            state.notes.splice(index, 1)
        }
    },
    actions: {
        addNote({commit}, note) {
            commit('addNote', note)
        },
        removeNote({commit}, index) {
            commit('removeNote', index)
        }
    },
    getters: {
        getNotes(state) {
            return state.notes
        },
        getPriority(state) {
            return state.priority
        },
        getTitle(state) {
            return state.title
        }
    }
}