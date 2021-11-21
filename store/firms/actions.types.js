import { ADD_FIRM_ACTION, FETCH_FIRMS_ACTION, SET_FIRMS_MUTATION } from './index';

const prefix = 'firms'

export const FETCH_FIRMS = `${prefix}/${FETCH_FIRMS_ACTION}`
export const ADD_FIRM = `${prefix}/${ADD_FIRM_ACTION}`

export const SET_FIRMS = `${prefix}/${SET_FIRMS_MUTATION}`