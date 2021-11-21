import axios from 'axios'

export const FETCH_FIRMS_ACTION = 'fetchFirms'
export const ADD_FIRM_ACTION = 'addFirm'
export const GET_FIRM_BY_ID_ACTION = 'getFirmById'
export const SET_FIRMS_MUTATION = 'setFirms'
export const ADD_FIRM_MUTATION = 'addNewFirm'

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
	},
	async [ADD_FIRM_ACTION]({ commit }, payload) {
		try {
			if (payload.isEdit) {
				await axios.put(`/api/firm/${payload.data.id}`, payload.data)
			} else {
				const { data } = await axios.post('/api/firm', payload.data)
				commit(ADD_FIRM_MUTATION, data.firm)
			}
		} catch (error) {
			throw new Error('Unable to add data')
		}
	},
	[GET_FIRM_BY_ID_ACTION]({ commit, state }, payload) {
		const firm = state.firms.find(firm => firm.id === payload)
		return firm
	}
}

const mutations = {
	[SET_FIRMS_MUTATION]: (state, payload) => {
		state.firms = payload
	},
	[ADD_FIRM_MUTATION]: (state, payload) => {
		state.firms = [...state.firms, payload]
	}
}

export default {
	state,
	getters,
	actions,
	mutations
}