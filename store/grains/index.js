import axios from 'axios'

export const FETCH_GRAINS_ACTION = 'fetchGrains'
export const ADD_GRAIN_ACTION = 'addGrain'
export const REMOVE_GRAIN_ACTION = 'removeGrain'

export const SET_GRAINS_MUTATION = 'setGrains'
export const ADD_GRAIN_MUTATION = 'addGrainMutation'

const state = () => ({
	grains: [],

})

const getters = {
	grains: state => state.grains,
}

const actions = {
	async [FETCH_GRAINS_ACTION]({ commit }) {
		try {
			const { data } = await axios.get('/api/grains')
			commit(SET_GRAINS_MUTATION, data.grains)
		} catch (error) {
			throw new Error('error fetching grains')
		}
	},
	async [ADD_GRAIN_ACTION]({ commit }, grain) {
		try {
			const { data } = await axios.post('/api/grain', grain)
			commit(ADD_GRAIN_MUTATION, data.grain)
		} catch (error) {
			throw new Error('error adding grain')
		}
	},
	async [REMOVE_GRAIN_ACTION]({ commit, dispatch }, grainId) {
		try {
			await axios.delete(`/api/grains/${grainId}`)
			await dispatch(FETCH_GRAINS_ACTION)
		} catch (error) {
			throw new Error('error removing grain')
		}
	}
}

const mutations = {
	[SET_GRAINS_MUTATION](state, grains) {
		state.grains = grains
	},
	[ADD_GRAIN_MUTATION](state, grain) {
		state.grains = [...state.grains, grain]
	}
}

export default {
	state,
	getters,
	actions,
	mutations
}