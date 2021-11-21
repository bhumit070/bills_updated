import { ADD_GRAIN_ACTION, FETCH_GRAINS_ACTION, REMOVE_GRAIN_ACTION } from './index';

const prefix = 'grains'

export const FETCH_GRAINS = `${prefix}/${FETCH_GRAINS_ACTION}`;
export const ADD_GRAIN = `${prefix}/${ADD_GRAIN_ACTION}`;
export const REMOVE_GRAIN = `${prefix}/${REMOVE_GRAIN_ACTION}`;