import axios from 'axios'

export const FETCH_PEOPLE_ACTION = 'fetchPeople'
export const ADD_PEOPLE_ACTION = 'addPeople'
export const UPDATE_PEOPLE_ACTION = 'updatePeople'
export const TOGGLE_PEOPLE_MODAL_ACTION = 'togglePeopleModal'

export const SET_PEOPLE_MUTATION = 'setPeople'
export const ADD_PEOPLE_MUTATION = 'addPeopleMutation'
export const TOGGLE_PEOPLE_MODAL_MUTATION = 'setTogglePeopleModal'

const state = () => ({
	peoples: [],
	isModalOpen: false,
	selectedPeople: null,
})

const getters = {
	getPeoples: (state) => state.peoples,
	getIsModalOpen: (state) => state.isModalOpen,
	getSelectedPeople: (state) => state.selectedPeople
}

const actions = {
	async [FETCH_PEOPLE_ACTION]({ commit }) {
		try {
			const { data } = await axios.get('/api/people')
			commit(SET_PEOPLE_MUTATION, data.people)
		} catch (error) {

		}
	},
	async [ADD_PEOPLE_ACTION]({ commit }, payload) {
		try {
			const { data } = await axios.post('/api/people', payload)
			commit(ADD_PEOPLE_MUTATION, data.person)
		} catch (error) {
			throw new Error('Unable to add person')
		}
	},
	async [UPDATE_PEOPLE_ACTION]({ commit }, payload) {
		try {
			await axios.put(
				`/api/people/${payload.id}`,
				payload
			)
		} catch (error) {
			throw new Error('error updating people')
		}
	},
	[TOGGLE_PEOPLE_MODAL_ACTION]({ commit }, payload) {
		if (!payload) {
			const data = {
				open: true,
				people: {
					name: '',
					place: '',
				}
			}
			commit(TOGGLE_PEOPLE_MODAL_MUTATION, data)
		} else {
			const data = {
				open: true,
				people: payload
			}
			commit(TOGGLE_PEOPLE_MODAL_MUTATION, data)
		}
	}
}

const mutations = {
	[SET_PEOPLE_MUTATION]: (state, payload) => {
		state.peoples = payload
	},
	[ADD_PEOPLE_MUTATION]: (state, payload) => {
		state.peoples = [...state.peoples, payload]
	},
	[TOGGLE_PEOPLE_MODAL_MUTATION]: (state, payload) => {
		if (!payload) {
			state.isModalOpen = false
			state.selectedPeople = null
		} else {
			state.isModalOpen = payload.open
			state.selectedPeople = payload.people
		}
	}
}

export default {
	state,
	getters,
	actions,
	mutations
}