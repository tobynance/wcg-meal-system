import ACTION_TYPES from "./action-types";

export const toggleShift = (shiftId) => ({type: ACTION_TYPES.TOGGLE_SHIFT, shiftId});

export const toggleNeverCook = () => ({type: ACTION_TYPES.TOGGLE_NEVER_COOK});
export const toggleNeverAssist = () => ({type: ACTION_TYPES.TOGGLE_NEVER_ASSIST});
export const toggleNeverClean = () => ({type: ACTION_TYPES.TOGGLE_NEVER_CLEAN});
