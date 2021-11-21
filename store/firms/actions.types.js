import { ADD_FIRM_ACTION, FETCH_FIRMS_ACTION, GET_FIRM_BY_ID_ACTION, SET_FIRMS_MUTATION } from './index';

const prefix = 'firms'

export const FETCH_FIRMS = `${prefix}/${FETCH_FIRMS_ACTION}`
export const ADD_FIRM = `${prefix}/${ADD_FIRM_ACTION}`
export const GET_FIRM_BY_ID = `${prefix}/${GET_FIRM_BY_ID_ACTION}`
export const SET_FIRMS = `${prefix}/${SET_FIRMS_MUTATION}`