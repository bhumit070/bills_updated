import { ADD_PEOPLE_ACTION, FETCH_PEOPLE_ACTION, UPDATE_PEOPLE_ACTION } from './index'

const prefix = 'peoples'

export const FETCH_PEOPLE = `${prefix}/${FETCH_PEOPLE_ACTION}`
export const ADD_PEOPLE = `${prefix}/${ADD_PEOPLE_ACTION}`
export const UPDATE_PEOPLE = `${prefix}/${UPDATE_PEOPLE_ACTION}`