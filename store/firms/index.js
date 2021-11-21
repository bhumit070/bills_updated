import axios from 'axios'

export const FETCH_FIRMS_ACTION = 'fetchFirms'

export const SET_FIRMS_MUTATION = 'setFirms'

const state = () => ({
	firms: []
})

const getters = {
	allFirms(state) {
		return state.firms
	}
}

const actions = {
	async [FETCH_FIRMS_ACTION]({ commit }) {
		try {
			const { data } = await axios.get('/api/firms')
			commit(SET_FIRMS_MUTATION, data.firms)
		} catch (error) {
			commit(SET_FIRMS_MUTATION, [])
		}
	}
}

const mutations = {
	[SET_FIRMS_MUTATION]: (state, payload) => {
		state.firms = payload
	}
}

export default {
	state,
	getters,
	actions,
	mutations
}