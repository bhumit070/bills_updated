import axios from 'axios'

export const FETCH_PEOPLE_ACTION = 'fetchPeople'
export const ADD_PEOPLE_ACTION = 'addPeople'
export const UPDATE_PEOPLE_ACTION = 'updatePeople'

export const SET_PEOPLE_MUTATION = 'setPeople'
export const ADD_PEOPLE_MUTATION = 'addPeopleMutation'

const state = () => ({
	peoples: []
})

const getters = {
	getPeoples: (state) => state.peoples
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
	}
}

const mutations = {
	[SET_PEOPLE_MUTATION]: (state, payload) => {
		state.peoples = payload
	},
	[ADD_PEOPLE_MUTATION]: (state, payload) => {
		state.peoples = [...state.peoples, payload]
	}
}

export default {
	state,
	getters,
	actions,
	mutations
}