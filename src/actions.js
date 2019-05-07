import ACTION_TYPES from "./action-types";

export const setInputValue = (name, value) => ({type: ACTION_TYPES.SET_INPUT_VALUE, name, value});
export const toggleCheckedState = (name) => ({type: ACTION_TYPES.TOGGLE_CHECKED_STATE, name});
export const toggleShift = (shiftId) => ({type: ACTION_TYPES.TOGGLE_SHIFT, shiftId});
export const toggleNeverCook = () => ({type: ACTION_TYPES.TOGGLE_NEVER_COOK});
export const toggleNeverAssist = () => ({type: ACTION_TYPES.TOGGLE_NEVER_ASSIST});
export const toggleNeverClean = () => ({type: ACTION_TYPES.TOGGLE_NEVER_CLEAN});
export const clear = () => ({type: ACTION_TYPES.CLEAR});
